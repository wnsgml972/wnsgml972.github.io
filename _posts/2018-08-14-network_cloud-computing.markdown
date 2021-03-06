---
layout: post
title: "클라우드 컴퓨팅, IaaS, PaaS, SaaS이란?"
subtitle: "클라우드 컴퓨팅의 여러 서비스 모델"
date: 2018-08-14
author: KimJunHee
category: Network
tags: network cloud-computing
finished: true
---

## Cloud Computing이란?

### 정리

* 클라우드 컴퓨팅은 서로 다른 물리적인 위치에 존재하는 컴퓨터들의 리소스를 가상화 기술로 통합해 제공하는 기술을 말합니다.
* 예를들면 개인용 컴퓨터나 기업의 서버에 개별적으로 저장해 두었던 프로그램이나 문서를 클라우드(대형 컴퓨터)에 저장하고 웹 브라우저 등 필요한 어플리케이션을 구동해 원하는 작업을 수행할 수 있는 __사용자 중심의 컴퓨터 환경을 말합니다.__

### 예시

* 네이버 오피스, Google DOCs(Google), Work Space(Microsoft), Acrobat(Adobe) 등등이 여기에 해당합니다.

<br/>
### 가상화와 클라우드 컴퓨팅의 차이

#### 정의

* 쉽게 정의하면 가상화는 __기술이고__ 클라우드는 __방법론__ 입니다.

#### 가상화

* 가상화는 우리가 쓰던 VMware나 Virtualbox와 같이 단일한 물리 하드웨어 시스템에서 여러 환경이나 자원을 생성할 수 있는 기술입니다.
* __하이퍼바이저__ 라고 불리는 소프트웨어가 하드웨어에 직접 연결되며 가상 머신을 만들 수 있습니다.
* 이러한 가상 머신은 하이퍼바이저의 자원을 적절하게 배분받은 후 사용합니다.

#### 클라우드 컴퓨팅

* 클라우드 컴퓨팅은 위에서 말했다시피 네트워크 전체에서 컴퓨팅, 네트워크, 스토리지 인프라 자원, 서비스, 플랫폼, 애플리케이션을 <span class="evidence">사용자에게 제공하는 접근 방식입니다.</span>
* 마지막으로 정의하자면 __가상화는 하드웨어에서 기능을 분리하는 기술__ 이고 __클라우드 컴퓨팅은 이러한 분할을 사용하는 솔루션보다 큰 개념인 방법론입니다.__

<br/>
## IaaS, PaaS, SaaS란 무엇인가?

![GitBlog](/assets/images/network/1/1.png)

### 정리

* 클라우드 컴퓨팅이 도입되면서 최근에 자주 들을 수 있는 용어입니다.
* IT 인프라의 여러 필요한 구성 요소 중 예전에는 모두 사용자가 관리해야만 했지만, 이제는 일정 부분을 클라우드에서 내려받는 형태가 많이 도입되었습니다.
* __얼마만큼 사용자가 관리하고 얼마만큼 클라우드에서 제공받는가에 따라__ 다음과 같이 네 가지로 나누어져 있습니다.
* 위의 그림에서 보이는 데로 노란색의 You manage는 사용자가 관리해야 할 부분이고, 흰색의 Managed by vendor는 기업(클라우드)에서 관리해주는 부분입니다.


<br/>
## Packaged Software

![GitBlog](/assets/images/network/1/2.png)

<span class="evidence">그림에서 보이는 것과 같이 직접 인프라와 플랫폼, 어플리케이션까지 모두 구성하여 관리하는 모델을 의미합니다.</span>

### 정리

* 물리적인 장치, 하드웨어(CPU, RAM, Storage, Network device 등등)을 모두 직접 구매해야 합니다.
* 직접 OS를 설치해야 합니다.
* 네트워크 환경을 직접적으로 구성해야 합니다.
* 서버 관리를 직접적으로 해야 합니다. (트래픽, 프로지버닝 등등)
* 이런 모든 것을 직접 사용자가 다 준비해야 하기 때문에 매우 큰 시간과 돈을 소비하게 됩니다.

<br/>
## IaaS(Infrastructure as a service)

![GitBlog](/assets/images/network/1/3.png)

<span class="evidence">Infrastructure 레벨을 제공하는 서비스를 의미합니다. 위에 보이는 것과 같이 사용자는 OS를 직접 올리고 그 상위 계층만 구성하면 되는 모델입니다.</span>

### 정리

* 우리가 자주 사용하는 가상 호스팅(VM Hosting)과 비슷하나 처음에 말했다시피, 가상 호스팅은 우리가 직접 장비를 사서 그 장비의 한에서 자원을 할당하고 구성해야 하지만, IaaS는 기업이 준비해놓은 환경에서 우리가 선택할 수 있다는 점에서 차이가 있습니다.
* 일반적으로 적은 OS가 지원됩니다. (아마존은 일부 Linux와 Windows Server 제공)
* 고객은 OS와 어플리케이션을 직접 관리해야 합니다.
* 관리 측면에서 개발자와 인프라 관리자의 역할을 분담시킬 수 있습니다.

### 장점

* 고객은 가상 서버 하위의 레벨에 대해서는 고려할 필요가 없다는 장점이 있습니다.

### 단점

* 그러나 역설적으로 IT 부서(특히, 운영부서)에서 느끼는 매우 큰 단점은 바로 가상 서버 하위의 레벨에 대해서는 전혀 고객이 접근하거나 컨트롤할 수 없습니다.
* 결국, 가상 서버 하위의 레벨에 대해서 고려할 필요가 없는 사용자가 쓰기에 적합한 모델입니다.

### 예시

#### AWS의 EC2

* AWS의 EC2를 이용하면 우리는 물리적인 서버와 Network, Storage 등등을 직접 구매하거나 준비하지 않아도 원하는 OS를 깔아 서버로 사용할 수 있습니다.
* AWS의 EC2는 사용자가 원하는 OS를 고르고 그에 해당하는 스펙을 선택하기만 하면, 모든 관리를 아마존에서 해주는 것입니다. OS를 제공한다는 느낌이긴 하지만, 선택권을 주고 OS의 종류나 다양한 자원들을 사용자가 선택하므로 대표적인 IasS라고 불리고 있습니다.

제가 이번에 만든 오픈소스 Mosquitto를 이용한 MQTT Broker를 아마존의 EC2에 올려서 사용하고 있는데 매우 편리합니다.<br/>
1년간은 프리티어로 사용할 수 있으니 관심 있으신 분은 한번 해보시는 게 좋은 것 같습니다.

#### 사용자

* AWS 처럼 직접 기업이 클라우드를 운영하고 사용자인 우리가 서비스를 받는 ```AWS EC2``` 같은 것이 이에 해당합니다.

#### 제공자

* 직접 클라우드를 구성할 수 있는 ```OpenStack```이라는 오픈 소스도 IaaS에 해당합니다. 서비스를 제공 받는 입장이 아닌 제공하는 인프라를 구성할 수 있는 오픈 소스입니다.
* OpenStack에 관한 게시글은 다음 포스팅에 다루도록 하겠습니다.


<br/>
## PaaS(Platform as a service)

![GitBlog](/assets/images/network/1/4.png)

<span class="evidence">개발자가 응용 프로그램을 작성할 수 있도록 플랫폼 및 환경을 제공하는 모델입니다.</span>

### 정리

* 운영 팀이 인프라를 모니터링할 필요가 없습니다.
* 사용자는 OS, Server 하드웨어, Network 등등을 고려할 필요가 없습니다.
* 사용자는 어필리케이션 자체에만 집중할 수 있습니다. __즉 개발자는 빠르게 어플리케이션을 개발하고 서비스 가능하게 할 수 있습니다.__
* ```IaaS```와 헷갈릴 수 있는데 아마존과 같은 서비스가 VM을 제공하는 ```IaaS```라면, ```PaaS```는 ```node.js, Java```와 같은 런타임을 미리 깔아놓고, 거기에 소스코드를 넣어서 돌리는 구조입니다. __다시 한번 얘기하면 우리는 소스코드만 적어서 빌드 하는 것이고, 컴파일은 클라우드에서 하여 결과만 가져오는 거라고 생각하시면 됩니다.__

### 장점

* ```PaaS```의 경우 이미 설치된 미들웨어 위에 코드만 돌리면 되기 때문에, 아무래도 관리가 매우 편리합니다.
* 가장 이상적인 어플리케이션 플랫폼 관점의 클라우드 모델로 업계에 받아들여지고 있습니다.

### 단점

* 이것도 IaaS와 마찬가지로 하나의 인프라를 기반으로 개발할 수 있다는 것 자체가 장점이자 단점이 될 수 있습니다.
* PaaS는 기본적으로 어플리케이션과 플랫폼이 함께 제공됩니다. 어플리케이션이 플랫폼에 종속되어 개발되기 때문에 다른 플랫폼으로의 이동이 어려울 수도 있습니다.

### 예시

* PaaS의 제공 업체로는 ```Heroku, Google App Engine, IBM Bluemix, OpenShift, SalesForce```가 있습니다.

<br/>
## SaaS(Software as a service)

![GitBlog](/assets/images/network/1/5.png)

<span class="evidence">설치할 필요도 없이 클라우드를 통해 제공되는 SW입니다.</span>

### 정리

* 위의 그림에서 보이는 것처럼 모든 것을 기업(클라우드)에서 제공함으로 사용자는 별도의 설치나 부담이 필요 없이 SW를 사용할 수 있습니다.
* SaaS는 소비 관점에서 제공되는 IT 방식의 서비스로 정리할 수 있습니다. 구독의 방식으로 돈을 벌거나 트래픽 기반으로 돈을 벌 수 있습니다.

### 장점

* Public Cloud에 있는 SW를 웹 브라우저로 불러와 언제 어디서나 사용할 수 있습니다.
* 사용자는 웹만 접속하면 되기 때문에 사용하기 매우 쉽고, 최신 SW 업데이트를 빠르게 제공받을 수 있습니다. 사실상 기업 입장에서도 클라우드에 SW가 있기 때문에 따로 업데이트를 하지 않아도 접속한 사용자는 최신 SW를 사용하게 될 수 있습니다.

### 단점

* 단점으로는 SaaS의 특성상 반드시 인터넷에 접속할 수 있어야만 사용할 수 있고, 외부의 데이터 노출에 대한 위험이 있습니다.

### 예시

* 예로는 웹 메일, 구글 클라우드, 네이버 클라우드, MS오피스365, 드롭박스 등이 있습니다.

<br/>
## 결과

![GitBlog](/assets/images/network/1/0.png)

* 정리하자면 위의 그림과 같이 한 단어로 host, build, consume으로 표현이 가능합니다.

<br/><br/>
## 참고

* <https://www.cisp.or.kr/archives/12017>
* <https://assist-software.net/blog/cloud-offering-comparison-between-iaas-paas-saas-baas>
* <https://blogs.msdn.microsoft.com/eva/?p=1383>
* <http://it.donga.com/25782/>
* <https://wodonggun.github.io/wodonggun.github.io/study/IaaS,-PaaS,-SaaS.html>
