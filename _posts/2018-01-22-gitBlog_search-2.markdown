---
layout: post
title: "네이버, 구글 검색 엔진에 게시물 등록하기"
subtitle: "Getting Started with Git Blog - 2"
date: 2018-01-22
author: KimJunHee
category: Git Blog
tags: github git blog jekyll search naver google
finished: false
---

> 글을 쓰는 것만으로도 충분히 좋지만 아무래도 여러 사람이 들어와 같이 소통할 수 있다면 더욱 더 좋겠죠? <br/>총 2가지로 나누어 네이버와 구글에 검색이 되도록 하는 방법입니다.

## 구글에 글 등록

* ```/sitemap.xml``` 작성

{% highlight xml %}
---
layout: null
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    <url>
      <loc>https://wnsgml972.github.io/wnsgml972.github.io/git/git_init</loc>
      <lastmod>2018-01-22T00:00:00+00:00</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.5</priority>
    </url>

    <url>
      <loc>https://wnsgml972.github.io/wnsgml972.github.io/git%20blog/gitBlog_thema-1</loc>
      <lastmod>2018-01-23T00:00:00+00:00</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.5</priority>
    </url>

    <url>
      <loc>https://wnsgml972.github.io/wnsgml972.github.io/app%20inventor/app-inventor_bluetooth</loc>
      <lastmod>2018-01-25T00:00:00+00:00</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.5</priority>
    </url>

    <url>
      <loc>https://wnsgml972.github.io/wnsgml972.github.io/app%20inventor/app-inventor_start</loc>
        <lastmod>2018-01-25T00:00:00+00:00</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.5</priority>
    </url>

    <url>
      <loc>https://wnsgml972.github.io/wnsgml972.github.io/arduino/arduino_bluetooth</loc>
      <lastmod>2018-01-25T00:00:00+00:00</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.5</priority>
    </url>

    <url>
      <loc>https://wnsgml972.github.io/wnsgml972.github.io/git%20blog/gitBlog_search-2</loc>
      <lastmod>2018-01-26T00:00:00+00:00</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.5</priority>
    </url>

</urlset>
{% endhighlight %}

* Github에 sitemap.xml을 push 한 뒤 직접 url 주소를 쳐서 확인

![GitBlog](/img/gitBlog_sitexml.png "site.xml")

* Robot.txt를 만들어 sitemap url을 등록

{% highlight xml %}
User-agent: *
Allow: /

Sitemap: https://wnsgml972.github.io/wnsgml972.github.io/sitemap.xml
{% endhighlight %}

* 확인해보기

![GitBlog](/img/gitBlog_sitemapRobot.png "Confirm")

* [Google Search Console](https://www.google.com/webmasters/#?modal_active=none "Google Search") 등록 하기

* Search Console 클릭

![GitBlog](/img/gitBlog_search-console.png "Search")

* 속성 추가를 클릭해





<br/><br/>
## 네이버에 글 등록
