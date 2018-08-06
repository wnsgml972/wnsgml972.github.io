---
layout: post
title: "Ubuntu 서버에 Tomcat 설치하기"
subtitle: "Ubuntu 16.04, tomcat 8"
date: 2018-07-26
author: KimJunHee
category: Linux
tags: linux was tomcat
finished: true
---

## 사전 준비

### ```apt-get install tomcat8```로 설치 했을 경우

* 톰캣이 서비스로 구동되게 됩니다. 항상 구동되어 있기 때문에 불편한 점이 많습니다.
* 이런 방법으로 설치하게 되면 tomcat8이 게스트 권한을 가지게 됩니다. 이렇게 된다면 다음 게시글 내용인 __JSP를 이용한 쉘 스크립트 실행에__ 권한이 없어 불가능하게 됩니다.
* 이러한 이유로 본 게시글에서는 다른 방법을 이용해 설치합니다.

### 사전 준비

* ```ps -ef | grep tomcat``` 명령어를 통해 현재 톰캣이 구동중인지 확인할 수 있습니다.
* 서비스로 구동중이라면 ```service tomcat8 stop``` 명령어를 통해 중지할 수 있습니다.

<br/>
## 설치

* <https://tomcat.apache.org/download-80.cgi> 아래의 링크로 들어가 tomcat 8 버젼, tar.gz 파일을 다운 받습니다.

![tomcat](/img/linux/2/install.png)

* ```# tar -zxvf 파일명``` root directory에서 압축을 해제합니다.
* ```# mv 파일명 tomcat8``` 디렉토리의 이름을 바꿉니다.
* ```# cd /tomcat8/bin``` 의 위치로 이동합니다.
* ```# ./startup.sh``` 쉘 스크립트를 실행시켜 톰캣을 구동합니다. __루트 권한으로 실행해야 톰캣이 루트 권한을 가질 수 있습니다.__
* 확인해보면 여러 실행 파일이 있는데 원하는 프로그램을 실행시켜 사용하면 됩니다.

![tomcat](/img/linux/2/2.png)

<br/>
## 확인

* 웹 브라우져를 열어 ```localhost:8080```에 접속하여 밑의 그림이 나오면 성공입니다.

![tomcat](/img/linux/2/3.png)

* 실행되는 첫 화면은 ```index.html```입니다.
* ```/tomcat8/webapps/ROOT``` 의 위치에 보면 위 그림의 파일을 볼 수 있습니다. 따라서 ROOT 폴더부터 원하는 파일을 올려 웹 서버를 구성할 수 있습니다.
* 저 같은 경우에는 ```/tomcat8/webapps/ROOT/dashboard/WebContent``` 에 dashboard를 만들어 올려놓았습니다. 따라서 url ```localhost:8080/dashboard/WebContent```에 간다면 제가 올려 놓은 dashboard를 접속할 수 있습니다.

![tomcat](/img/linux/2/4.png)

<br/>
## 관련

* [1. Ubuntu 서버에 Tomcat 설치하기  ](https://wnsgml972.github.io/linux/linux_ubuntu_tomcat.html)
* [2. Ubuntu 서버에서 JSP 사용하기 ](https://wnsgml972.github.io/linux/linux_jsp.html)
* [3. JSP를 이용한 쉘 스크립트 실행 ](https://wnsgml972.github.io/linux/linux_shellscript.html)
