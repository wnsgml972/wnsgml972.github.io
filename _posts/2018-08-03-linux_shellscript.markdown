---
layout: post
title: "JSP를 이용한 쉘 스크립트 실행"
subtitle: "HTML 버튼 클릭 시 JSP를 통해 자바 코드를 실행하여 쉘 명령어 실행시키기"
date: 2018-08-03
author: KimJunHee
category: Linux
tags: jsp html javascript linux processbuilder ajax
finished: true
---

## 설명

### HTML, Javascript

#### overview

* html 페이지 버튼 클릭 시 ```onclick``` 이벤트에 자바 스크립트 함수를 넣습니다.
* 자바 스크립트 함수는 비동기식으로 ```jsp```를 호출하여 결과 값을 ```myCallBack``` 함수를 통해 받습니다.

#### html code

{% highlight javascript %}
<button type="button" class="btn btn-default btn-lg" onclick="httpGetAsync('./jsp/start.jsp', myCallBack) ">Start</button>
{% endhighlight %}

#### javascript code (ajax)

{% highlight javascript %}
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
        	 callback(xmlHttp.responseText);
        }           
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
function myCallBack(response){
        alert(response);
}
{% endhighlight %}

<br/>
### JSP

#### overview

* JSP 페이지에서는 자바의 Processbuilder를 이용하여 프로세스를 생성시키고 쉘 명령어를 실행시켰습니다.
* 쉘 명령어를 실행시키는 변수는 ```bashCommand```, 쉘 스크립트를 실행시키는 변수는 ```scriptCommand```로 구분 지었습니다.
* 프로세스를 새로 만들어 실행하므로 결과를 확인할 수 없습니다. 때문에 프로세스의 inputStream과 errorStream을 받아 버퍼에 넣어 페이지에 출력하도록 하였습니다.
* 본 예제에서는 shell을 이용해 ```ls -al```을 호출하여 나온 출력값을 myCallBack을 통해 받아, ```alert()```를 이용하여 확인하였습니다.


#### jsp code

{% highlight java %}
<%@ page language="java" import= "java.io.*, java.util.*, java.net.* "
   contentType="text/html;charset=EUC-KR" session="false" %>

<%
    String path = "/home/user/tomcat8/webapps/ROOT/dashboard/etri-jsp-sh/play-ffmpeg.sh";
    String bashCommand[] = {"ls", "-al"}; // bash 명령어
    String scriptCommand[] = {"sh", path}; //shell script 실행

    int lineCount = 0;
    String line="";

    ProcessBuilder builder = new ProcessBuilder(bashCommand);
    Process childProcess = null;

    try{
        childProcess = builder.start();

      BufferedReader br =
            new BufferedReader(
                    new InputStreamReader(
                          new SequenceInputStream(childProcess.getInputStream(), childProcess.getErrorStream())));

      while((line = br.readLine()) != null){
%>
    <%=line%><br>
<%
      }
      br.close();

   }catch(IOException ie){
      ie.printStackTrace();
   }catch(Exception e){
      e.printStackTrace();
   }
%>
{% endhighlight %}

<br/>
<br/>
## 확인

![Linux](/img/linux/4/linux.png)

<br/>
## 관련

* [1. Ubuntu 서버에 Tomcat 설치하기  ](https://wnsgml972.github.io/linux/linux_ubuntu_tomcat.html)
* [2. Ubuntu 서버에서 JSP 사용하기 ](https://wnsgml972.github.io/linux/linux_jsp.html)
* [3. JSP를 이용한 쉘 스크립트 실행 ](https://wnsgml972.github.io/linux/linux_shellscript.html)
