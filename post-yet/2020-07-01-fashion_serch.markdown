---
layout: post-wide-width
title: "Fashion Search Application 개발 후기"
subtitle: ""
date: 2020-07-02
author: KimJunHee
category: Log
tags: service
permalink: /test/app/
finished: true
---

> History 유지를 위해, 기획의 내용 모두 GitHub를 통해 관리하기로 한다.

## 현 상황 Note

* react 간단한 로그인 폼 프론트
* Spring Boot Backend (spring-mvc, restful, spring-security, spring-hibernate), mysql로 간단한 백엔드 구현해보기
* 라이브러리 : logback, lombok

### 된 거

- 로그인 및 인증 (1 - 로그인, auth)
- 사용자 관리(2- push, 5 - note 분리해야 할지도?)
- 브랜드 관리(3 - 브랜드 데이터, 4 - 브랜드 분류)

### 안된 거

- 커뮤니티 관리(6 - 커뮤니티)
- 추천 시스템(7 - 추천)
- business model(8 - 광고)


<br/>

## 필요 기능

필요 기능들을 통해 도메인을 정의한다.

### 로그인

인증(Authentication)과 인가(Authorization) 기능

- 누가, 언제, 어떻게 쓰고 있는가를 파악하기 위해 어떤 사이트에서든 인증, 인가가 있음.
- 인증과 인가는 API에서 가장 자주 구현되는 기능중 하나.
- Private한 API는 물론이고 Public한 API도 기본적인 인증과 인가를 요구.

#### 인증이란?

유저가 누구인지 확인하는 절차, 회원가입하고 로그인 하는 것.

#### 인가란?

유저에 대한 권한을 허락하는 것.

#### 도메인

로그인 및 인증

#### 필요 기술

- aws-cognito
- spring security
- firebase auth



<br/>

### Push

특정 상품, 브랜드에 대한 알람 기능

#### 도메인

사용자 관리 도메인 담당

#### 필요 기술

- Expo Push Notification
- OneSignal
- firebase In-app messaging




<br/>

### 데이터

브랜드 별로 데이터를 저장하는 기능

#### 도메인

브랜드 관리

#### 필요 기술

##### 정적 데이터 저장 및 관리 (nosql?)

- mongoDB
- aws-dynamoDB
- firebase

##### 동적 데이터 저장 및 관리 (rdb)

- mysql




<br/>

### 분류

브랜드별로 classification, 태깅을 통해 각 브랜드 별 특징들을 분류하는 기능

#### 도메인

브랜드 관리

#### 필요 기술





<br/>

### note

브랜드별 preference, 간단한 comment를 저장, 평점을 담당하는 기능

#### 도메인

사용자 관리

#### 필요 기술





<br/>

### 커뮤니티

브랜드, 상품평, 댓글, 고객 응대 글 등등을 담당하는 커뮤니티 기능

#### 도메인

커뮤니티 관리

#### 필요 기술





<br/>

### 추천

연령, 성별, 직업 등의 고객 맞춤 데이터를 통해 브랜드(및 상품) 추천 기능

#### 도메인

추천 시스템

#### 필요 기술

- Elasticsearch



<br/>

### 광고

> 설명 추가 필요

#### 도메인

Business Model

#### 필요 기술

- Facebook Audience Network
- Google Ads



<br/>

### 필요 기능들을 통해 도메인 정의 예시

각각 도메인들을 한 서비스로 묶고, 서비스별로 backend 서버, db, 외부 plug-in을 가지며, 묶어서 end-point에 노출한다. 각 서비스들은 mssage queue를 통해 통신한다. (GRP로 서비스간 통신이 필요할수도?)

사용자가 특정 브랜드 게시판에 구매 후기를 다는 과정:
사용자 관리 시스템, 커뮤니티 관리 시스템, 브랜드 관리 시스템이 영향을 받는다.

- 사용자 관리 시스템에서 후기를 단 사용자를 특정
- 브랜드 관리 시스템에서 해당 브랜드 데이터를 추출
- 커뮤니티 관리 시스템에서 해당 브랜드에 대한 데이터를 추가
- 브랜드 관리자에게 후기 알림 push
- 해당 브랜드들을 태깅한 사용자들에게 후기 알림을 push





<br/><br/>

## MSA 구성요소

### External Gateway

- User end point
- Api gateway- nginx


<br/>

### Service Mash

- 서비스단 traffix control, proxy, dns등의 기능
- Istio, Netflix OOS, Linkerd, envoy
- 아직 고려 안함, 차후 필요하면 적용



<br/>

### Container Management

- docker, kubernetes로 관리


<br/>

### Backing Service

- backend service로 spring boot, firebase, Django등 framework로 구현 가능
- Message queue - zookeeper + kafka, GRPC, GraphQL



<br/>

### Telemetry

#### Monitoring

- Prometheus
- Grafana

#### Logging

- Pogstash
- Kibana



<br/>

### CI/CD Automation

- Jenkins
- Travis
- Circle CI




<br/><br/>

## 초기 앱 개발 - 개발 우선 순위

### 노트

Fashion-serch app을 MSA기반으로 만들기 위해 할 수 있는 초기 개발 방법.
UI 설계와 sample? 데이터가 있기 때문에 로그인, 인증기능, 과 브랜드 데이터를 저장하는 db구축부터 하는게 좋을것 같음.  sign up, login page, main screen, Directory screen은 구현하는데 필요한 다른 service가 없기 때문에(다른 기능의 dependency가 없음) 가장 먼저 구현이 가능할 것 같음.

sign in, sign up,sign out 기능은 외부 인증모듈을 사용해도 됨. 하지만 연동할 수 있는 수단이 필요
Directory screen을 구현하면서 지금 있는 브랜드 데이터들을 다 넣으면 좋겠음. nosql류 db들이 좋을것 같음(firebase를 이용하면 좋을듯) 브랜드 데이터들은 데이터들의 변경이 상대적으로 자주 일어나지 않고, 데이터 양이 정해져 있기 때문에

### 진행 사항

- Front-end 개발환경 세팅 - 진행중
  - Git action, eslint, prettier, expo등 기본적인 ci/cd 구성
- Login page, sign up(Frame 1,2,3) 구현
- Main screen(Frame 4) 구현
- Directory screen(Frame 5) 구현 - 이때까지는 data를 mocking해서 db없이 화면만 구현
- Infra 구성
  - aws, azure등 사용할 Infra를 이때까지 결정해야함
  - Infra를 정했으면 적절한 kubernetes 환경 구성
  - container들을 외부에 노출할 수 있도록 kubernetes service, ingress구성.
  - kubernete 내 docker registry를 구성하여 git과 ci/cd를 연동할 수 있도록 - git이랑 연동하진 않았는데 여기까지는 어느정도 해봄. action으로 ci를 구성하고, 나온 container image(docker)를 kubernetes에 구축한 registry에 push까지 하면 될것 같음
- service를 구현하기 앞서, 각 서비스에 접근할 수 있도록 api gateway를 만들어 줘야함
  - nginx등을 간단히 앞단에 붙이도록 하면 될것 같음 - 이부분도 어느정도 해봄
- service 개발 - 앞서 구현했던 Front-end ui와 연결할 service 구현
  - sign up, login page, main screen, Directory screen에 관한 backend를 개발
  - 이때 인증관리, 보안, Directory 기능을 만들어야 하는데, 각각 구현하는데 필요한 기술(db, module)등을 결정해야함
  - dockerized된 container 이미지가 최종 결과물이고, stage마다 kubernetes registry에 업데이트 되도록 구성
- 지금까지 초기 환경 구성이었고, Front-end 어플에서 log in, sign up, main screen, Directory screen이 잘 보이는지 테스트를 진행. 이게 완료되면 6번 CI/CD Automation이 끝났다고 봄
- 이후 할일
  - 필요한 service와 ui를 하나씩 개발
  - service들간 통신이 가능하도록 message queue, GRP등을 생각해 봐야함
  - 서비스들이 하나 둘씩 늘어나면 모니터링, 로깅을 위해 Telemetry기술들을 추가해야함
  - telemetry가 추가되면 이때부터는 기능이 추가될 때 마다 기획 -> 개발 ->테스트-> 배포를 반복할 수 있음
  - service mesh는 어느정도 사용자가 늘어난 상황(traffic이 늘어나 service를 단일 컨테이너에서 더이상 처리할 수 없을때) scale in-out이 필요한 시점에서 고려해 추가하는게 좋을듯 함


* <https://subicura.com/2016/05/30/likehs-develop-log.html>
