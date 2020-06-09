import pysolr
import json
import time
#sudo su - solr -c "/opt/solr/bin/solr create -c TKTDNhom10 -n data_driven_schema_configs"
#sudo su - solr -c "/opt/solr/bin/solr delete -c TKTDNhom10 -deleteConfig data_driven_schema_configs"
solr = pysolr.Solr("http://localhost:8983/solr/TestConfig/",timeout=1000)
# import spacy
# nlp = spacy.load("vi_spacy_model")

#/home/luuthanh/Desktop/test_config

#danh chi muc
# with open("/home/luuthanh/Desktop/TKTD/backend/data.json","r") as file:
#     solr.add(json.load(file))
    


# a = nlp('"Quốc tế"')
results = solr.search('title_decription_content: ("WikiLeaks") && date: [ * TO NOW ]',**{
'start': 0, 'rows': 5, 
'fl': '* score', 
'fq': ['topic: ( * )', 'author:  ( * )'],
'hl': 'true',
'hl.method':'original',
'hl.simple.pre':'<mark>',
'hl.simple.post':'</mark>',
'hl.highlightMultiTerm':'true',
# 'hl.usePhraseHighlighter':'false',
'hl.fragsize':100,
'defType':'edismax',
'mm':1,
'qs':3,
# 'pf':'title_decription_content title content author topic',
'qf':'title_decription_content author'
 }
    )

print("time search : {}".format(results.qtime))
print(len(results))
