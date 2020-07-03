---
layout: post
title: "Fashion Search App 개발 후기"
subtitle: ""
date: 2020-07-02
author: KimJunHee
category: Log
tags: service
permalink: /test/makeservice/
finished: true
---

> ㄴㄴ

## 어떤걸 만들까?


## 어떻게 개발해야 할까?

기술 스택





<br/><br/>

## Reference

* <https://subicura.com/2016/05/30/likehs-develop-log.html>

~~~markdown
Fashion-serch app 필요한 사항
프로젝트 자체가 초기 단계이고, 처음부터 최종 기능까지 설계가 끝나는 waterfall방식이 아니기에, 기능이 지속적으로 추가, 신버전이 release되는 앱으로 진행될 가능성이 높음.
따라서 MSA선택하는 것이 맞다고 봄

필요 기능

로그인- auth 기능
로그 수집 기능
Push 기능(Kafka, rabbitMQ등 메시지 큐 고려)
사용자 데이터 수집 및 분석 기능 * 중요
nosql(mongodb, aws-dynamoDB)
serch기능?(elasticsearch) 5번과의 연동성 고려
RDB의 연동과 무엇을 쓰면 좋을지
플랫폼(인프라를 어떻게 구축할지 aws, azure, GCE등)
지속적인 확장성(MSA)
서비스간 통신 기능(restAPI, GraphQL, GRPC등)
~~~
