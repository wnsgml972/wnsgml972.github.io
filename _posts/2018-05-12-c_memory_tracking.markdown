---
layout: post
title: "C Memory Tracking"
subtitle: "전처리문을 이용한 C memory tracking"
date: 2018-05-12
author: KimJunHee
category: C
tags: c memory tracking system-programming
finished: true
---

## Memory Tracking의 필요성

* 동적 할당을 이용해 프로그래밍을 할 시 ```heap```공간에 메모리를 할당하게 되는데 만약 동적 할당을 하고 그 메모리를 해제하지 않는다면, 메모리 관리 원칙상 이 메모리는 시스템을 재부팅하기 전에는 다른 응용 프로그램이 사용하지 못한다.
* 게다가 서버 프로그래밍을 할 시 프로그래머가 메모리를 할당만 하고 해제해주지 않는다면, 계속해서 시스템 메모리가 고갈되어 프로그램이 다운되는 심각한 문제가 발생한다.
* 그렇기 때문에 우리는 우리가 메모리를 할당하고 잘 해제하고 있는지 체크해주는 Memory Tracking이 필요하다.

<br/><br/>
## 조건 처리

### 전처리기

* 컴파일 이전에 미리 처리되는 문장을 가리킨다. 그렇기 때문에 선행처리기라고도 한다.
* 컴파일러는 사용자가 작성한 코드를 컴파일하기 전에 전처리문에서 정의해 놓은 작업들을 먼저 수행한다.

### 응용

* 기존에 있는 방대한 소스 코드를 지우지 않고 활성화 비활성화 하는 데에 가장 많이 이용된다. 즉, 기존에 있는 소스 코드를 건드리지 않는 상태에서 부분적인 컴파일을 하는 것이다.
* 내가 원할 때 컴파일되게 할 수 있기 때문에 사용을 원하지 않는다면, 조건 처리를 이용해 전체 시스템의 퍼포먼스를 줄이지 않게 할 수 있다.
* 조건 처리를 이용해 ```logging```을 할 수 있다.

### 조건 처리를 이용한 Memory Tracking

![C](/img/c/2/no-if.png)

* 다음 그림을 보면 ```#ifdef ~ #endif``` 사이의 코드가 색깔이 희미해져 컴파일 되지 않는 모습이다.
* 평소에는 이 코드를 이용해 메모리를 할당하되 전처리문 ```REAL_WITH_MEMORY_TRACKING```를 정의하지 않아 Memory Tracking을 하지 않는 것이다. 그렇게 한다면 원할 때만 Memory Tracking을 할 수 있다.

<br/>
![C](/img/c/2/visual.png)

* __C/C++ -> 전처리기 -> 전처리기 정의__ 에 ```REAL_WITH_MEMORY_TRACKING```을 정의한다면

<br/>
![C](/img/c/2/yes-if.png)

* 조건 처리 안에 있는 코드까지 같이 컴파일 된다.


<br/><br/>
## 설명

* 간단하게 각각 ```malloc```, ```calloc```, ```realloc```, 등등을 할 때 사용하는 ```heap``` 공간의 byte 크기를 계산하여, 현재 사용하고 있는 공간을 나타내는 변수인 ```static unsigned long  memcount```에 설정한다.
* 각 할당 공간을 알아 낼 때는 ```sizeof```를 이용해 사용하려 하는 byte의 크기를 알아낸다.
* ```static unsigned long max_memcount = 0```변수를 이용해 총 사용 가능한 ```heap``` 공간을 설정할 수 있다.
* 조건 처리를 이용하였기 때문에 ```REAL_WITH_MEMORY_TRACKING```를 선언해주지 않는다면 내부의 ```heap```공간을 계산하는 코드는 컴파일러가 읽지 않기 때문에 전체적인 퍼포먼스의 영향을 끼치지 않는다.

<br/>
![C](/img/c/2/capture0.png)

* 이제 위의 그림처럼 모든 메모리 할당과 해제를 새로 만든 함수에서 적용하면 된다.

<br/><br/>
## 전체 코드 ```my_memory.c```

{% highlight c %}

#include <stdlib.h>
#include <string.h>
#include <stdio.h>

#ifdef REAL_WITH_MEMORY_TRACKING
#include <malloc.h>
#endif

#ifdef REAL_WITH_MEMORY_TRACKING
static unsigned long  memcount = 0;
static unsigned long max_memcount = 0;
#endif


void my_print_memory(char *str) {
#ifdef REAL_WITH_MEMORY_TRACKING
	printf("%s  static unsigned long memcount = %lf kb\n", str, (double)memcount / 1024);
	printf("%s  static unsigned long max_memcount = %d kb\n",str ,memcount/1024);
#endif
}


void *my_calloc(size_t nmemb, size_t size)
{
	void *mem = calloc(nmemb, size);

#ifdef REAL_WITH_MEMORY_TRACKING
	memcount += sizeof(mem);
	if (memcount > max_memcount) {
		max_memcount = memcount;
	}
	//my_print_memory("calloc");
#endif

	return mem;
}

void my_free(void *mem)
{
#ifdef REAL_WITH_MEMORY_TRACKING
	if (!mem) {
		return;
	}
	memcount -= sizeof(mem);
#endif
	free(mem);
}

void *my_malloc(size_t size)
{
	void *mem = malloc(size);

#ifdef REAL_WITH_MEMORY_TRACKING
	memcount += sizeof(mem);
	if (memcount > max_memcount) {
		max_memcount = memcount;
	}
	my_print_memory("malloc");
#endif

	return mem;
}

#ifdef REAL_WITH_MEMORY_TRACKING
unsigned long my_memory_used(void)
{
	return memcount;
}

unsigned long my_max_memory_used(void)
{
	return max_memcount;
}
#endif

void *my_realloc(void *ptr, size_t size)
{
	void *mem;
#ifdef REAL_WITH_MEMORY_TRACKING
	if (ptr) {
		memcount -= sizeof(ptr);
	}
#endif
	mem = realloc(ptr, size);

#ifdef REAL_WITH_MEMORY_TRACKING
	memcount += sizeof(mem);
	if (memcount > max_memcount) {
		max_memcount = memcount;
	}
	//my_print_memory("realloc");
#endif

	return mem;
}

char *my_strdup(const char *s)
{
	char *str = strdup(s);

#ifdef REAL_WITH_MEMORY_TRACKING
	memcount += sizeof(str);
	if (memcount > max_memcount) {
		max_memcount = memcount;
	}
	//my_print_memory("strdup");
#endif

	return str;
}
{% endhighlight %}


<br/><br/>
## 사용 모습

![C](/img/c/2/capture.png)
