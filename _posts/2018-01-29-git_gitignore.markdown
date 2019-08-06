---
layout: post
title: ".gitignore 설정하기"
subtitle: ""
date: 2018-01-29
author: KimJunHee
category: Git
tags: github git gitignore
finished: true
---

> .gitignore의 개념에 대해 익히고 적용하는 방법에 대해 포스팅한 내용입니다.

## .gitignore란?

* ```.gitignore```란 하나의 파일로서 Git 버전 관리에서 제외할 파일 목록을 지정하는 파일이다.
* 예를들어 ```Backup File```이나 ```Log File``` 등등이 여기에 해당될 수 있다.


<br/><br/>
## .gitignore 설정하기

* ```.gitignore```파일은 항상 최상위 Directory에 존재해야 한다.
* 다음과 같이 직접 .gitignore 파일을 작성할 수도 있고

{% highlight bash %}
_site
.DS_Store
.jekyll
.bundle
.sass-cache
Gemfile
Gemfile.lock
node_modules
package.json

# Jekyll stuff
/_site/
_site/
.sass-cache/
.jekyll-metadata
{% endhighlight %}

* <https://www.gitignore.io/>에서 원하는 `.gitignore` 템플릿을 정말 간단히 만들 수 있다.
* 아니면 <https://github.com/github/gitignore>에 들어가면 거의 모든 언어에 대한 `.gitignore` 템플릿이 만들어져 있다.


<br/><br/>
## .gitignore 적용하기

* 이제 만들어진 ```.gitignore```파일을 Push 하기만 하면 된다.
* 하지만 하기전에 이미 기존 Project에 버전 관리에 포함되어 있는 파일들은 수동으로 삭제 해줘야 한다. 이경우에는 아래의 명령어를 사용한다.

{% highlight bash %}
$ git rm -r --cached .
$ git add .
$ git commit -m "fixed untracked files"
{% endhighlight %}


<br/><br/>
## 참고

* <https://nesoy.github.io/articles/2017-01/Git-Ignore>
* <https://gmlwjd9405.github.io/2017/10/06/make-gitignore-file.html>
