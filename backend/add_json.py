import pysolr
import json
#sudo su - solr -c "/opt/solr/bin/solr create -c TKTDNhom10 -n data_driven_schema_configs"
#sudo su - solr -c "/opt/solr/bin/solr delete -c TKTDNhom10 -deleteConfig data_driven_schema_configs"
solr = pysolr.Solr("http://localhost:8983/solr/TKTDNhom10/",timeout=1000)


#danh chi muc
# with open("/home/luuthanh/Desktop/TKTD/backend/processing_data_final.json","r") as file:
#     solr.add(json.load(file))
    
            
# Truy van

# results = solr.search(q={"content: Thành  asjalkd"})
# results = solr.search(q={
# 'title_decription_content: *'},**{
#      'start':0,
#     'rows': 10,
#     'fl': '* score',
#     'fq':["topic:(THah OR anasd)","author:(*)"] 

#     })
results = solr.search({'title_decription_content: "Sơn Tùng"'},**{
'start': 0, 'rows': 1, 
'fl': '*', 
'fq': ['topic: ( * )', 'author: ( * )'],
'hl': 'true',
'hl.method':'original',
'hl.simple.pre':'<mark style="background-color:#ffff0070;">',
'hl.simple.post':'</mark>',
'hl.highlightMultiTerm':'true',
'hl.usePhraseHighlighter':'false',
'hl.fragsize':100,
'defType':'dismax',
'qf':'topic title content decription title_decription_content'
 }
    )


print("Saw {0} result(s).".format(len(results)))
# print(dir(results.highlighting))
# print(results.highlighting)
# print(results.highlighting["76db3ffe-0956-471c-a1ae-cda1c93c5203"])
new_arr = []
for result in results:
    result.pop("title_decription_content")
    # print(result)
    dict2 = results.highlighting[result["id"]]
    print(dict2)

    
    pass
    

# dict = {'topic': ['Thời_sự'], 'title': ['Những kỷ_vật lần đầu công_bố của Chủ_tịch Hồ_Chí_Minh '], 'decription': ['Chiếc máy ghi_âm , túi đựng cơm hay đôi guốc Hồ_Chủ_tịch từng sử_dụng ... được trưng_bày tại triển_lãm “ Những câu_chuyện chưa kể " khai_mạc tại Bảo_tàng Hồ_Chí_Minh ( Hà_Nội ) ngày 18 / 5 . '], 'post_time': ['Thứ sáu, 19/5/2017, 10:35 (GMT+7)'], 'author': ['Giang_Huy'], 'content': ['Chiếc máy ghi_âm , túi đựng cơm hay đôi guốc Hồ_Chủ_tịch từng sử_dụng ... được trưng_bày tại triển_lãm “ Những câu_chuyện chưa kể " khai_mạc tại Bảo_tàng Hồ_Chí_Minh ( Hà_Nội ) ngày 18 / 5 . ', 'Triển_lãm trưng_bày 79 hiện_vật tặng_phẩm , trong đó phần_lớn là các hiện_vật lần đầu_tiên được giới_thiệu với công_chúng , tượng_trưng cho cuộc_đời 79 mùa xuân của Chủ_tịch Hồ_Chí_Minh . ', 'Triển_lãm trưng_bày 79 hiện_vật tặng_phẩm , trong đó phần_lớn là các hiện_vật lần đầu_tiên được giới_thiệu với công_chúng , tượng_trưng cho cuộc_đời 79 mùa xuân của Chủ_tịch Hồ_Chí_Minh . ', 'Hầu_hết kỷ_vật_gắn với những câu_chuyện cảm_động , những món quà tuy nhỏ nhưng thể hiện_tình_cảm của Chủ_tịch Hồ_Chí_Minh với các tập_thể , cá_nhân được tặng quà … ', 'Hầu_hết kỷ_vật_gắn với những câu_chuyện cảm_động , những món quà tuy nhỏ nhưng thể hiện_tình_cảm của Chủ_tịch Hồ_Chí_Minh với các tập_thể , cá_nhân được tặng quà … ', 'Chiếc máy thu_thanh Hồ_Chủ_tịch được Việt_kiều Thái_Lan tặng năm 1960 ', 'Chiếc máy thu_thanh Hồ_Chủ_tịch được Việt_kiều Thái_Lan tặng năm 1960 ', 'Huy_hiệu Bác_Hồ - kỷ_vật được Chủ_tịch Hồ_Chí_Minh tặng cho những tấm gương Người tốt việc tốt . ', 'Huy_hiệu Bác_Hồ - kỷ_vật được Chủ_tịch Hồ_Chí_Minh tặng cho những tấm gương Người tốt việc tốt . ', 'Đôi giầy và guốc Chủ_tịch Hồ_Chí_Minh đã sử_dụng trong thời sống và làm_việc tại Phủ Chủ_tịch . ', 'Đôi giầy và guốc Chủ_tịch Hồ_Chí_Minh đã sử_dụng trong thời sống và làm_việc tại Phủ Chủ_tịch . ', 'Túi đựng cơm và nước uống và chiếc mũ_cát Hồ_Chủ_tịch sử_dụng trong thời_gian công_tác tại địa_phương . ', 'Túi đựng cơm và nước uống và chiếc mũ_cát Hồ_Chủ_tịch sử_dụng trong thời_gian công_tác tại địa_phương . ', 'Triển_lãm giúp người dân có_thể hiểu hơn về tấm lòng của dân và bạn_bè quốc_tế với Chủ_tịch Hồ_Chí_Minh . ', 'Triển_lãm giúp người dân có_thể hiểu hơn về tấm lòng của dân và bạn_bè quốc_tế với Chủ_tịch Hồ_Chí_Minh . ', 'Chiếc xe_đạp ông Đào_Văn_Tư ( 63 tuổi ) đi từ TP HCM ra thăm lăng Bác trong 26 ngày_đêm . ', 'Chiếc xe_đạp ông Đào_Văn_Tư ( 63 tuổi ) đi từ TP HCM ra thăm lăng Bác trong 26 ngày_đêm . ', 'Máy ghi_âm và tăng_âm do đoàn thực_tập nước Cộng_hoà Nhân_dân Hungari tặng nhân_dịp sinh_nhật của Chủ_tịch Hồ_Chí_Minh năm 1969 . ', 'Máy ghi_âm và tăng_âm do đoàn thực_tập nước Cộng_hoà Nhân_dân Hungari tặng nhân_dịp sinh_nhật của Chủ_tịch Hồ_Chí_Minh năm 1969 . ', 'Những kỷ_vật này đã được trân_trọng giữ_gìn trong nhiều năm và sau đó được chủ_nhân hoặc thân_nhân của họ tặng lại cho Bảo_tàng Hồ_Chí_Minh . ', 'Những kỷ_vật này đã được trân_trọng giữ_gìn trong nhiều năm và sau đó được chủ_nhân hoặc thân_nhân của họ tặng lại cho Bảo_tàng Hồ_Chí_Minh . ', 'Chiếc áo , mũ_cói được những người dân làm , tặng Chủ_tịch Hồ_Chí_Minh . ', 'Chiếc áo , mũ_cói được những người dân làm , tặng Chủ_tịch Hồ_Chí_Minh . '], 'link_img': ['https://i1-vnexpress.vnecdn.net/2017/05/19/HUY-5557-1495162349.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=wa_AyhO1TV-wUdSiJZE93g'], 'link_post': ['https://vnexpress.net/nhung-ky-vat-lan-dau-cong-bo-cua-chu-tich-ho-chi-minh-3587145.html'], 'id': '11422b8a-bf80-4a7c-b0ba-9dff66352b3a', '_version_': 1667958785853882368, 'score': 4.6996098}
# dict2 ={'title': ['Những kỷ_vật lần đầu công_bố của Chủ_tịch <mark style="background-color:#ffff0070;">Hồ_Chí_Minh</mark> '], 'decription': [' triển_lãm “ Những câu_chuyện chưa kể " khai_mạc tại Bảo_tàng <mark style="background-color:#ffff0070;">Hồ_Chí_Minh</mark> ( Hà_Nội ) ngày 18 / 5 . '], 'content': [' triển_lãm “ Những câu_chuyện chưa kể " khai_mạc tại Bảo_tàng <mark style="background-color:#ffff0070;">Hồ_Chí_Minh</mark> ( Hà_Nội ) ngày 18 / 5 . '], 'title_decription_content': [' <mark style="background-color:#ffff0070;">Hồ_Chí_Minh</mark> ( Hà_Nội ) ngày 18 / 5 . Chiếc máy ghi_âm , túi đựng cơm hay đôi guốc Hồ_Chủ_tịch từng sử_dụng']}
# for k,v in dict.items():
#     if k == "title" or k == "decription" or k =="content":
#         v1 = dict2[k][0].replace('<mark style="background-color:#ffff0070;">','')
#         v1 = v1.replace('</mark>','')
#         for i, iv in enumerate(v):
#             if iv.find(v1) != -1:
#                 v[i] = str(v[i]).replace(iv,dict2[k][0]