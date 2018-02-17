---
layout: post
title: "FFmpeg, FFserver를 이용한 실시간 스트리밍"
subtitle: ""
date: 2018-02-01
author: KimJunHee
category: ffmpeg
tags: ffserver ffmpeg linux streamming realtime
finished: false
---

## 조금만 기다려주세요.

> 만약 아직 FFserver와 FFmpeg를 설치하지 않았다면 [ubuntu에서 FFmpeg, FFserver 설치하기](https://wnsgml972.github.io/wnsgml972.github.io/ffmpeg/ffmpeg_ffserver-config.html)를 참고하시기 바랍니다.

## FFmpeg 사용 법

* bin Directory에 있는 ffmpeg 파일을 실행

{% highlight bash %}
$ cd ~/bin
$ ffmpeg -i 원하는_설정_명령어
{% endhighlight %}



<br/><br/>
## FFserver 사용 법

* -f 옵션을 이용하여 .conf 파일에 맞게 ffserver를 동작

{% highlight bash %}
$ ffserver -f config_file
{% endhighlight %}

![FFMPEG](/img/ffmpeg/1/ffserver1.png)

![FFMPEG](/img/ffmpeg/1/ffserver2.png)


<br/><br/>
## 관련 Project

* <https://github.com/HIFLY-CSM/HIFLY-Final>
