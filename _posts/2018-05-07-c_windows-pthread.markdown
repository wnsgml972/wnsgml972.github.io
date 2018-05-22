---
layout: post
title: "Windows에서 pthread 사용하기"
subtitle: "Visual Studio 2015"
date: 2018-05-07
author: KimJunHee
category: C
tags: c pthread
finished: true
---

> pthread를 사용하고자 하는 프로젝트의 속성에서 사용하시면 됩니다.

## 구성 속성

* 구성 속성 -> 디버깅 -> 환경<br/>
```PATH=C:\pthreads\Pre-built.2\dll\x86;C:\pthreads\Pre-built.2\lib\x86;``` 를 추가<br/>
__dll 파일과, lib 파일의 환경 변수를 추가__

![C](/img/c/1/1-env.png)

<br/>
* 구성 속성 -> VC++ 디렉토리에 각각<br/>
포함 디렉터리 -> ```C:\pthreads\Pre-built.2\include```<br/>
라이브러리 디렉터리 -> ```C:\pthreads\Pre-built.2\lib\x86```를 추가<br/>
__pthread의 include 디렉토리와 lib 디렉토리 추가__

![C](/img/c/1/1-dir.png)

<br/><br/>
## C/C++

* C/C++ -> 일반 -> 추가 포함 디렉토리<br/>
```C:\pthreads\Pre-built.2\include```를 추가
__pthread의 include 디렉토리 추가__

![C](/img/c/1/2-dir.png)

<br/><br/>
## 링커

* 링커 -> 입력 -> 추가 종속성<br/>
```pthreadVC2.lib```를 추가
__pthread의 사용하고자 하는 lib 파일 추가__

![C](/img/c/1/3-add.png)

<br/><br/>
## mosquitto

* 모스키토 프로젝트에서 사용하고자 한다면 libmosquitto와 mosquitto 프로젝트를 둘다 선택하신 후 설정하시면 됩니다.

![C](/img/c/1/4-config.png)
