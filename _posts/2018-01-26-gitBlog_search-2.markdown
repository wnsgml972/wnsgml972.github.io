---
layout: post
title: "검색 엔진에 게시물 등록하기"
subtitle: "Getting Started with Git Blog - 2"
date: 2018-01-26
author: KimJunHee
category: Git Blog
tags: github git blog jekyll search naver google
finished: true
---

> 글을 쓰는 것만으로도 충분히 가치있는 일이지만 여러 사람이 들어와 같이 소통할 수 있다면 더욱 더 좋겠죠? <br/>총 2가지로 나누어 네이버와 구글에 검색이 되도록 하는 방법입니다.

## Google

### xml 설정

* [/sitemap.xml](https://github.com/wnsgml972/wnsgml972.github.io/blob/master/sitemap.xml "sitemap.xml")을 작성한다.
* Github에 sitemap.xml을 push 한 뒤 직접 url 주소를 쳐서 확인한다.

![GitBlog](/img/gitBlog/2/gitBlog_sitexml.png "site.xml")

* /robots.txt를 만들어 sitemap url을 등록한다.

{% highlight xml %}
User-agent: *
Allow: /

Sitemap: https://wnsgml972.github.io/sitemap.xml
{% endhighlight %}

* 확인해보기

![GitBlog](/img/gitBlog/2/gitBlog_sitemapRobot.png "Confirm")


<br/>
### Search Console 등록

* [Google Search Console](https://www.google.com/webmasters/#?modal_active=none "Google Search") 등록 하기
* Search Console 클릭한다.

![GitBlog](/img/gitBlog/2/gitBlog_search-console.png "Search")

* 속성 추가를 클릭해 화면이 나온다면 html 파일 다운 후 자신의 폴더에 옮긴다.

![GitBlog](/img/gitBlog/2/gitBlog_complete.png "Complete")

* html 파일을 github에 push한다.

![GitBlog](/img/gitBlog/2/gitBlog_googlehtml.png "Google HTML")

* 다시 Search Console에 들어가 인증이 완료됐다고 나온다면 위에서 만든 sitemap.xml을 추가한다.

![GitBlog](/img/gitBlog/2/gitBlog_addSitexml.png "Add Site XML")


<br/>
### 확인

![GitBlog](/img/gitBlog/2/gitBlog_complete2.png "Complete")



<br/><br/>
## Naver

> Google Search Console에 올린 것과 비슷한 방식으로 진행합니다.

### Search Console 등록

* [Naver Search Console](https://www.google.com/webmasters/#?modal_active=none "Google Search") 등록 하기
* 로그인 하게되면 나오게 되는 사이트 추가 버튼을 클릭한다.

![GitBlog](/img/gitBlog/2/gitBlog_addNaver.png "Add Naver")

* 구글에서 했던 방식과 동일하게 자신의 사이트를 인증한다.

![GitBlog](/img/gitBlog/2/gitBlog_naverEnroll.png "Add Naver")


<br/>
### xml 설정

* 만약 feed.xml이 만들어져 있지 않다면 [feed.xml](https://github.com/wnsgml972/wnsgml972.github.io/blob/master/feed.xml "feed.xml")을 작성한다.
* feed.xml, sitemap.xml, robots.txt를 모두 github에 push하여 확인한다.
* feed.xml을 제출한다.

![GitBlog](/img/gitBlog/2/gitBlog_addFeed.png "Add Feed")

* sitemap.xml을 제출한다.

![GitBlog](/img/gitBlog/2/gitBlog_addSitemap.png "Add Site")

<br/><br/>
## 참고

* <https://gmlwjd9405.github.io/2017/10/20/include-blog-in-a-GoogleSearchEngine.html>
* <https://nesoy.github.io/articles/2017-01/blog-search>
