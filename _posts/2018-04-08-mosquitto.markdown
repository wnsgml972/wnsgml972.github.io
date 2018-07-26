---
layout: post
title: "MQTT Broker Mosquitto 분석"
subtitle: ""
date: 2018-04-08
author: KimJunHee
category: MQTT
tags: mqtt mosquitto
finished: false
---

## Mosquitto MQTT Broker

### Mosquitto Structure

> 단일 스레드 방식로 구현되어 있으며 poll() 을 이용해 루프를 돌며 이벤트를 체크하고 받아 온 Packet에 따라 응답하는 방식입니다.

#### Mosquitto Structure

![MQTT](/img/mqtt/5/mosquitto_structure.png)

* 간단한 알고리즘은 다음과 같이 표현할 수 있다.

<br/>
![MQTT](/img/mqtt/5/mosquitto_structure_detail1.png)

* 위의 그림은 각 부분에서 하는 일을 조금 더 자세히 표현하였다.
* 결국 Mosquitto Broker는 위의 loop를 계속해서 반복하며 데이터를 받고 처리한다.

#### loop example

![MQTT](/img/mqtt/5/loop_example.png)

* 다음은 각 루프에서 pollfds 배열에 있는 Context의 Packet이 어떠한 형태로 바꿔가며 루프를 진행하는지에 대한 예시이다.
* ```Write Queue Data```에서는 해당 구독자에게 메시지를 보내는 일을 주로 하며 QoS 1레벨이나 QoS 2레벨을 사용할 시에는 Pub에 대한 ack도 같이 처리한다.
* ```poll```에서는 pollfds 배열의 연결된 클라이언트가 데이터를 보내길 원하는지 알아차린다.
* ```Read and Response Queue Data```에서는 pollfds 배열에서 한 Context 씩 Packet을 읽고 해당하는 Packet Hader에 따라 핸들링하여 일을 처리한다.
* ```New Client Accept```에서는 pollfds에 위치한 listen socket이 새로운 클라이언트의 연결을 받아준다. accept는 init 부분에서 non block 모드로 설정해준다.

<br/>
![MQTT](/img/mqtt/5/move_packet.png)

* 마찬가지로 QoS 0 레벨에서 Broker와 클라이언트간 Packet 이동 순서에 따라, Publisher가 메시지를 보냈을 시 Subscriber에게 메시지가 어떻게 도착하는지 표시한 그림이다.

<br/>
### Will (유언)

> Subscriber는 예기치 않게 연결이 끊어지면 Broker에게 메시지를 등록할 수 있습니다.

* Command ```--will-topic```로 어떤 topic에 메시지를 보낼지 정한다.
* Command ```--will-qos```로 어떤 qos로 보낼 것인지 정한다.
* Command ```--will-payload```로 메시지의 내용을 정한다.

<br/>
### Topic

> 계층 구조로 Topic을 표현할 수 있습니다.

#### a/b/c/d

> a/b/c/d 라는 주제의 구독은 다음과 같이 표시할 수 있습니다.

* a/b/c/d
* +/b/c/d
* +/+/c/d
* +/+/+/d
* a/+/c/d
* a/+/+/d
* +/+/+/+

#### wildcard  ```#```

> ```#``` 이후에는 모든 계층 구조 수준을 일치시킵니다. 다음은 모두 같은 Topic으로 이용할 수 있는 예제입니다.

* a/b/c/d
* #
* a/#
* a/b/#
* a/b/c/#
* +/b/c/#

<br/>
### 세션

* 영구 클라리언트 옵션이 존재한다. 영구 클라이언트(클린 세션이 false로 설정된 클라이언트)는 연결을 끊지 않고 대기 상태로 바꾼다. 대기 상태에 있다가 클라이언트가 연결되면 그 때 다시 연결한다.
* 일반적인 클라이언트는 Broker에서 Keep Alive 메시지를 보내고 살아있다는 메시지가 오지 않는다면 끊어버린다. 만기 기간은 시간, 일, 주, 월 및 연도로 정할 수 있다.

<br/>
### QoS

- QoS는 0, 1, 2 Level을 지원하며 Default QoS는 0이다.

<br/>
### Bridge

* 멀티 Broker를 사용할 수 있는 Bridging을 지원한다.

<br/>
### 그 밖에 특징

* 기본으로 512명의 클라이언트의 연결을 지원한다. 더 많은 연결을 원할 시 코드를 수정해야 한다.
* User Authentication을 지원한다.
* MySQL과 연동할 수 있다.
* Mosquitto는 MQTT 프로토콜 버전 3.1 및 3.1.1을 사용하는 메시지 브로커 중 하나이다.
* C 기반이며 리눅스, 윈도우에서도 사용할 수 있으며 현재 모스키토 최신 버전에서는 WebSocket도 사용할 수 있다.

<br/><br/>
## 관련

* [윈도우 Mosquitto 설치, 컴파일](https://wnsgml972.github.io/mqtt/mqtt_windows-install.html)
* [Mosquitto 자바 라이브러리 PAHO를 이용한 Chatting 프로그램](https://github.com/wnsgml972/MQTT-Chating)

<br/><br/>
## 참고

* <https://mosquitto.org/man/mosquitto-8.html>
