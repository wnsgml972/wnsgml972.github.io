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

## pthread 다운

### [pthread-win32 download & install](ftp://sourceware.org/pub/pthreads-win32/pthreads-w32-2-9-1-release.zip)

* 프로젝트 설정에서 __경로를 조절하여__ pthread를 사용하기 때문에 간단히 해결하실 분은 ```c:\pthreads\``` 경로에 파일 전체를 unzip 합니다.

<br/><br/>

## dll

* 구성 속성 -> 디버깅 -> 환경<br/>
```PATH=C:\pthreads\Pre-built.2\dll\x86;``` 를 추가<br/>
__dll 파일 디렉토리 경로 추가__

![C](/img/c/1/1-env.png)


## include

* C/C++ -> 일반 -> 추가 포함 디렉토리<br/>
```C:\pthreads\Pre-built.2\include```를 추가
__pthread의 include 디렉토리 경로 추가__

![C](/img/c/1/2-dir.png)

<br/><br/>

## lib

* 링커 -> 입력 -> 추가 라이브러리 디렉토리<br/>
```C:\pthreads\Pre-built.2\lib```를 추가
__pthread의 사용하고자 하는 lib 파일 경로 추가__

![C](/img/c/1/5.png)

* 링커 -> 입력 -> 추가 종속성<br/>
```pthreadVC2.lib```를 추가
__pthread의 사용하고자 하는 lib 파일 명 추가__

![C](/img/c/1/3-add.png)

<br/><br/>
## pthread 예제 코드

{% highlight c %}

#include <stdio.h>
#include <pthread.h>

void *my_thread(void *thread_id) {

	printf("my_thread srart! %s\n", (char *)thread_id);

	return NULL;
}

int main() {
	pthread_t a; //thread_id
	printf("thread create\n");
	pthread_create(&a, NULL, my_thread, (char *)"thread1");	 //스레드를 생성한다.
	pthread_join(a, NULL); //my_thread가 끝날 때 까지 기다린다.
}
{% endhighlight %}

* 이 예제 코드에서는 pthread_join을 통해 pthread가 실행되기 전 main thread가 끝나는 것을 방지합니다.

<br/><br/>
## mosquitto

* 모스키토 프로젝트에서 사용하고자 한다면 libmosquitto와 mosquitto 프로젝트를 둘다 선택하신 후 설정하시면 됩니다.

![C](/img/c/1/4-config.png)
