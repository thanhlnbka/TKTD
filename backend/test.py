import json
# import spacy
# nlp = spacy.load("vi_spacy_model")
# with open("/home/luuthanh/Desktop/TKTD/backend/tktd.json") as file:
#     data = json.load(file)

        
# count = 0
# with open("/home/luuthanh/Desktop/TKTD/backend/tktd_tokenize.json","a") as f:
#         for d in data:
#             for k,v in d.items():
#                 if k.find("content") != -1:
#                     if len(str(d["title"]))>2 and len(str(d["content"]))>2:
#                         d["title"] = str(nlp(d["title"]))
#                         d["content"] = str(nlp(d["content"]))
#             f.write("{},\n".format(json.dumps(d)))
#             count += 1
#             print("added {}".format(count))

# Remove duplicate link_post
# with open("/home/luuthanh/Desktop/TKTD/backend/tktd_tokenize.json") as file:
#     data = json.load(file)
# with open("/home/luuthanh/Desktop/TKTD/backend/remove_duplicate_tktd.json","a") as file:
#     list_post = []
#     for d in data:
#         list_post.append(d["link_post"])
#     new_list = list(set(list_post))
#     print(len(new_list))
#     count_remove = 0
#     for d in data:
#         if d["link_post"] in new_list:
#             file.write("{},\n".format(json.dumps(d)))
#             new_list.remove(d["link_post"])
#             count_remove += 1
#             print("removed {}".format(count_remove))

# with open("/home/luuthanh/Desktop/TKTD/backend/remove_duplicate_tktd.json") as file:
#     data = json.load(file)
#     arr = []
#     for i in data:
#         arr.append(i["topic"])
#     arr_new = list(set(arr))
    
#     print(arr_new))
with open("/home/luuthanh/Desktop/TKTD/backend/processing_data_final.json") as file:
    data = json.load(file)
new_arr = []
for i in data:
    new_arr.append(str(i["author"]).replace("_"," "))
arr = sorted(list(set(new_arr)))
author = []
for k in arr:
    author.append({"author":str(k)})
print(author)
