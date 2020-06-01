# import scrapy 
# import json


# class LinkPost(scrapy.Spider):
#     name = "linkpost"
#     start_urls = []
#     with open("/home/luuthanh/Desktop/TKTD/backend/crawldata/baomoi/baomoi_new.json") as f:
#         data = json.load(f)
#         for i in data:
#             start_urls.append(i["link_post"])
#         start_urls = list(set(start_urls))
#     def parse(self, response):
#         for url in self.start_urls:
#             yield scrapy.Request(url = url, callback= self.parsePost)
#     def parsePost(self, response):
#         content = response.css("meta::attr(content)").getall()
#         yield {
#             "link_post": response.url,
#             "content": content
#         }
        

        