---
layout: post
title: "Ubuntu 에서 Mosquitto 설치하기"
subtitle: "Ubuntu Mosquitto Source build"
date: 2018-02-13
author: KimJunHee
category: MQTT
tags: mqtt mosquitto compile c ubuntu linux build
finished: true
---

> Mosquitto를 리눅스 환경에서 컴파일 하기 위해 작성하였습니다.<br/>
MQTT 프로토콜에 대해 잘 모르신다면 [MQTT 프로토콜 이란?](https://wnsgml972.github.io/mqtt/mqtt.html)을 보고 오시기 바랍니다.

## 개발 환경

* Mosquitto-1.4.14
* Ubuntu 16.04.3-desktop-amd64


<br/><br/>
## 소프트웨어 설치

### Install Library

* Linux 상에서 Mosquitto 소스코드를 Build 하기 위한 라이브러리를 설치한다.

{% highlight bash %}
$ sudo apt-get install build-essential libc-ares-dev uuid-dev libssl-dev libcurl4-openssl-dev libmysqlclient-dev
{% endhighlight %}

> 만약 /var/lib/dpkg/lock 잠금 파일을 얻을 수 없다고 나온다면 다음과 같은 명령어를 통해 lock 파일 삭제를 진행한 후 다시 진행합니다.

{% highlight bash %}
$ rm /var/lib/dpkg/lock
{% endhighlight %}

<br/>
### Install Mosquitto Source

{% highlight bash %}
$ cd ~/
$ mkdir mosquitto_sources
$ cd mosquitto_sources/
$ wget http://mosquitto.org/files/source/mosquitto-1.4.8.tar.gz
$ tar xvf mosquitto-1.4.8.tar.gz
{% endhighlight %}

<br/>
* Make Mosquitto source

{% highlight bash %}
$ cd ~/mosquitto_sources/mosquitto-1.4.8/
$ make
$ sudo make install
{% endhighlight %}

<br/><br/>
## 확인

> Broker, Subscribe, Publish 셋 다 다른 터미널에서 작동합니다.

### Install Mosquitto-Clients

{% highlight bash %}
$ sudo apt-get install mosquitto-clients
{% endhighlight %}

<br/>
### Start Broker

{% highlight bash %}
$ mosquitto
{% endhighlight %}

![MQTT](/img/mqtt/2/broker.png)

<br/>
### Client (Subscribe, Publish)

{% highlight bash %}
$ mosquitto_sub -t 'topic' -h 127.0.0.1
{% endhighlight %}

![MQTT](/img/mqtt/2/sub.png)

{% highlight bash %}
$ mosquitto_pub -t 'topic' -h 127.0.0.1 -m `Hello`
$ mosquitto_pub -t 'topic' -h 127.0.0.1 -m `Hi`
$ mosquitto_pub -t 'topic' -h 127.0.0.1 -l
{% endhighlight %}

![MQTT](/img/mqtt/2/pub.png)

<br/><br/>
## 서비스로 돌아가는 Mosquitto 종료

{% highlight bash %}
$ sudo /etc/init.d/mosquitto stop
{% endhighlight %}


<br/><br/>
## My_Sub, My_Pub 작성 및 실행

* <https://wnsgml972.github.io/wnsgml972.github.io/mqtt/mqtt_ubuntu-my_client.html>
