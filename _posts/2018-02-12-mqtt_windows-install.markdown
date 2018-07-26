---
layout: post
title: "Windows 에서 Mosquitto 설치하기"
subtitle: "Window Mosquitto Source build, debug"
date: 2018-02-12
author: KimJunHee
category: MQTT
tags: mqtt mosquitto compile c debug build
finished: true
---

> Mosquitto 코드를 Debuging하며 이해하기 위해 작성하였습니다.<br/>
MQTT 프로토콜에 대해 잘 모르신다면 [MQTT 프로토콜 이란?](https://wnsgml972.github.io/mqtt/mqtt.html)을 보고 오시기 바랍니다.

## 개발 환경

* Mosquitto-1.4.14  (구버전도 가능)
* Visual studio 2015  (2017도 가능)
* Window 10 pro 64bit  (Window 7도 가능)


<br/><br/>
## 소프트웨어 설치

모든 설치 환경을 32bit로 맞춰야 함

### [Window Visual studio Express 2015 다운](https://www.visualstudio.com/ko/downloads/?rr=https%3A%2F%2Fmsdn.microsoft.com%2Fko-kr%2Flibrary%2Fe2h7fzkw.aspx)

<br/>
### [Download and unzip cmake]( https://cmake.org/download/)

* libwebsocket, mosquitto 프로젝트의 CmakeLists.txt 에 따라 프로젝트를 빌드하여 생성하기 위해 필요

![MQTT](/img/mqtt/1/cmake.png)

<br/>
### [pthread-win32 download & install](ftp://sourceware.org/pub/pthreads-win32/pthreads-w32-2-9-1-release.zip)


* Mosquitto에서 저 경로에 pthreads라는 폴더를 찾기 때문에 꼭 이름, 경로가 일치해야 함 __pthreads위에 또 폴더가 존재해선 안됨__<br/>
__```c:\pthreads\``` 경로에 unzip__

![MQTT](/img/mqtt/1/pthread.png)

<br/>
### [OpenSSL library download & install](https://slproweb.com/products/Win32OpenSSL.html)

* 컴파일을 위해서는 Light 버전이 아닌 FULL 버전 설치, (프로그램 실행만을 위해서는 Light 버전) <br/>
__pthreads와 마찬가지로 ```c:\OpenSSL-Win32\``` 경로에 unzip__

![MQTT](/img/mqtt/1/openssl.png)


<br/>
### [libwebsocket source download](https://github.com/warmcat/libwebsockets/releases)

* 최신버전 다운<br/>
__마찬가지로 ```c:\libtemp\``` 경로에 unzip__

![MQTT](/img/mqtt/1/libwebsocket.png)


<br/>
### [mosquitto source download](https://github.com/eclipse/mosquitto/releases)

* mosquitto1.4.14  다운<br/>
__마찬가지로 ```c:\mostemp\``` 경로에 unzip__

![MQTT](/img/mqtt/1/mosquitto.png)

<br/>
* 완료 됐을 시 총 4개의 폴더가 ```c:\```에 있어야 함

![MQTT](/img/mqtt/1/directory.png)



<br/><br/>
> Cmake를 이용하여 websocket.dll을 얻기 위함입니다. 쉽지 않으니 천천히 경로에 유의하며 따라오세요.

## libwebsocket

### Cmake Configuration

* Cmake-gui 를 열어 libwebsocket 빌드 준비

![MQTT](/img/mqtt/1/cmake_build.png)

<br/>
* ```C\libtemp\libwebsockets-2.4.1\```의 위치에 __build Directory 생성__

![MQTT](/img/mqtt/1/cmake_build0.png)

<br/>
* Cmake-gui 설정

![MQTT](/img/mqtt/1/cmake_build2.png)

<br/>
* Configure를 클릭하여 Visual Studio 14 2015 선택, 사용하는 Visual Studio 버젼이 2017이면  Visual Studio 15 2017 선택

![MQTT](/img/mqtt/1/cmake_build3.png)

<br/>
* 에러 창이 나온다면 ok 클릭

![MQTT](/img/mqtt/1/cmake_build4.png)

<br/>
* ```CMAKE_INSTALL_PREFIX``` 를 ```C:\libtemp\libwebsockets-2.4.1``` 로 변경

![MQTT](/img/mqtt/1/cmake_build5.png)

<br/>
* OpenSSL 경로 추가

![MQTT](/img/mqtt/1/cmake_build6.png)

<br/>
* ```LWS_WITH_SSL``` 체크 해제 후 __Configure 클릭__

![MQTT](/img/mqtt/1/cmake_build7.png)

<br/>
* Configure done 이 확인된 후 Generate 버튼을 클릭하여 프로젝트 생성

![MQTT](/img/mqtt/1/cmake_build8.png)

<br/>
* Generate done 확인 후 Open Project클릭하여 프로젝트 Open

![MQTT](/img/mqtt/1/cmake_build9.png)

<br/>
### Visual Studio Configuration

* Release 와 Win32 상태 확인 후 ALL_BUILD 를 이용하여 빌드

![MQTT](/img/mqtt/1/cmake_build10.png)

<br/>
* ```websocket.dll``` 이 생성되었는지 확인

![MQTT](/img/mqtt/1/cmake_build11.png)


<br/><br/>
> Visual Studio 2015에서 디버깅 하기 위함입니다. 진행하며 부족하다고 나온 dll 파일은 해당 프로젝트의 debug directory에 넣으면 해결할 수 있습니다.

## mosquitto

### Cmake Configuration

* ```C:\mostemp\mosquitto-1.4.14\```의 위치에 __build Directory 생성__

![MQTT](/img/mqtt/1/mos1.png)

<br/>
* Source 코드 경로와 build 경로를 맞춰준 뒤 configure 버튼 클릭

![MQTT](/img/mqtt/1/mos2.png)

<br/>
* Configure를 클릭하여 Visual Studio 14 2015 선택 후 finish 클릭

![MQTT](/img/mqtt/1/mos3.png)

<br/>
* 에러가 나면 ok 클릭 (에러가 나도 다음 절차 후에 해결 가능)

![MQTT](/img/mqtt/1/mos4.png)

<br/>
* Add Entry를 눌러 OpenSSL 경로 추가해 주고 configure 를 다시 클릭

![MQTT](/img/mqtt/1/mos5.png)

<br/>
* ```WITH_WEBSOCKETS``` 체크

![MQTT](/img/mqtt/1/mos6.png)

<br/>
* ```CMAKE_INSTALL_PREFIX``` 를 ```C:\mostemp\mosquitto-1.4.14``` 로 변경

![MQTT](/img/mqtt/1/mos7.png)

<br/>
* Configure, Generate를 눌러 확인후 Open Project 를 클릭하여 프로젝트를 연다

![MQTT](/img/mqtt/1/mos8.png)

<br/>
> 여기서부터 사진과 같이 6개의 프로젝트를 모두 선택한 후 속성으로 들어가서 사진과 같이 구성을 모든 구성으로 맞춰주세요. 6개 프로젝트의 Debug 모드와 Release 모드 설정을 한꺼번에 하기 위함입니다.

<br/>
### Visual Studio Configuration

* vc++ 디렉터리->포함 디렉터리<br/>
```C:\libtemp\libwebsockets-2.4.1\build``` <br/>
```C:\libtemp\libwebsockets-2.4.1\lib``` <br/>
두개의 경로를 추가<br/>
__헤더 파일을 읽을 수 있게 해줌__

![MQTT](/img/mqtt/1/mos9.png)

<br/>
* vc++ 디렉터리->라이브러리 디렉터리<br/>
```C:\libtemp\libwebsockets-2.4.1\build\lib\Release```<br/>
하나의 경로를 추가

![MQTT](/img/mqtt/1/mos10.png)

<br/>
* c/c++ -> 일반 -> 추가 포함 디렉터리<br/>
```C:\libtemp\libwebsockets-2.4.1\build```<br/>
```C:\libtemp\libwebsockets-2.4.1\lib```<br/>
두개의 경로를 추가<br/>

![MQTT](/img/mqtt/1/mos14.png)

<br/>
* mosquitto 프로젝트->c/c++ -> 전처리기 ```WITH_TLS``` , ```WITH_TLS_PSK``` 제거 (컴파일 오류를 막기위해)

![MQTT](/img/mqtt/1/mos11.png)

<br/>
* ```C:\mostemp\mosquitto-1.4.14```의 ```config.h``` 의 15행 을 주석처리

![MQTT](/img/mqtt/1/mos12.png)

<br/>
* ```C:\pthreads\Pre-built.2\include``` 경로의 ```pthread.h``` 의 320~323라인 주석처리

![MQTT](/img/mqtt/1/mos13.png)

<br/>
* 먼저 __Release 모드로__ ALL_BUILD를 빌드

<br/>
* 사진과 같은 오류가 난다면

![MQTT](/img/mqtt/1/mos15.png)

<br/>
* mosquitto_passwd 프로젝트 -> 링커 -> 입력 ```optimized.lib``` 제거 및 ```debug.lib``` 제거

![MQTT](/img/mqtt/1/mos16.png)

<br/>
* 만약 ```libeay32.dll``` 이나 ```ssleay32.dll``` 파일이 없다고 오류가 난다면 해당 프로젝트의 ```build\src\Release```에 해당 dll 파일을 넣어준다.

![MQTT](/img/mqtt/1/mos0.png)

<br/>
* Release 된 mosquitto broker 와 client 를 확인 (.exe 파일)<br/>
```C:\mostemp\mosquitto-1.4.14\build\src\Release``` <br/>
```C:\mostemp\mosquitto-1.4.14\build\client\Release```


<br/>
> 클라이언트의 .dll 파일 환경 변수 PATH 설정을 위한 과정입니다. 그림과 같이 Pub Client와 Sub Client를 한꺼번에 선택한 후 작업을 진행해 주세요.

* 구성 속성 -> 디버깅 -> 환경 -> 편집<br/>
```PATH=C:\pthreads\Pre-built.2\dll\x86;C:\pthreads\Pre-built.2\lib\x86;C:\mostemp\mosquitto-1.4.14\build\lib\Debug;C:\libtemp\libwebsockets-2.4.1\build\bin\Release```<br/>
mosquitto의 dll 파일과 libwebsocket의 dll 파일 그리고 혹시 사용할 pthread의 dll 파일의 환경 변수 PATH 설정을 해준다.

![MQTT](/img/mqtt/1/mos20.png)

<br/>
## 확인

* 이제 Debug 모드로 Visual Studio에서 Debugging를 진행한다.


![MQTT](/img/mqtt/1/mos19.png)

<br/><br/>
## 참고

* https://github.com/bapowell/bapowell.github.io/wiki/Mosquitto-Build-Notes-(Windows---Visual-Studio)
