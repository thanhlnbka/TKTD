import scrapy 
import re
import arrow

class baomoi_new(scrapy.Spider):
    name = 'baomoi_new'
    start_urls = ["http://baomoi.com"]
    
    def parse(self, response):
        urls = response.css("div.full-menu a::attr(href)").getall()
        for url in urls:
            path_url = "http://baomoi.com"+url
            self.start_urls.append(path_url)

        # print(self.start_urls)
        for url in self.start_urls:
            yield scrapy.Request(url= url, callback=self.parseUrl)

    def check_link(self, link):
        if link is not None:
        # link dang:  "/mat-tran-thu-hai-da-mo-de-khoi-dong-lai-nen-kinh-te/r/34915885.epi"
            if re.match(u"(http).*",link):
                return link
            else:
                link_url = "https://baomoi.com" + link
                return link_url



    def clean_author(self,author):
        if author is not None and not author.isspace():
            author1 = author.replace(" ","")
            author2 = author1.replace("\n","")
            return author2
        
    def split_datetime(self,timezone):
        if timezone is not None:
            dt = arrow.get(timezone)
            dt_date = str(dt.date())
            dt_date_arr = dt_date.split("-")
            date_vn = dt_date_arr[2] + "/" + dt_date_arr[1] +"/"+dt_date_arr[0]

            dt_time = str(dt.time())
            dt_time_arr = dt_time.split(":")
            if dt_time_arr[2] != "00":
                time_vn = dt_time_arr[0] +"h"+dt_time_arr[1]+"ph"+dt_time_arr[2] +"s"
            else:
                time_vn = dt_time_arr[0] +"h"+dt_time_arr[1]+"ph"
            return [ time_vn , date_vn]
    
    def parseUrl(self,response):

        for baomoi in response.css("div.story"):
            ten_chu_de = response.css("div a.cate::text").get()
            tieu_de = baomoi.css("h4.story__heading a::text").get()
            tac_gia = baomoi.css("div.story__meta a::text").get()
            link_bai_viet = baomoi.css("h4.story__heading a::attr(href)").get()
            link_img = baomoi.css("div.story__thumb img::attr(src)").get()
            thoi_gian = baomoi.css("div.story__meta time::attr(datetime)").get()
            
            link_post = self.check_link(link_bai_viet)
            topic = ten_chu_de
            title = tieu_de
            author = self.clean_author(tac_gia)
            link_img = self.check_link(link_img)
            post_time = self.split_datetime(thoi_gian)
            if link_post is not None or author is not None or post_time is not None:
                if topic is None:
                    yield {
                        "link_post": link_post,
                        "topic":  "Mới Nhất",
                        "title": title,
                        "author": author,
                        "link_img": link_img,
                        "post_time": post_time

                    }
                else:
                    yield{
                        "link_post": link_post,
                        "topic":  topic,
                        "title": title,
                        "author": author,
                        "link_img": link_img,
                        "post_time": post_time

                    }

        # next page
        next_page = response.css("div a.btn.btn-sm.btn-primary::attr(href)").get()
        name_next_page = response.xpath("/html/body/div[1]/div[4]/div/div[2]/div[2]/text()").extract()
        if next_page is not None and name_next_page[0].isspace():
            next_page_link = response.urljoin(next_page)
            yield scrapy.Request(url= next_page_link, callback=self.parseUrl)