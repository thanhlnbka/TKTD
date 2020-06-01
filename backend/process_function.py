import spacy 
import json
import pysolr

class Pretreatment:
    
    special_characters = ['/','+','?','#','%','$','~','^','&','[',']','{','}',':',';','!',"-",'\\','\n']
    
    def __init__(self, lan ="vi"):
        self.nlp = spacy.load("vi_spacy_model")


    def insert_OR(self, arr):
        len_arr = len(arr)
        for i in range(1, 2*len_arr-1,2):
            arr.insert(i,"OR")
        return arr

    def join_string(self,arr, str_query):
        for i in arr:
            str_query += "{} ".format(i)
        return str_query + ")"
    
    def clean_content(self, content):
        for c in self.special_characters:
            content = content.replace(c,"")
        return content
        

    
    def query_set(self,arr_topic_inserted = [], arr_author_inserted=[],title_decription_content=""):
        topic = "topic: ( "
        author = "author: ( "

        title_description_content_qr = "title_decription_content: " + title_decription_content
        author_qr = self.join_string(arr_author_inserted,author)
        topic_qr = self.join_string(arr_topic_inserted,topic)

        return [topic_qr,title_description_content_qr,author_qr]
        


    def export_queryset(self,request_dict):
        dict = request_dict
        arr_topic = []
        arr_author = []
        arr_topic_inserted = []
        arr_author_inserted = []
        title_decription_content = '*'
        for k,v in dict.items():
            if k == "title_decription_content":
                if not v.isspace() and len(v) != 0:
                    title_decription_content = self.clean_content(str(self.nlp(v)))
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
        try: 
            if len(arr_topic_inserted) != 2*len(arr_topic)-1 and len(arr_author_inserted) != 2*len(arr_author)-1:
                arr_topic_inserted = self.insert_OR(arr_topic)
                arr_author_inserted = self.insert_OR(arr_author)
        except:
            print("inserted OR")
        return self.query_set(arr_topic_inserted,arr_author_inserted,title_decription_content)

            

class Query(Pretreatment):
    def __init__(self,lan = "vi",show_score = False, start = 0 , rows = 10, request_dict ={}, connect_solr=""):
        super(Query, self).__init__(lan)
        self.show_score = show_score
        self.rows = rows
        self.request_dict = request_dict
        self.solr = pysolr.Solr(connect_solr, timeout = 1000)
        self.start = start
    
    def create_query(self):
        [topic,title_decription_content,author] = self.export_queryset(self.request_dict)
        fl = '* score' if self.show_score is True else '*'
        fq = ["{}".format(topic),"{}".format(author)]
        q = {"{}".format(title_decription_content)}
        query = {"start": self.start, "rows": self.rows,"fl": fl,"fq":fq}
        # 'hl': 'true',
        # 'hl.method':'original',
        # 'hl.simple.pre':'<mark style="background-color:#ffff0070;">',
        # 'hl.simple.post':'</mark>',
        # 'hl.highlightMultiTerm':'true',
        # 'hl.fragsize':100,
        # 'defType':'dismax',
        # 'qf':'topic title content decription ',
        # 'hl.fl':'*'}
        return [set(q),query]
    
    def get_results(self):
        q_k = self.create_query()
        arr_results = []
        results = self.solr.search( q=q_k[0],**q_k[1])
        for i in results:
            i["topic"] = i["topic"][0].replace("_"," ")
            i["title"] = [k.replace("_"," ") for k in i["title"]]
            i["decription"] = [k.replace("_"," ") for k in i["decription"]]
            i["content"] = [k.replace("_"," ") for k in i["content"]]
            i["author"] = i["author"][0].replace("_"," ")
            i.pop("title_decription_content")
#             {"topic":i["topic"],"title":i["title"],"description":i["decription"],"content":i["content"]}
            arr_results.append(i)
        return arr_results