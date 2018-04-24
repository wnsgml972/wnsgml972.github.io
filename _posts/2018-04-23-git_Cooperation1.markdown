---
layout: post
title: "Github 협업 이해하기"
subtitle: "Git Workflow 개념"
date: 2018-04-23
author: KimJunHee
category: Git
tags: github git collaborating workflow
finished: true
---

## Git Workflow

### Git Workflow 란?

* Git Workflow는 Git을 사용하여 일관되고 생산적인 방식으로 작업을 수행하는 방법에 대한 권장 사항이다. 말 그대로 권장 사항이니 사용자의 상황에 따른 Workflow를 구성하는 것이 중요하다.
* Git은 사용자가 변경 사항을 관리하는 방법에 많은 유연성을 제공한다. 이러한 Git과 상호작용 하기 위한 여러가지 __대표적인__ 작업의 흐름(Git Workflow)은 4가지가 존재한다.
* 이러한 Git Workflow 4가지는 팀이 변화의 흐름을 어떻게 적용 할 것인지를 합의하는 방법에 따라 구분한다.

### Centralized Workflow

* 모든 팀 구성원은 각자의 로컬 저장소를 이용해 개발하며 하나의 중앙 저장소만 있다.
* 모든 팀 구성원은 중앙 저장소를 복제하여 로컬 저장소를 만든 후, 로컬 저장소에서 파일을 수정하고 변경 내용을 ```commit```한다.
* 하나의 ```master branch```만 사용하며 모든 팀 구성원 모두 언제든 중앙 저장소에 ```push``` 할 수 있다. __(위험하다)__
* 중앙 저장소에 ```merge```할 때 서로간의 상의 없이 할 수 있기 때문에 대부분의 시간을 같이 있으며 __소규모 팀에__ 적합하다.
* 각 Workflow의 기본이 되는 Workflow 이다.

### Feature Branch Workflow

* Centralized Workflow와 비슷하나 팀 구성원간에 소통을 활성화하여 협업 성과를 이끌어 내기 위한 방법이다.
* Feature Branch Workflow의 핵심은 __기능별 branch를 만들어서 작업한다는 사실이다.__
* Feature Branch Workflow는 ```master branch```에 직접 커밋하지 않고 새로운 기능을 개발할 때마다 branch를 만들어 작업한다.
* 이렇게 작업한다면 새로운 기능은 새로운 branch에서 작업하므로 master 브랜치는 항상 bug free 상태로 유지할 수 있어, 지속적 통합(Continuout Integration)을 적용하기도 수월하다.
* 기능 개발을 끝내고 master에 바로 ```merge```하는 것이 아니라, branch를 중앙 저장소에 올리고 master에 병합해달라고 요청하는 방식인 ```pull request```를 사용한다.
* 이 Workflow 마찬가지로 유연하기 때문에 __소규모 팀에__ 적합하다. 만약 팀이 크고, 프로젝트 규모가 크면 브랜치마다 좀 더 특별한 의미를 부여하는 것이 더 낫다.

### Gitflow Workflow

* Gitflow Workflow는 코드 릴리즈 중심으로 엄격한 branching 모델을 제시한다.
* Feature Branch Workflow 보다 복잡하지만 __대형 프로젝트에서__ 적용할 수 있는 강건한 작업 절차가 된다.
* 이 Workflow의 모든 작업 절차들은 ```master branch```와 ```develop branch```두 개의 branch를 대상으로 한다.
* 작동 원리에 따른 브랜치이다.

#### commit 기록에 따른 브랜치

* ```master branch```는 릴리즈 이력을 관리하기 위해 사용한다.
* ```develop branch```는 기능 개발에 따른 branch들을 병합하기 위해 사용한다.

#### 기능 브랜치

* 새로운 기능은 각각의 branch에서 개발하고 백업 및 협업을 위해 중앙 저장소에 push 한다. 여기서 ```master branch```에서 branch를 따는 것이 아니라 ```develop branch```에서 딴다.
* 기능 개발이 끝나면 ```develop branch```에 병합한다. 즉 기능 브랜치는 ```master branch```와 관계가 없다.

#### 릴리즈 브랜치

* ```develop branch```에 릴리즈 할 수 있을만큼의 기능이 모인다면, ```develop branch```를 기준으로 릴리즈를 위한 branch를 따고 준비가 다 됐다면 ```master branch```에 병합한다.

#### 유지 보수 브랜치

* 운영 환경에 릴리스한 후 발견된 긴급 패치는 ‘hotfix’ 브랜치를 이용하며 ```master branch```와 ```develop branch``` 새로운 버전 이름으로 양쪽에 병합한다.

### Forking Workflow

* Forking Workflow는 다른 Workflow와 작동 방식이 다르다. 하나의 중앙 저장소를 이용하는 것이 아니라, 개개인 마다 서로 다른 원격 저장소를 운영하는 방식이다.
* 즉 모든 프로젝트 참여자가 개인적으로 로컬 저장소와 공개된 원격 저장소 2개의 저장소를 가진다.
* 아주 큰 규모의 분산된 팀에서 안전하게 협업하기에 좋은 방법이다.
* __오픈 소스 프로젝트에서__ 많이 사용하는 방식이다.

#### 작동 원리

* 공식 저장소를 fork해서 받은 다음 ```git clone```을 통해 로컬 저장소를 만든다. 자신이 개발한 내용은 자신의 복제본에 push한다. 그 다음 자신의 기여분을 반영해 달라는 pull request를 던진다.
* pull request를 받은 프로젝트 관리자는 충돌을 확인한 후 로컬 ```master branch```에 병합한 후 프로젝트 공식 저장소의 ```master branch```에 반영한다.

<br/><br/>
## 참고

* <https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow>
* <http://blog.appkr.kr/learn-n-think/comparing-workflows/#2-feature-branch-workflow>
