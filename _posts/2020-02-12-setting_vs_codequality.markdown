---
layout: post
title: "Visual Studio를 최대한 활용하여 Code Quality 강화하기"
subtitle: "Visual Stdio Code Quality"
date: 2020-02-12
author: KimJunHee
category: Setting
tags: visual-studio setting ci sonar-qube c cpp cpp-check code-quality
finished: true
---

> 좋은 도구일수록 많은 기능이 있고, 잘 활용할수록 위력적인 것 같다. 본 게시글은 Visual Studio의 많은 기능 중에서 툴을 활용한 기법에 한해서 `Code Quality`를 향상시킬 때 도움이 될 만한 것들을 정리하여 적어놓았다.

# Visual Studio Debugger 최대한 활용하기

> 일반적으로 디버깅을 잘하는 것은 정말 코드 실력에 도움이 많이 된다. 다음과 같은 MicroSoft Docs에 정말 잘 나와있다!<br/>
<https://docs.microsoft.com/ko-kr/visualstudio/debugger/?view=vs-2019>




<br/><br/>

## 1. 컴파일러 경고 강화
* 기본적으로 컴파일러 경고를 강화하여, 컴파일러가 잡아주는 경고들을 모두 잡자!
* `MicroSoft` 오픈 소스인 [calculator](https://github.com/microsoft/calculator)를 받아 분석해보니, 기본적으로 컴파일러 경고의 타입이 모두 최상위 수준이었다. 우리도 본받도록 하자
* `프로젝트 속성 -> C/C++ -> 일반 -> SDL 검사 (예 체크)`, `(Security Development Lifecyle)`




<br/><br/>

## 2. 기본적인 디버깅 팁

> 일반적으로 사용하는 디버깅 방법으로, 프로그램 런타임 중에 브레이크 포인트를 통해 디버깅하는 방법이다.

### 자동
* 자동 적으로 변수 표시
* 함수의 반환 값 표시

### 로컬
* 해당 지역 변수 내 디버깅 가능

### 조사식
* this
* 주솟값을 직접 조사식에 입력하여 한 변수 계속 추적

### 여러 가지 중단 팁
* 중단 조건에 예외 추가하기
* 데이터 중단점으로 주솟값을 이용하여 해당 변수 변경하면 중단하기 설정
* 데이터 중단점으로 마우스 우 클릭하여 -> 해당 값 바뀌면 중단하기 설정

### 호출 스택
* 호출 스택 시각화 (안타깝게도 엔터프라이즈만 가능하다.ㅠㅠ)
* Reference : <https://docs.microsoft.com/ko-kr/visualstudio/debugger/map-methods-on-the-call-stack-while-debugging-in-visual-studio?view=vs-2019>




<br/><br/>

## 3. 정적 코드 분석

### 정적 코드 분석이란?
정적 코드 분석 과정은 개발자가 눈으로 코드를 따라가면서 코드의 결함을 찾는 것과 유사하다. 다만 코드 분석기는 개발자보다 꼼꼼하고, 휴리스틱 하다. 

<br/>

### VS 정적 코드 분석
#### 직접 코드 분석 돌리기
* `분석 -> 코드 분석`을 통해 코드 분석을 실행

#### 빌드 시마다 정적 코드 분석하기
* `프로젝트 속성 -> 코드 분석 -> 빌드에 코드 분석 사용 (체크) -> 원하는 코드 분석 규칙 집합 선택`을 이용하면 빌드 시에도 코드 분석을 할 수 있다.
* `Cpp Core Check`라는 규칙으로도 Ckeck가 가능하다.
* **안타깝게도 시중에 파는 제품보다는 부족한 것 같다ㅠㅠ** -> 규칙을 한 3가지 넣고 빌드 해봤는데, 생각보다 잡혀야 할 부분이 잡히지 않았다.

#### CI 연동하여 자동화하기
* 위의 과정처럼 직접 코드 분석을 돌리거나, 개발용 PC를 빌드 시마다 정적 코드를 분석하도록 할 수 있지만, 개발에 매우 비효율적이다.
* 빌드 전용 서버 PC를 구성하여, `GitHub Pull Request` 혹은 `GitLab Merge Request`를 활용하여 자동화한다면 좋지 않은 품질의 코드들이 Merge 되는 것을 막을 수 있다.

#### 결과
출력 창에 해당 부분을 클릭하면

![help](/assets/setting/5/help1.png)

다음과 같은 설명이 나온다.

![help](/assets/setting/5/help2.png)

#### 느낀점
* 버퍼 오버 플로, 초기화, null or nullptr 참조 등등
* CI와 연동하여 자동화한다면 위력적인 도구로써 사용할 수 있는 것 같다.


<br/>

### 다른 여러 정적 코드 분석기

> 안타깝게도 VS 정적 코드 분석은 뭔가 좀 아쉬운 것 같다. 해결 방법으로 다른 제품과 함께 CI 연동을 하여 `Code Quality`를 강화할 수 있다.

#### CPP Check
무료 정적 분석기로 그냥 분석해서 Logging만 해준다. GitLab 유료 버전과 연동하고, CI를 이용하여 파이프라인에 붙여 사용하면 좋을 듯하다.

1. 파이프라인에 붙여, (Git Lab 담당자의 선택적 분석 or 항상 분석) 사용하기
2. GitLab 유료 버전을 통해, 분석 결과 자동 PR
3. 개발자는 보고 피드백하면 된다.


#### SonarQube
* SonarQube는 기업 단위에서는 다 유료이고, 개인 개발자 단위에서도 C/C++은 유료이다..
* SonarQube 또한 `Github`에서는 `Web Hooking`을 이용하면, `GitLab`에서는 그에 따른 연동 방식으로 분석 결과를 PR로 보낼 수 있는 듯하다.
* `GitLab` 말고도 `Jenkis` 같은 CI와 많은 개발자들이 연동해서 사용하고 있다.

![help](/assets/setting/5/q_all.png)

1. IDE에서 코드 수정을 하고 remote 저장소에 commit & push를 한다.
2. 그다음 github에서 master(혹은 stable 한 branch)에 대해 작업 branch를 PullRequest 올린다.
3. 미리 등록한 github의 web-hook에 의해 PullRequest 정보들을 jenkins에 전송한다.
4. 전달받은 정보를 재 가공하여 SonarQube로 정적 분석을 요청한다.
5. SonarQube에서 분석한 정보를 다시 jenkins로 return 해준다.
6. SonarQube으로부터 return 받은 정보를 해당 PullRequest의 댓글에 리포팅을 해준다.

**이미 너무 잘 정리해놓은 예제가 있어 첨부하였다.**

* Reference : <https://taetaetae.github.io/2018/02/08/jenkins-sonar-github-integration/>





<br/><br/>

## 4. 디버거를 사용한 예외 관리 예외 설정 추가

> 기본적으로 Compiler가 넘어가는 예외도 예외 설정에서 체크하여 예외로서 걸리게 만들 수 있다.

### 사용 환경
가끔 프로그램이 갑자기 어떠한 경고 창도 없이 출력 창에 메시지만 남기고 죽어버리는 경우가 있다. 
그럴 때 해당 기능을 사용하여 원하는 예외 처리 범위를 늘려 예외를 관리한다.

### Microsoft Docs
* <https://docs.microsoft.com/ko-kr/visualstudio/debugger/managing-exceptions-with-the-debugger?view=vs-2019>

위와 같은 것들은 기본적으로 익혀두도록 한다.




<br/><br/>

## 5. 디버거 사용자 지정 시각화
> 이 부분은 Code Quality 라기 보다는 Code 생산성 향상에 더 가까운 것 같다. 하지만 디버거를 정리하면서 어느정도 도움이 될 것 같아 같이 정리했다.

### 디버깅 시각화란? (`.nativs` file)
일반적으로 IDE에서 브레이크 포인트를 통해 밑에 모든 정보를 표시하는 디버거를 원하는 모양으로 볼 수 있게 시각화할 수 있다.

### 사용 환경
일반적으로 나오는 디버그 모드의 자동이나 조사식 등의 정보들이 너무 복잡하게 형성되어 있을 수 있다. 그러나 어떤 특정 UI의 Root 같은 경우, 아니면 Java의 Object 같은 객체는 일반적으로 사용자가 보고 싶은 형태로 디버거 변수들을 시각화할 수 있다.

### Nativs 적용 예제
#### Custom List

![help](/assets/setting/5/nativs1.png)

일반적인 연결 리스트는 위의 그림과 같이 연결된 다음 노드의 내용을 볼 수 없다.

해결하기 위해 `std::vector`의 경우 어떻게 되어있는지 살펴보자.

#### std::vector

![help](/assets/setting/5/nativs2.png)

마찬가지로 `std::vector` 또한 연결 리스트 기반으로 구현되었지만, 디버깅 정보에는 각 노드들의 정보를 모두 볼 수 있다!

해당 Nativs Script 파일을 보며 Custom List도 다음과 같이 보일 수 있도록 구현해보자

#### 스크립트 작성

![help](/assets/setting/5/nativs3.png)

* 스크립트는 해당 프로젝트의 Root에 구현한다. (VS 2017 이상 기준)
* 스크립트 작성 후, 디버그를 진행한다. 다시 빌드하지 않고 스크립트만 변경해도 괜찮다!


### Reference

> 이미 잘 나와있는 예제도 많아서 첨부하였다!

* [Boost 라이브러리를 통한 예제](https://www.kdata.or.kr/info/info_04_view.html?field=&keyword=&type=techreport&page=5&dbnum=188505&mode=detail&type=techreport)
* [Microsoft Docs](https://docs.microsoft.com/ko-kr/visualstudio/debugger/create-custom-views-of-native-objects?view=vs-2019)




<br/><br/>

## 6. `.editorconfig` file

> 편집기나 IDE에 관계없이 **일관된 코딩 스타일**을 유지할 수 있게 해준다.

### 지원되는 설정
* indent_style
* indent_size
* tab_width
* end_of_line
* 문자 집합
* trim_trailing_whitespace
* insert_final_newline
* 루트

### 예시

~~~
# 소스 코드 일관성 편집툴
# https://docs.microsoft.com/ko-kr/visualstudio/ide/create-portable-custom-editor-options
#

# 루트 설정 파일
root = true

# 모든 파일이 대해
#   줄바꿈 문자 기본값을 \r\n 으로
#   텍스트 인코딩을 utf-8로
[*]
end_of_line: crlf

# 웹 관련 기능들은 utf-8이 기본
[*.{json,md,js,html,htm}]
charset = utf-8

# C/C++ 소스 및 헤더파일에 대해
# 1.  Intent Style은 Space 한 Indent당 Space 4개 : 즉 Tap 누르면 Space 4개로
# 2.  빈 공백문자를 없애기
# 3.  소스 마지막줄에 빈줄 추가하기
[*.{cpp,c,h,hpp}]
indent_style = space
indent_size = 4
# 2. #trim_trailing_whitespace = true
# 3. #insert_final_newline = true
~~~

### Reference
* <https://docs.microsoft.com/ko-kr/visualstudio/ide/create-portable-custom-editor-options?view=vs-2017>




<br/><br/>

## 7. 정리하며

사실 개발자 간 코드 리뷰 시스템을 도입하여, 코드 리뷰를 하는 것이 가장 중요하다고 생각한다. 하지만 모든 곳에서 그만큼의 개발할 수 있는 자원이 많지 않고, 효과적으로 코드 리뷰를 하기 힘들 수도 있다. 본 게시글에서는 개발 문화가 아닌 개인이 빠르게 이뤄낼 수 있는 범위 내에서 `Code Quality`를 강화할 수 있는 방법을 정리하였다.

**또한 기본적으로 Clean Code를 짤 수 있도록 열심히 공부하고, 좋은 마음가짐으로 코드를 작성하자!**