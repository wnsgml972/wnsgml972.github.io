---
layout: post
title: "Jekyll 테마 적용하기"
subtitle: "Getting Started with Git Blog - 1"
date: 2018-01-22
author: KimJunHee
category: Git Blog
tags: github git blog jekyll thema
finished: false
---

## Github에 Repository 생성

> Windows 환경에서의 적용 방법을 포스팅한 내용입니다.

1. ```(github_ID).github.io```의 이름을 가진 Repository를 생성한다. **(나중에 충돌이 일어나기 때문에 README.markdown을 초기화 하지 말아야한다.)**
![Git](/img/gitBlog_repository.png "make repository")

2. 원하는 위치에 ```(github_ID).github.io```라는 Directory를 생성한 후 그 위치에서 ```Git Bash```의 명령어를 입력한다. <br/>
<pre>$ git init
$ git add .
$ git commit -m "Initial commit"
$ git remote add origin "https://github.com/(github_ID)/(github_ID).github.io.git"
$ git push origin master
</pre>

3. remote 해주는 부분의 url은 자신의 해당 Github Repository에서 가져오면 된다.
![Git](/img/gitBlog_copy.png "copy url")

4. 자신의 주소인 https://(github_ID).github.io 에 접속해서 확인한다.


<br/><br/>
## Jekyll 테마 적용

> 원하는 테마를 다운 받은 뒤 다시 github에 push하여 적용시킵니다.

1. http://jekyllthemes.org/ 에 접속해 원하는 테마를 선택한 뒤 다운받는다.
![Git](/img/gitBlog_thema.png "jekyll Thema")

2. 위에서 만든 Directory에 압축을 해제한다.
![Git](/img/gitBlog_directory.png "directory")

3. 위에서 이용한 2번 명령어를 이용하여 Github Repository에 변경 내용을 push 한다.
![Git](/img/gitBlog_push.png "update base url")

4. 다시 한번 자신의 주소인 https://(github_ID).github.io 에 접속해서 확인한다.
