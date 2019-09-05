---
layout: post
title: "Visual Studio 기본 Setting"
subtitle: "Visual Studio 2017 Basic Setting"
date: 2018-10-07
author: KimJunHee
category: Setting
tags: ide visual-studio setting
finished: true
---

> "훌륭한 프로그래머는 게을러야 한다." 라는 말이 있습니다. 최대한 마우스를 사용하지 않고 모든 단축기를 외워서, 개발하기 쉬운 환경을 구성하는 방법입니다. <br/>
Font나 기존 단축기를 바꾼 부분은 저의 개인적인 취향이니 꼭 따라하지 않으셔도 됩니다.

## Font

__VS실행 -> [도구] -> [옵션] -> [환경] -> [글꼴 및 색] (D2Coding), 크기 10__

* 폰트의 경우 Coding Font의 맞게 코딩시 영문자와 숫자, 한글간의 모호성이 있는 기호가 변별력이 있는 폰트를 선택하였습니다.
* [Naver D2 Coding Font](https://github.com/naver/d2codingfont)

<br/>

## Visaul Add In

### Visual 기본 Add In

__VS실행 -> [도구] -> [확장 및 업데이트] -> [온라인] -> [Visual Studio 갤러리] 에서 검색__
* Code Graph
  * 개발한 코드를 시각화 해서 보여줍니다.
  * 정적 코드 시각화 기능을 사용합니다. (즉, 디버그중에 사용하는 것은 아닙니다.)
  * 별도의 빌드가 필요합니다. 
  * 솔루션 내부에, 코드분석결과 파일이 생성되므로, git 에 올리지 않도록 ignore 처리가 필요합니다.
* Add New File
  * `.gitignore` 같은 형식이 없는 파일을 쉽게 생성할 수 있게 해줍니다.
* File Icons
  * 파일 아이콘 테마를 바꿔줍니다.
* File Nesting
  * 중첩되는 파일 별로 Filter를 정리할 수 있게 해줍니다.
* Type Hierachy
  * Class나 Interface의 Hierachy를 보여줍니다.
* BuildVision
  * 빌드중 항목을 프로젝트 별로 정리하여 출력합니다.
* StructureVisualizer (c++ only)
  * 구문, 즉 괄호에 조금 더 잘 알아볼 수 있게 하이라이팅 해줍니다.
  * 기능으로 영역 안에서 ctrl 누르고 있으면 하이라이팅 찐하게 됩니다.
* Viasfora
  * Text Editor에 다양한 색깔 추가합니다.
* __Visual Assist X__
  * 정말 다양한 기능을 제공합니다.
  * 아쉽게도 유료입니다...
* VSColorOutput
  * 하단의 [출력] 창에 내용에 로그 수준(경고/에러)에 따라 색상을 부여합니다.
* CodeMaid
  * 불필요한 공백 기능 제거, 소스 파일에서 어느 필터에 있는지 나오는 기능, 등등 여러 기능을 제공합니다.  (옵션에서 Progresing 옵션을 모두 꺼줘야합니다.)
* **Live Share**
  * VS2019에서는 기본 기능입니다.
  * [Microsoft](https://visualstudio.microsoft.com/ko/services/live-share/) 에서 다운합니다.
  * 실시간으로 공동 작업을 할 수 있습니다.
  * 팀 구성원과의 `Pair Programming`, 해커톤, 대화형 강의, 어려운 디버깅 작업, 브레인 스토킹 등등의 작업을 하기에 유리합니다.

### Doxygen
* 코드상의 주석을 통해 문서를 만들어내는 프로그램, 특정 규칙에 의거하여 주석을 하면 그걸 통해 문서를 만들어줍니다.

### Visual Lead Detector
* 메모리가 누수 되는 것을 잡아주는 툴입니다.


<br/>

## 단축기 설정

저의 개인적인 취향으로, 유용한 단축기들을 사용하기 쉽게 바꾸는 부분입니다.

* __VS실행 -> [도구] -> [옵션] -> [환경] -> [키보드] -> (기본은 텍스트 편집기에서 하고 안 되는 것은 전역으로 하기)__

### 목록
* VAssistX.RefactorAddInclude __( ```alt + I``` )__
* VAssistX.RefactorCreateImplementation __( ```ctrl + .``` )__
* VAssistX.OpenCorrespondingFile (alt + O) ->  __( ```ctrl + ` ``` )__
* VAssistX.List Methods In Current File (alt + M) -> __( ```alt + Q``` )__
* 솔루션 빌드 (ctrl + shift + B) -> __( ```F7``` )__
* 뒤로가기 (ctrl + - ) -> __( ```ctrl + 화살표 왼쪽``` )__
* 앞으로가기 (ctrl + shift + - ) -> __( ```ctrl + 화살표 오른쪽``` )__
* 정렬 (ctrl + shift + F, 원래꺼 지우기) ->  __( ```ctrl + shift + F``` )__
* 편집기상황에맞는메뉴.코드창.헤더코드파일전환  __( ```ctrl + ` ``` )__ : Visual Assist 대체
* 편집.파일에서찾기 __( ```ctrl + alt + F``` )__
* 편집.모든참조찾기 __( ```shift + alt + F11``` )__ : Visual Assist 대체
* 편집.선택영역을주석으로처리 (ctrl + K, ctrl + C) -> __( ```ctrl + /``` )__ : Visual Assist 대체
* 편집.선택영역의주석처리제거 (ctrl + K, ctrl + U) -> __( ```ctrl + shift + /``` )__ : Visual Assist 대체
* 창.새창 __( ```alt + 1``` )__
* 창.새세로탭그룹 __( ```alt + 2``` )__
* 창.이전탭그룹으로이동 __( ```alt + 3``` )__
* 창.다음탭그룹으로이동 __( ```alt + 4``` )__
* 창.이전탭 __( ```alt + 5``` )__
* 창.다음탭 __( ```alt + 6``` )__
* 창.문서창닫기 (ctrl + F4, 원래꺼 지우기) ->  __( ```ctrl + W``` )__
* 창.탭고정 __( ```ctrl + E``` )__
* 창.고정된 항목을 모두 제외하고 닫기 -> __( ```ctrl + K, W``` )__
* 보기.작업목록 (ctrl + \, T ) -> __( ```alt + T``` )__



<br/><br/>

## 유용한 단축기 (위에 변경한 것 기준으로 최종)

### Visual Assist
#### 기본 기능으로 대체 가능한 것
* 선택영역 주석, 풀기  __( ```선택영역 + /``` )__
* Header file과 Source file 전환 __( ```ctrl + ` ``` )__ 
* Create Implementation __( ```ctrl + .``` )__
* Find File __( ``` shift + alt + O``` )__ (대체가 가능하긴 하나 VAssist의 기능이 훨신 좋음, VS2017기준)
* Find References __( ```shift + alt + F``` )__
* Find Symbol __( ```shift + alt + S``` )__

#### 대체 불가능한 것
* Add Include __( ```alt + I``` )__
* Goto Related __( ```shift + alt + G``` )__
* List Methods In Current File __( ```alt + Q``` )__
* 클립보드  __( ```ctrl + shift + V``` )__


### Basic Visual
#### Etc
* 원하는 줄로 이동  __( ```ctrl + G``` )__
* 괄호 짝 찾기  __( ```ctrl + ]``` )__
* 빠른실행  __( ```ctrl + Q``` )__ : 모든 명령어를 검색하여 실행 가능
* 책갈피  __( ```ctrl + F2``` )__
* 정렬 __( ```ctrl + shift + F``` )__
* 솔루션 빌드 __( ```F7``` )__
* 뒤로가기 __( ```ctrl + 화살표 왼쪽``` )__
* 앞으로가기 __( ```ctrl + 화살표 오른쪽``` )__
* 줄바꿈 __( ```alt + 화살표 위 or 아래``` )__
* 세로편집 __( ```shift + alt + 화살표 위 or 아래``` )__
* 한줄씩편집 __( ```ctrl + c, ctrl + v, ctrl + x``` )__
* 편집기상황에맞는메뉴.코드창.헤더코드파일전환  __( ```ctrl + ` ``` )__ 
* 편집.파일에서찾기 __( ```ctrl + alt + F``` )__
* 편집.빠른기호찾기 __( ```shift + alt + F12``` )__: Visual Assist Find Symbol 대체
* 편집.모든참조찾기 __( ```shift + alt + F11``` )__: Visual Assist Find References 대체
* 편집.선택영역을주석으로처리 __( ```ctrl + /``` )__ : Visual Assist 대체
* 편집.선택영역의주석처리제거 __( ```ctrl + shift + /``` )__ : Visual Assist 대체
* 편집.전체로이동 __( ```ctrl + T``` )__ : Visual Assist의 Find File 대체
* 솔루션 탐색기 검색 __( ```ctrl + ;``` )__ : Visual Assist의 Find File 대체
* 보기.빠른작업및래팩터링  __( ```alt + enter``` )__ : Visual Assist 정의만들기 대체
* 보기.작업목록 __( ```alt + T``` )__

#### 창, Tap 관련
* 창.이전문서창으로이동 __( ```ctrl + tap``` )__
* 창.새창 __( ```alt + 1``` )__
* 창.새세로탭그룹 __( ```alt + 2``` )__
* 창.이전탭그룹으로이동 __( ```alt + 3``` )__
* 창.다음탭그룹으로이동 __( ```alt + 4``` )__
* 이전탭 __( ```alt + 5``` )__
* 다음탭 __( ```alt + 6``` )__
* 창.문서창닫기  __( ```ctrl + W``` )__
* 창.탭고정 __( ```ctrl + E``` )__
* 창.고정된 항목을 모두 제외하고 닫기 __( ```ctrl + K, W``` )__


#### 중단점
* 중단점 창 __( ```ctrl + alt + B``` )__
* 중단점 설정/해제/삭제 __( ```F9``` )__
* 중단점 설정/해제 __( ```ctrl + F9``` )__
* 모든 중단점 설정 __( ```디버그 텝 메뉴 확인``` )__
* 모든 중단점 해제 __( ```디버그 탭 메뉴 확인``` )__
* 모든 중단점 삭제 __( ```ctrl + shift + F9``` )__


<br/>

## 추가 Visual Assist 설정
### Visual Assist Options 추가

![visual setting](/img/ide/1/3.png)

* 다음과 같이 Apply coloring to 부분에 모든 부분을 Check 해주게 되면, 나열되어 있는 여러 부분이 모두 하얀 글씨가 아닌 `Highlighting` 된 방식으로 보이게 됩니다.
* ex) 모두 찾기 결과, List Box 등등등 매우 유용합니다!

<br/>

## 캡쳐 화면

![visual setting](/img/ide/1/2.png)


<br/>

## 관련 게시글

* [Visual Studio Setting Import & Export](https://wnsgml972.github.io/setting/VisualStudio_Setting_Export.html)
