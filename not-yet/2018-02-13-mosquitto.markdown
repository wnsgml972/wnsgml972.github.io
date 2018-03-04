---
layout: post
title: "MQTT Broker Mosquitto 분석"
subtitle: ""
date: 2018-02-13
author: KimJunHee
category: MQTT
tags: mqtt mosquitto
finished: true
---

## Mosquitto MQTT Broker

### [윈도우 Mosquitto 설치, 컴파일](https://wnsgml972.github.io/wnsgml972.github.io/mqtt/mqtt_windows-install.html)

### [Mosquitto 자바 라이브러리 PAHO를 이용한 Chatting 프로그램](https://github.com/wnsgml972/MQTT-Chating)

### 구조

* 단일 스레드 방식으로 poll() 을 이용해 루프를 돌며 이벤트를 체크한다.

* Mosquitto는 MQTT 프로토콜 버전 3.1 및 3.1.1을 사용하는 메시지 브로커 중 하나이다.

* C 기반이며 리눅스, 윈도우에서도 사용할 수 있으며 현재 모스키토 최신 버전에서는 WebSocket도 사용할 수 있다.

### 세션

* 세션 관리는 일정 시간 패킷이 오지 않는다면 Keep Alive 메시지를 보내기 시작하고 메시지가 오지 않는다면 끊어버린다.

### QoS

- QoS는 0, 1, 2 Level을 지원하며 Default QoS는 0이다.

### Bridge

* 멀티 Broker를 사용할 수 있는 Bridging을 지원한다. Mosquitto Bridge는 한 Broker가 작동하지 않을 시 그 작업을 대체하는 기능을 수행한다. 작동 방식은 한 클라이언트가 Publish를 하게 되면 한 Broker를 거쳐 다른 Broker에게 가고 마지막으로 구독자에게 가는 방식으로 동작한다.

### 특징

* User Authentication을 지원한다.

* MySQL과 연동할 수 있다.
