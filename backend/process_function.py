import spacy 
import json
import pysolr
from bs4 import BeautifulSoup
import re


class Pretreatment:
    
    special_characters = ['/','+','?','#','%','$','~','^','&','[',']','{','}',':',';','!','\\','\n']
    
    def __init__(self, lan ="vi"):
        self.nlp = spacy.load("vi_spacy_model")

    def insert_operator(self, arr,operator = "OR"):
        len_arr = len(arr)
        for i in range(1, 2*len_arr-1,2):
            arr.insert(i," {} ".format(operator))
        return arr

    def join_string(self,arr):
        str_query = ''
        for i in arr:
            str_query += "{}".format(i)
        return str_query 
    
    def clean_content(self, content):
        content = content.replace("'",'"')
        for c in self.special_characters:
            content = content.replace(c,"")
        return str(content)
        

    
    def query_set(self,arr_topic_inserted = [], title_decription_content='*', arr_author_inserted=[],arr_date =[]):
        title_description_content_qr = "title_decription_content: ( " + title_decription_content + " )"
        author_qr = "author: ( " + self.join_string(arr_author_inserted)+ " )"
        topic_qr = "topic: ( " + self.join_string(arr_topic_inserted) + " )"
        if len(arr_date) == 2 :
            date_qr = "date: [ " + str(arr_date[0])+ " TO " + str(arr_date[1])+ " ]"

        return [topic_qr,title_description_content_qr,author_qr,date_qr]
# Tra ve chuoi dang "Ho_Chi_Minh" AND "Van_Toan" hoac giu nguyen content search neu chuoi co toan tu
    def get_keywords(self, content ):
        list_operator = ["AND","OR","NOT","XOR"]
        count = [content.find(i) for i in list_operator]
        if max(count) != -1:
            print("haha")
            return str(self.nlp(content))
        else:
            print("hihi")
            content = [self.nlp(i) for i in re.findall('\"[^\"]+\"',self.clean_content(content),re.IGNORECASE)]
            if len(content) == 0:
                return "_"
            else:
                return self.join_string(self.insert_operator(content,"AND"))




    def export_queryset(self,request_dict,type_search):
        dict = request_dict
        arr_topic = []
        arr_author = []
        arr_topic_inserted = []
        arr_author_inserted = []
        title_decription_content = '*'
        arr_date = []
        for k,v in dict.items():
            if k == "title_decription_content":
                if not v.isspace() and len(v) != 0:
                    if type_search == "full text search":
                        print("FULL TEXT SEARCH")
                        title_decription_content = self.clean_content(str(self.nlp(v)))
                    elif type_search == "keywords":
                        print("KEYWORDS")
                        title_decription_content = self.get_keywords(v)

                else:
                    title_decription_content = "*"
            if k == "topic":
                if len(v) == 0:
                        arr_topic.append("*")
                else:
                    for i in v:
                        arr_topic.append(i["topic"].replace(" ","_"))
            if k == "author":
                if len(v) == 0:
                        arr_author.append("*")
                else:
                    for i in v:
                        arr_author.append(i["author"].replace(" ","_"))
            if k == "date":
                if v[0] == None:
                    v[0] = "*"
                if v[1] == None:
                    v[1] = "NOW"
                arr_date.append(v[0])
                arr_date.append(v[1])
                # print(v)
                
        
        if len(arr_topic_inserted) != 2*len(arr_topic)-1 and len(arr_author_inserted) != 2*len(arr_author)-1:
            arr_topic_inserted = self.insert_operator(arr_topic,"OR")
            arr_author_inserted = self.insert_operator(arr_author,"OR")
        return self.query_set(arr_topic_inserted,title_decription_content,arr_author_inserted,arr_date)


class Query(Pretreatment):
    def __init__(self,lan = "vi",show_score = False, start = 0 , rows = 10, request_dict ={}, connect_solr=""):
        super(Query, self).__init__(lan)
        self.show_score = show_score
        self.rows = rows
        self.request_dict = request_dict
        self.solr = pysolr.Solr(connect_solr, timeout = 1000)
        self.start = start
        self.tag_content = []
        self.search = request_dict["search"]
        self.type_search = request_dict["type_search"]
        list_key = [ k for k in request_dict.keys()]
        if "title_decription_content" in list_key:
            self.tag_content = [str(str(i.strip('"')).strip(' ')).replace("_"," ") for i in re.findall('\"[^\"]+\"',self.clean_content(str(request_dict["title_decription_content"])),re.IGNORECASE)]
        
    
    
    def create_query(self):
        # standard
        if self.search == "STANDARD":
            [topic,title_decription_content,author,date] = self.export_queryset(self.request_dict,self.type_search)
            fl = '* score' if self.show_score is True else '*'
            fq = ["{0}".format(topic),"{}".format(author)]      
            q = {"{0} && {1}".format(title_decription_content, date)}
        
            if title_decription_content.find("*") == -1:
                query = {"start": self.start, "rows": self.rows,"fl": fl,"fq":fq,
                        'hl': 'true',
                        'hl.method':'original',
                        'hl.simple.pre':'<mark>',
                        'hl.simple.post':'</mark>',
                        'hl.highlightMultiTerm':'false',
                        'hl.usePhraseHighlighter':'false',
                        'hl.fragsize':100,
                        # 'defType':'dismax',
                        # 'qf':'title_decription_content',
                        'hl.fl':'*'
                        
                        
                        }
            else:
                query = {"start":self.start,"rows":self.rows,"fl":fl,"fq":fq}
            return [set(q),query]
        else:
            [tdc,vT, vD, vC, vA] = self.export_querysetAnvanced(self.request_dict)
            fl = '* score' if self.show_score is True else '*'
            q = {"{0}".format(tdc)}
        
            if tdc.find("*") == -1:
                query = {"start": self.start, "rows": self.rows,"fl": fl,
                        'hl': 'true',
                        'hl.method':'original',
                        'hl.simple.pre':'<mark>',
                        'hl.simple.post':'</mark>',
                        'hl.highlightMultiTerm':'false',
                        'hl.usePhraseHighlighter':'false',
                        'hl.fragsize':100,
                        'defType':'dismax',
                        'qf':'title^{0} decription^{1} content^{2} author^{3}'.format(vT,vD,vC,vA),
                        'hl.fl':'*'
                        
                        
                        }
            else:
                query = {"start":self.start,"rows":self.rows,"fl":fl,
                        'defType':'dismax',
                        'qf':'title^{0} decription^{1} content^{2} author^{3}'.format(vT,vD,vC,vA)}
            return [set(q),query]
            pass
    def export_querysetAnvanced(self, request_dict):
        if "title_decription_content" in request_dict.keys():
            tdc = request_dict["title_decription_content"]
            if not tdc.isspace() and len(tdc) != 0:
                tdc = str(self.nlp(tdc))
        else:
            tdc = "*"
        vT = request_dict["value"]["valueTitle"]
        vD = request_dict["value"]["valueDecription"]
        vC = request_dict["value"]["valueContent"]
        vA = request_dict["value"]["valueAuthor"]
        return [tdc,vT,vD,vC, vA]

    
    def get_results(self):
        q_k = self.create_query()
        arr_results = []
        tag = []
        print("1234556")
        print(q_k[0])
        print(q_k[1])
        results = self.solr.search( q=q_k[0],**q_k[1])
        qery_time = results.qtime
        key_query = [k for k in q_k[1].keys()]
        if "hl" in key_query:
            for i in results:
                dict2 = results.highlighting[i["id"]]
                for k, v in dict2.items():
                    for m in v:
                        soup = BeautifulSoup(m)
                        tag.append(str(soup.find("mark").getText()).replace("_"," "))
                tag1 = list(set(tag))
                if self.type_search == "keywords":
                    tag1 = self.tag_content
                    # print(tag1)
                else:
                    tag1.extend(self.tag_content)
                    # print(tag1)
                i.pop("title_decription_content")
                i["topic"] = i["topic"][0].replace("_"," ")
                i["title"] = [k.replace("_"," ") for k in i["title"]]
                i["decription"] = [k.replace("_"," ") for k in i["decription"]]
                i["content"] = [k.replace("_"," ") for k in i["content"]]
                i["author"] = i["author"][0].replace("_"," ")
                i.update({"tag":tag1})
                arr_results.append(i)
            return [arr_results,qery_time]
           
                
        else:
            for i in results:
                i.pop("title_decription_content")
                i["topic"] = i["topic"][0].replace("_"," ")
                i["title"] = [k.replace("_"," ") for k in i["title"]]
                i["decription"] = [k.replace("_"," ") for k in i["decription"]]
                i["content"] = [k.replace("_"," ") for k in i["content"]]
                i["author"] = i["author"][0].replace("_"," ")
                i.update({"tag":tag})
                arr_results.append(i)
                
            
            return [arr_results,qery_time]
        
            