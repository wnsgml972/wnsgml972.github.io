---
layout: post
title: "VirtualBox 네트워크 구성과 연결의 이해"
subtitle: ""
date: 2018-08-04
author: KimJunHee
category: Network
tags: network virtualbox
finished: true
---

> 프로젝트를 진행하며 테스트 환경을 구성할 때 물리적인 장치를 직접 준비하는 것은 매우 힘들었습니다. <br/>
그렇기 때문에 가상 머신과 가상 네트워크 구성하는 방법을 공부하게 되었습니다.

## 가상 네트워크 구성

* VirtualBox에서 가상 네트워크를 구성할 수 있습니다.
* 호스트는 실제로 사용되는 PC입니다.
* 가상머신은 호스트 PC 내에 구축된 가상 PC입니다.
* 외부 망은 인터넷이 가능한 공용 IP 대역입니다. 예를 들어 구글에 가기 위해 거쳐가야 할 네트워크 망을 의미합니다.
* 보통 내부망은 인터넷이 안 되는 로컬망 ( 공유기 같은 것을 말 함 )
* 내부망 내에서도 서브넷 마스크를 이용해 여러 네트워크 망을 구성할 수 있음
* 내부에서 외부 ( 포트 포워딩 x, 요청하고 받는데 둘다 )
* 외부에서 내부 ( 포트 포워딩 필요! ㅇ외부망은 내부 망의 공유기를 통해 뿌려진(DHCP) ip를 정확히 알 수가 없음, 때문에 포트 포워딩을 해야함 )

## VirtualBox 네트워크 종류 및 설정 방법

### NAT

### NAT network Bridge Adapter

### Internal Network

### Host-only Network

### Generic Driver
