import scrapy
import re

class VnExpress(scrapy.Spider):
    name = "vnexpress_news"
    start_urls = ["https://vnexpress.net/"]

    def check_link(self,link):
        if link is not None and link[0] == "/":
            if not re.match(u"(https).*",link) and len(link) > 1:
                link = "https://vnexpress.net" + link
                return link
    def check_linkbranch(self,link):
        if link is not None:
            if re.match(u"(https:).*",link):
                return link
            else:
                link = "https://vnexpress.net" + link
                return link

    def parse(self,response):
        urls = response.css("ul.parent li a::attr(href)").getall()
        self.start_urls.remove("https://vnexpress.net/")
        for url in urls:
            link_url = self.check_link(url)
            self.start_urls.append(link_url)
        # print(self.start_urls)
        for start_url in self.start_urls:
            if start_url is not None:
                yield scrapy.Request(url = start_url, callback=self.parsePost)
    def crawlPost(self,response):
        topic = response.css("li h2 a::attr(title)").getall()
        # print(topic)
        title = response.css("h1.title-detail::text").getall()
        # print(title)
        decription = response.css("p.description::text").getall()
        # print(decripton)
        post_time = response.css("span.date::text").getall()
        # print(post_time)
        author = response.css("p strong::text").getall()
        # print(author)
        content = response.css("p::text").getall()
        # print(content)
        link_img = response.css("picture img::attr(data-src)").getall()
        # print(link_img)
        link_post = response.url
        # print(link_post)
        if len(topic)>=1 and len(title)>=1 and len(decription)>=1 and len(post_time)>=1 and len(author) >=1 and len(content)>=1 and len(link_img)>=1:
            yield {
                "topic": topic,
                "title": title,
                "decription": decription,
                "post_time": post_time,
                "author": author[-1],
                "content": content,
                "link_img":link_img[0],
                "link_post":link_post
            }

    
        
    def parsePost(self,response):
        link_one = response.css(".title_news a::attr(href)").getall()
        link_two = response.css(".title-news a::attr(href)").getall()
        link_one.extend(link_two)
        # for i in link_one:
        #     print(i)
        for link in link_one:
            yield scrapy.Request(url=link, callback=self.crawlPost)

            
    # next page
        nextpage = response.css("div.button-page.flexbox a.btn-page.next-page::attr(href)").get()
        if nextpage is not None and nextpage != 'javascript:void(0)':
            nextpage = self.check_linkbranch(nextpage)
            # print(nextpage)
            yield scrapy.Request(url= nextpage, callback=self.parsePost)
        


