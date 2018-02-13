---
layout: post
title: "Git Blog 시작하기"
subtitle: "Getting Started with Git Blog - 1"
date: 2018-01-23
author: KimJunHee
category: Git Blog
tags: github git blog jekyll thema
finished: true
---

## Github에 Repository 생성

> Windows 환경에서의 적용 방법을 포스팅한 내용입니다.

* ```github_ID.github.io```의 이름을 가진 Repository를 생성한다. **(나중에 충돌이 일어나기 때문에 README.markdown을 초기화 하지 말아야한다.)**

![Git](/img/gitBlog/1/gitBlog_repository.png "make repository")

<br/>
* 원하는 위치에 ```github_ID.github.io```라는 Directory를 생성한 후 그 위치에서 ```Git Bash```의 명령어를 입력한다.

{% highlight bash %}
$ git init
$ git add .
$ git commit -m "Initial commit"
$ git remote add origin "https://github.com/ID/ID.github.io.git"
$ git push origin master
{% endhighlight %}

<br/>
* remote 해주는 부분의 url은 자신의 해당 Github Repository에서 가져오면 된다.

![Git](/img/gitBlog/1/gitBlog_copy.png "copy url")

<br/>
* 자신의 주소인 <https://github_ID.github.io> 에 접속해서 확인한다.


<br/><br/>
## Jekyll 테마 적용

> 원하는 테마를 다운 받은 뒤 다시 github에 push하여 적용시킵니다.

* <http://jekyllthemes.org/> 에 접속해 원하는 테마를 선택한 뒤 다운받는다.

![Git](/img/gitBlog/1/gitBlog_thema.png "jekyll Thema")

<br/>
* 위에서 만든 Directory에 압축을 해제한다.

![Git](/img/gitBlog/1/gitBlog_directory.png "directory")

<br/>
* 위에서 이용한 2번 명령어를 이용하여 Github Repository에 변경 내용을 push 한다.

![Git](/img/gitBlog/1/gitBlog_push.png "update base url")

<br/>
* 다시 한번 자신의 주소인 https://github_ID.github.io 에 접속해서 확인한다.

<br/>
* 해당하는 Jekyll 테마의 ```config.yml``` 파일을 수정한다.


<br/><br/>
## 참고

* <https://nesoy.github.io/articles/2016-12/github-Jekyll>
