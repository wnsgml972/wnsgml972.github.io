---
layout: post
title: DynamoDB로 NoSQL Table 설계하기
subtitle: Design nosql by dynamo db
category: Database
tags: ddb nosql
date: 2021-01-10
last_modified_at: 2021-01-10
author: KimJunHee
finished: true
---

> 사내 MSA 환경에서 개발을 진행하며, 기존 제너럴하게 구성되어있던 데이터 모델을 특정 도메인으로 구체화하여 마이크로 서비스로 분리하는 작업을 진행하였습니다.
> 해당 작업 진행 중 데이터베이스로 DynamoDB를 선택해서 사용하게 되었는데, 그에 따라 공부한 내용을 정리합니다.
> 개인적으로 NoSQL 데이터 모델을 설계하며, 반복적으로 RDBMS 방식으로 생각하여 헷갈리곤 하였는데, NoSQL Table 설계 시 특정 Key에 대응되는 Vaule가 json 모델(?)이라고 생각하고 설계하면 조금 더 편한 것 같습니다.


<br/>

Amazon DynamoDB와 같은 **NoSQL 데이터베이스 시스템은** 데이터 관리에 `Key-Value` 또는 `Document`와 같은 대체 모델을 사용합니다. 관계형 데이터베이스 관리 시스템을 DynamoDB와 같은 NoSQL 데이터베이스 시스템으로 교체할 때 **주요 차이점과 설계에 있어 특정 접근법을 이해하는 것이 중요합니다.**


<br/>

## RDBMS, NoSQL 사용 용도 및 설계의 차이점

관계형 데이터베이스 시스템(RDBMS)과 NoSQL 데이터베이스는 각기 다른 장단점을 갖고 있습니다.

- `RDBMS`에서는 데이터를 유연하게 쿼리할 수 있지만, **쿼리 비용이 상대적으로 높으며 트래픽이 많은 상황에서는 확장성이 떨어집니다**
- `DynamoDB`와 같은 NoSQL 데이터베이스에서는 **몇 가지 방법으로 데이터를 효율적으로 쿼리**할 수 있지만, **그 외에는 쿼리 비용이 높고 속도가 느립니다.**

이런 차이가 두 시스템의 데이터베이스 설계를 다르게 만듭니다.

- `RDBMS`의 경우, **세부적인 구현이나 성능을 비교적 덜(?) 걱정하고 유연성을 목적으로 설계합니다.** 일반적으로 쿼리 최적화가 스키마 설계에 영향을 미치지 않지만, 정규화가 중요합니다.
- `DynamoDB`의 경우, **가장 중요하고 범용적인 쿼리를 가능한 빠르고 저렴하게 수행할 수 있도록 스키마를 설계합니다.** 사용자의 데이터 구조는 사용자 비즈니스 사용 사례의 특정 요구 사항에 적합하도록 만듭니다.

즉, 정리하자면 용도가 다릅니다.

- `NoSQL`은 Specific한 케이스를 해결하고자 하는데 유용합니다.
- `RDBMS`는 범용적으로 Data 설계를 하는데 유용합니다.

NoSQL 디자인에는 RDBMS 디자인과 다른 사고 방식이 요구됩니다. **RDBMS의 경우, 액세스 패턴을 생각하지 않고 정규화된 데이터 모델을 생성할 수 있습니다.** 그런 후 나중에 새로운 질문과 쿼리에 대한 요구 사항이 생길 때 이를 확장할 수 있습니다.

Specific한 케이스의 설계인 만큼 대조적으로 대답해야 할 질문을 알기 전까지는 NoSQL에 대한 스키마 설계를 시작할 수 없습니다. **사전에 비즈니스 문제와 애플리케이션 사용 사례를 이해해야 합니다.**






<br/>
<br/>

## NoSQL Table 설계에 접근

**NoSQL Table 설계의 첫 번째 단계는 시스템이 충족해야 하는 특정 쿼리 패턴을 파악하는 것입니다.**

<br/>

### 3가지 기본 요소 파악

애플리케이션 쿼리 패턴에서는 3가지 기본적인 속성을 이해하는 것이 중요합니다.

#### 데이터 크기

저장해야 할 데이터의 양과 한 번에 요청할 데이터의 양을 알면 가장 **효과적으로 데이터를 파티션(분할)하는 방법을 결정**할 수 있습니다.

#### 데이터 모양

쿼리를 처리할 때 데이터를 변화시키는 대신(RDBMS 시스템의 방식), NoSQL 데이터베이스는 **데이터베이스의 모양이 쿼리 대상과 일치하도록 데이터를 구성**합니다. 이는 속도와 확장성 향상에 중요한 요소입니다.

#### 데이터 속도

DynamoDB는 프로세스 쿼리에 사용할 수 있는 물리적 파티션의 수를 늘리고, 해당 파티션에 효율적으로 데이터를 배포해 조정합니다. 사전에 피크 쿼리 로드를 알면 I/O 용량을 가장 효과적으로 사용할 수 있는 데이터 파티션(분할) 방법을 결정하는 데 도움이 됩니다.


<br/>

### 구체적 쿼리 요구 사항 파악 및 퍼포먼스 고려

두 번째로 특정 쿼리 요구 사항을 파악한 후, 성능을 결정하는 일반 원칙에 따라 데이터를 구성할 수 있습니다.

#### 관련 데이터를 함께 유지합니다.

20년 전의 라우팅 테이블 최적화 연구에 따르면, 응답 시간 향상에 가장 중요한 한 가지 요소는 관련 데이터를 한 장소에 유지하는 `"Locality of reference"`입니다. 현재 NoSQL 시스템에도 정확히 적용됩니다. 관련 데이터를 가까이 유지하는 것이 비용과 성능에 큰 영향을 미치기 때문입니다. 관련 데이터 항목을 여러 테이블로 분산시키는 대신 NoSQL 시스템에 가능한 가깝게 관련 항목을 유지해야 합니다.

즉, DynamoDB 애플리케이션에서는 <mark>가능한 적은 수의 테이블을 유지해야 합니다.</mark>

단, 볼륨이 많은 시계열 데이터가 관여된 경우나 액세스 패턴이 아주 다른 데이터 세트는 해당되지 않습니다. 통상 반전된 인덱스의 단일 테이블로 간단한 쿼리를 활성화시켜 사용자의 애플리케이션에 필요한 복잡한 계층적 데이터 구조를 생성 및 검색할 수 있습니다.


#### 쿼리를 분산합니다.

많은 볼륨의 쿼리를 데이터베이스의 특정 부분에 집중시키지 않는 것이 중요합니다. I/O 용량을 초과할 수 있기 때문입니다. 대신 트래픽을 가능한 여러 파티션으로 분산시켜 '핫 스팟'이 방지되도록 <mark>데이터 키</mark>를 설계해야 합니다.




<br/>
<br/>

## Dynamo DB 설계하기

선행 개념을 알았으니, 위의 사항을 고려하며 dynamo db 데이터 모델을 아래의 사항과 함께 설계합니다.

### 어떤 기본키 전략을 가져갈 것인가?

#### Primary Key(기본키)

- 내부 해시 함수에 대한 입력으로 사용되는 키 → 정렬 불가
- 파티션 키로만 구성되어 있는 테이블에서는 동일한 파티션 키 값을 가질 수 없음.
- Equal Query만 가능한 데이터

#### Partition Key + Sort Key (복합 기본키)

- 동일한 파티션 키 값을 가질 수 있으며,두 아이템의 정렬키 값을 달라야함.
- 파티션 키가 동일한 모든 항목은 정렬키값을 기준으로 정렬
- Partition은 3개 AWS 가용 영역(AZ)에 중복하여 저장됨


<br/>

### Secondary Index(보조 인덱스) 설계는 어떻게 할 것인가?

#### LSI(Local Secondary Index)

- 기본 테이블과 파티션 키는 동일하지만정렬 키는 다른 인덱스
- 모든 로컬 보조 인덱스에는 기테이블의 파티션 및 정렬키가 자동적으포함 된다.
- 파티션 키 값으로 지정한 대로 단파티션을 쿼리할 수 있음.
- Sort Key 이외의 Attribute로 정렬할 필요가 있는 경우 사용함.

#### GSI(Global Secondary Index)

- 파티션 키 및 정렬키가 기본테이블파티션/정렬키와 다를 수 있는 인덱스
- 모든 글로벌 보조 인덱스는 파티션 키있어야 하며, 선택사항으로 정렬키를 가수 있음.
- 인덱스 크기 제약 없음



<br/>

### 조회 방법은 어떻게 할 것인가?

- 조회 쿼리를 어떻게 할 것인지 고려하며 테이블을 설계한다.
- 자세한 내용은 아래를 참조





<br/>
<br/>

## Dynamo DB 조회(Query or Scan) 사용

### Query 작성 방법

Amazon DynamoDB `Query` 작업도 비슷한 방법으로 데이터를 검색합니다. `Query` 작업은 데이터가 저장된 물리적 위치에 대한 빠르고 효율적인 액세스를 제공합니다.

각 옵션에 대한 많은 정보는 아래 Reference 링크에서 확인할 수 있습니다.

이 예제 테이블의 기본 키는 *Artist* 및 *SongTitle*로 구성됩니다.

```json
// Query Example

// 1. Return a single song, by primary key
{
    TableName: "Music",
    KeyConditionExpression: "Artist = :a and SongTitle = :t",
    ExpressionAttributeValues: {
        ":a": "No One You Know",
        ":t": "Call Me Today"
    }
}

// 2. Return all of the songs by an artist
{
    TableName: "Music",
    KeyConditionExpression: "Artist = :a",
    ExpressionAttributeValues: {
        ":a": "No One You Know"
    }
}

// 3. Return all of the songs by an artist, matching first part of title
{
    TableName: "Music",
    KeyConditionExpression: "Artist = :a and begins_with(SongTitle, :t)",
    ExpressionAttributeValues: {
        ":a": "No One You Know",
        ":t": "Call"
    }
}
```

### Query or Scan?

언듯 비슷해 보이지만 두 차이는 매우 중요합니다.

Scan이 기준과 일치하는 요소를 찾기 위해 **전체 테이블을 "스캔"하는** 동안 Query는 **기본 또는 보조 파티션 / 해시 키를 기반으로** 선택한 파티션에 대한 직접 조회를 수행합니다.

즉 Scan은 항상 전체 테이블을 스캔하기 때문에 속도의 차이가 많이나게 되며, 일반적으로 항상 스캔보다 쿼리를 선호해야 합니다.

스캔을 사용해야 할 경우는 다음과 같습니다.

- 검색 요청 정보에 PK 혹은 SK 값이 없으며 인덱스 값만 포함되어 있을 때

이 경우에도 최대한 PK 혹은 SK 값과 함께 자주 사용되는 패턴인 경우 GSI를 추가하여 설계한 뒤, 해당 속성을 인덱싱하고 쿼리를 사용하는 것이 좋습니다.

**마지막 수단으로 스캔을 사용해야 합니다.**




<br/>
<br/>

## NoSQL 관계 패턴

> [MongoDB 이해하기](https://kciter.so/posts/about-mongodb?fbclid=IwAR32_g_Ef2UpwCQuU3WlIOaaPvF8nj44EPz5mkws6uPeQ-_CuMzDFE5g40I)를 읽으면 더욱 좋습니다.

DDB는 Document라는 방식을 사용하기 때문에 RDBMS와는 다른 방식으로 모델링을 해야합니다. 이를 위한 패턴을 정리해보겠습니다.

NoSQL 사용 시, 결국 고도화 되고 기능이 추가될 수록 RDB와 마찬가지로 `관계를` 가져야 하는 요구사항이 나올 수 있습니다. 그렇다면 NoSQL에서 관계 문제는 어떻게 해결할 수 있을까요?

위 게시글을 살펴보면 여러 환경에서 트레이드 오프를 고려하며 선택해야 할 여러가지 알고리즘이 있습니다.

여러 알고리즘에서 알고 있어야 할 중요한 개념중 하나는 NoSQL에서는 `어떻게 관계를 이루는가?` 입니다.

**NoSQL 구현체에 따라 다르겠지만, NoSQL에서는 join의 성능이 느리거나 없기 때문에 Join대신 쿼리를 두 번 날려 연관 데이터를 불러오는 방식을 많이 사용합니다.**

그러나 데이터가 많아질수록 불리하기 때문에 여러 알고리즘을 익히고 다양한 전략을 활용할 줄 알아야 합니다.

알고리즘 중 하나만 소개하자면 아래와 같습니다.

<br/>

### Extended Reference

`Extended Reference` 패턴은 서로 관계가 있는 Document에서 자주 사용되는 데이터를 저장해두는 패턴입니다.

위에서 설명했다시피 NoSQL에서는 관계를 표현하기 위해 Join이 아닌 쿼리를 두 번 날려 연관 데이터를 불러오는 방식을 많이 사용고 있습니다.

그로 인해 데이터가 많아지거나 참조가 자주 필요할 수록 `Extended Reference` 패턴을 사용해야합니다.


<br/>
<br/>

## 추천하는 영상

<iframe width="560" height="315" src="https://www.youtube.com/embed/HaEPXoXVf2k" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/DIQVJqiSUkE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



<br/>
<br/>

## Reference

- [예: Query and Scan](https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/DynamoDBMapper.QueryScanExample.html)
- [Query](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html)
- [DynamoDB를 사용한 설계 및 아키텍처 설계 모범 사례](https://docs.aws.amazon.com/ko_kr/amazondynamodb/latest/developerguide/best-practices.html)
- [DynamoDB에 대해서 알아보자 - 1](https://velog.io/@drakejin/DynamoDB%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90-1)
- [Dynamo DB 설계 모범 케이스 분석](https://skout90.github.io/2020/03/25/etc/dynamo-db-architecture-best-practice/)
