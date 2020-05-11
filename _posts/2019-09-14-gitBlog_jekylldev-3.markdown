---
layout: post
title: "Windows에서 Git Blog 개발환경 구축하기"
subtitle: "Getting Started with Git Blog - 3"
date: 2019-09-14
author: KimJunHee
category: Git Blog
tags: github git blog jekyll windows git-pages dev
finished: true
---

## Install

### Ruby
* <https://rubyinstaller.org/downloads/>
* 해당 URL에서 하이라이팅 되어있는 **윈도우용 루비 + 개발자킷(DevKit)** 인스톨러 설치 및 실행

### Jekyll

![blog](/assets/blog/blog3_1.png)

* 다음과 같이 설치된 루비 콘솔을 관리자 권한으로 실행
* 콘솔창에서 다음과 같은 gem 명령어 입력

~~~bash
gem install jekyll
gem install minima
gem install bundler
gem install jekyll-feed
gem install jekyll-paginate
gem install tzinfo-data
gem install liquid
chcp 65001
~~~

* 블로그 개발 시 대부분 필수적으로 필요한 설정들을 해줍니다.



### Dev
마지막으로 설치된 루비와 Jekyll을 이용하여, 로컬에 있는 Blog의 Config 파일을 읽어 빌드하면 로컬 서버에서 Blog 개발 환경을 구축할 수 있습니다.

~~~bash
cd blog-directory
jekyll serve
~~~

![blog](/assets/blog/blog3_2.png)

* 다음과 같이 실행된 모습을 확인할 수 있습니다.
* <http://localhost:4000/> 접속하면 블로그가 성공적으로 실행된 것을 확인할 수 있습니다.

![blog](/assets/blog/blog3_3.png)






<br/><br/>

## 개발 팁
Jekyll을 통하여 블로그 개발 시 기본적으로 알아야 할 여러가지가 있습니다.
* config.yml
* baseurl, url
* markdown
* liquid
* jekyll directory 구조

물론 하나하나 직접 공부해보며 알아가는 것도 좋지만, 시작이 너무 막연할 수 있습니다.
그렇기 때문에 Jekyll Blog 개발 시 쉽게 배울 수 있도록 정리해놓은 사이트가 있어 첨부합니다.

* <https://learn.cloudcannon.com/jekyll-blogging/#list>

아래 레퍼런스에도 각각 위의 내용에 대해 좋은 글들을 첨부합니다.

<br/><br/>

## Reference
* <https://shryu8902.github.io/_posts/2018-06-22-jekyll-on-windows/>
* <https://kairos03.github.io/jekyll/2017/09/11/learing-Up-Confusion-Around-baseurl.html>
* <https://jekyllrb.com/>
* <https://goodgid.github.io/What-is-Liquid-Grammer/>
* <https://learn.cloudcannon.com/jekyll-blogging/#list>