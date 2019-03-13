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
* BuildVision
  * 빌드중 항목을 프로젝트 별로 정리하여 출력합니다.
* MatchMargin
  * 텍스트의 인덴트를 일치하게 만들어줍니다.
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
* PowerCommands
  * 필터에서도, 소스 파일에서도 해당 디렉토리를 바로 열 수 있습니다.
* **Live Share**
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
* 솔루션 빌드 (ctrl + shift + B) -> __( ```F7``` )__
* 뒤로가기 (ctrl + - ) -> __( ```ctrl + 화살표 왼쪽``` )__
* 뒤로가기 (ctrl + shift + - ) -> __( ```ctrl + 화살표 오른쪽``` )__
* VAssistX.RefactorAddInclude __( ```alt + I``` )__
* VAssistX.OpenCorrespondingFile (alt + O) ->  __( ```ctrl + ` ``` )__
* VAssistX.List Methods In Current File (alt + M) -> __( ```alt + Q``` )__
* 정렬 (ctrl + shift + F, 원래꺼 지우기) ->  __( ```ctrl + shift + F``` )__
* 편집.파일에서찾기 __( ```ctrl + alt + F``` )__
* 창.새창 __( ```alt + 1``` )__
* 창.새세로탭그룹 __( ```alt + 2``` )__
* 창.이전탭그룹으로이동 __( ```alt + 3``` )__
* 창.다음탭그룹으로이동 __( ```alt + 4``` )__
* 창.이전탭 __( ```alt + 5``` )__
* 창.다음탭 __( ```alt + 6``` )__
* 창.문서창닫기 (ctrl + F4, 원래꺼 지우기) ->  __( ```ctrl + W``` )__
* 창.탭고정 __( ```ctrl + E``` )__
* 창.고정된 항목을 모두 제외하고 닫기 ( ) -> __( ```ctrl + K, W``` )__
* 보기.작업목록 (ctrl + \ and T ) -> __( ```alt + T``` )__


<br/><br/>

## 유용한 단축기

### Visual Assist
* Header file과 Source file 전환 __( ```Ctrl + ` ``` )__
* Add Include __( ```alt + I``` )__
* 원하는 줄로 이동  __( ```Ctrl + G``` )__
* 심볼 찾기 __( ```alt + shift + S``` )__
* 파일 찾기 __( ``` alt + shift + O``` )__
* Goto Related __( ```shift + alt + G``` )__
* List Methods In Current File __( ```alt + Q``` )__


### Basic Visual
#### Etc
* 빠른실행  __( ```ctrl + Q``` )__ : 모든 명령어를 검색하여 실행 가능
* 클립보드  __( ```ctrl + shift + V``` )__
* 주석, 풀기  __( ```드래그 + /``` )__
* 정렬 바꾼 값 __( ```ctrl + shift + F``` )__
* 편집.파일에서찾기 __( ```ctrl + alt + F``` )__
* 솔루션 빌드 __( ```F7``` )__
* 뒤로가기 __( ```ctrl + 화살표 왼쪽``` )__
* 뒤로가기 __( ```ctrl + 화살표 오른쪽``` )__
* 줄바꿈 __( ```alt + 화살표 위 or 아래``` )__
* 세로편집 __( ```alt + shift + 화살표 위 or 아래``` )__
* 한줄씩편집 __( ```ctrl + c, ctrl + v, ctrl + x``` )__
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

## 캡쳐 화면

![visual setting](/img/ide/1/2.png)


<br/>

## 관련 게시글

* [Visual Studio Setting Import & Export](https://wnsgml972.github.io/setting/VisualStudio_Setting_Export.html)
