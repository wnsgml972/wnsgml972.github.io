---
layout: post
title: "VSCode 기본 Setting"
subtitle: "Visual Studio Code Basic Setting"
date: 2018-11-09
author: KimJunHee
category: Setting
tags: ide visual-studio visual-studio-code vscode setting
finished: true
---

> Visual Studio Basic Setting에 이은 VS Code Basic Setting입니다. <br/>
최대한 마우스를 사용하지 않고 모든 단축기를 외워서, 개발하기 쉬운 환경을 구성하는 방법입니다.

## 설치

### Windows

다운로드 후 설치합니다.

* <https://code.visualstudio.com>

### Ubuntu

#### 방법 1

1. <https://code.visualstudio.com>에서 ```Linux.deb```를 설치합니다.
2. ```$ sudo dpkg -i code_1.23.1-1525968403_amd64.deb```를 입력합니다.
3. ```$ code``` 명령어로 VS Code를 실행합니다.

#### 방법 2

1. <https://code.visualstudio.com>에서 ```Linux.deb```를 설치합니다.
2. 만약 방법 1에서 ```Package libconf-24 is not installed.``` 에러가 발생한다면  
```$ sudo apt-get install gconf-service-backend gconf-service gconf2-common libgconf-2-4```를 입력합니다.
3. ```$ sudo dpkg -i code_1.23.1-1525968403_amd64.deb```를 입력합니다.
4. ```$ code``` 명령어로 VS Code를 실행합니다.

<br/><br/>

## VS Code Add In

__```ctrl + shift + X``` 로 Extensions에서 검색할 수 있습니다.__

### [Setting Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync#review-details)
  
* 다른 컴퓨터에서도 Setting을 동기화 시켜줍니다.
* 현재 설정을 Github에 저장하기 __( ```shift + alt + U``` )__
* Github에 있는 설정 내려받아 적용하기 __( ```shift + alt + D``` )__


### [TODO-Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)

* TODO 주석을 하이라이팅 해줍니다.

![Todo](https://github.com/wayou/vscode-todo-highlight/raw/master/assets/material-night-eighties.png)



### [indent-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)

* 들여 쓰기를 효과적으로 볼 수 있게 해줍니다.

![indent-rainbow](https://raw.githubusercontent.com/oderwat/vscode-indent-rainbow/master/assets/example.png)




### [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)

* Import 시 드는 메모리 비용을 알려줍니다.

![Import Cost](https://file-wkbcnlcvbn.now.sh/import-cost.gif)



### [ftp-sync](https://marketplace.visualstudio.com/items?itemName=lukasz-wronski.ftp-sync#review-details)

* VS Code에서 바로 FTP로 업로드 또는 다운로드 할 수 있는 기능을 제공합니다.
* 서버와 클라이언트 동기화를 기본기능으로 제공하고 열려져있는 파일을 수정하여 저장하면 자동으로 서버에 업로드합니다.

![ftp-sync](https://i.imgur.com/W9h4pwW.gif)


<br/>

### [Git History](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons#review-details)

* git log 보기, 파일 히스토리, 브랜치와 커밋을 비교 할 수 있는 확장입니다.

![git-history](https://raw.githubusercontent.com/DonJayamanne/gitHistoryVSCode/master/images/gitLogv2.gif)

<br/>

### [vscode-icons](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons#review-details)

* 좌측에 있는 트리메뉴와 에디터 상단에 있는 탭메뉴의 타이틀명 앞에 아이콘을 붙혀 주어서 해당 파일이 어떤파일인지 직관적으로 알 수 있게 표시를 해줍니다.

![icons](https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/images/screenshot.gif)

<br/>

### [Markdown Shortcuts](https://marketplace.visualstudio.com/items?itemName=mdickin.markdown-shortcuts#review-details)

* Markdown에 대한 단축키를 제공해 주는 확장프로그램입니다.
* 단축키나 마우스의 오른클릭을 하면 메뉴로 보여주기때문에 쉽게 Markdown을 작성할 수 있게 해줍니다.

![shortcuts](https://raw.githubusercontent.com/mdickin/vscode-markdown-shortcuts/master/media/demo/bullets.gif)

<br/>

### [Prettier Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

* **파일 저장 시** 자동으로 코드를 정렬하여 저장합니다.

![prettier](/img/setting/3/prettier.gif)


<br/>

### [Table Formatter](https://marketplace.visualstudio.com/items?itemName=shuworks.vscode-table-formatter#review-details)

* 테이블을 정렬해줍니다.

![formatter](https://raw.githubusercontent.com/shuGH/vscode-table-formatter/master/res/complex_demo.gif)




<br/>

### [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

* 정적 및 동적 페이지에 대해 실시간으로 다시 로드 기능을 사용하여 개발할 수 있습니다.

![Live Server](https://github.com/ritwickdey/vscode-live-server/raw/master/images/Screenshot/vscode-live-server-animated-demo.gif)




<br/>

### [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)

* 일치하는 대괄호 색상을 구별하기 쉽게 바꿔줍니다.

![Bracket Pair Colorizer](https://github.com/CoenraadS/BracketPair/raw/master/images/example.png)





<br/>

### [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)

* 특정 코멘트 별로을 하이라이팅 해줍니다.

![Better Comments](https://github.com/aaron-bond/better-comments/raw/master/images/better-comments.PNG)







<br/>

### [CSS Peek](https://github.com/pranaygp/vscode-css-peek)

* CSS 아이디로 정의 위치 이동이 가능하게 합니다.
* Peek: load the file inline and make quick edits right there. `(Ctrl+Shift+F12)`
* Go To: jump directly to the file or open it in a new editor `(F12)`
* Hover: show the definition in a hover over the symbol `(Ctrl+hover)`

![CSS Peek](https://github.com/pranaygp/vscode-css-peek/raw/master/symbolProvider.gif)






<br/>

### [File Peek](https://github.com/abierbaum/vscode-file-peek)

* File Name으로 정의 위치 이동이 가능하게 합니다.
* Peek: load the file inline and make quick edits right there. `(Ctrl+Shift+F12)`
* Go To: jump directly to the file or open it in a new editor `(F12)`
* Hover: show the definition in a hover over the symbol `(Ctrl+hover)`

![File Peek](https://github.com/abierbaum/vscode-file-peek/raw/master/images/working.gif)







<br/>

### [Live Share](https://visualstudio.microsoft.com/ko/services/live-share/)
* 실시간으로 공동 작업을 할 수 있습니다.
* 팀 구성원과의 `Pair Programming`, 해커톤, 대화형 강의, 어려운 디버깅 작업, 브레인 스토킹 등등의 작업을 하기에 유리합니다.
* Visual Studio 2019에서는 기본 기능으로 들어가 있다고 합니다.

![Live Share](https://visualstudio.microsoft.com/wp-content/uploads/2018/11/v2-Edit-Comp_FINAL-optimized840.gif)





<br/><br/>

## 설정 동기화

* ```Settings Sync``` Add In을 사용합니다.
* github에 토큰을 입력하여 ```gist id```를 생성하고, ```gist id```를 복사해서 다른 컴퓨터에 입력하여 사용하는 방식입니다.

### github 토큰 생성

1. Github에 로그인 한 뒤 `Settings -> Developer settings -> Personal access tockens`에 들어가 다음을 클릭합니다.
![SettingSync](/img/setting/3/1.png)

2. Token 설명을 입력하고 gist를 체크한 뒤 토큰을 생성합니다.
![SettingSync](/img/setting/3/2.png)

3. 생성된 토큰을 복사합니다.
![SettingSync](/img/setting/3/3.png)

<br/>

### VScode Settings Sync

1. ```ctrl + shift + X```를 입력하여 `Settings Sync`를 다운받습니다.
2. ```shift + alt + U```를 입력합니다.
3. 이어서 나오는 창에 복사해 둔 **토큰을 입력합니다.**
4. 성공하면 다음과 같은 출력창이 출력됩니다.
5. 다음과 같은 출력창에 **제일 위에** 있는 `Github Token`과 `Github Gist`를 복사합니다.

![SettingSync](/img/setting/3/4.png)

<br/>

### 다른 pc에서 동기화하기

1. ```ctrl + shift + X```를 입력하여 `Settings Sync`를 다운받습니다.
2. ```shift + alt + D```를 입력합니다.
3. 이어서 나오는 창에 복사해 둔 `Github Token`과 `Github Gist`를 순서대로 입력합니다.
4. 이어서 나오는 확인창에 yes를 클릭하면 성공입니다.

> 한번 설정 이후에는 Github에 올리고 내리는 단축기만 입력하면 쉽게 설정을 동기화할 수 있습니다.

<br/><br/>

## 유용한 단축기

### Etc...

* 각종 Add-In이나 전체 명령어 탐색 기능  __( ```F1``` )__

### Settings Sync

* 현재 설정을 Github에 저장하기 __( ```shift + alt + U``` )__
* Github에 있는 설정 내려받아 적용하기 __( ```shift + alt + D``` )__

### Markdown Shortcuts

* 굵은 글씨 __( ```ctrl + B``` )__
* 글씨 기울기 __( ```ctrl + I``` )__
* 링크 __( ```ctrl + L``` )__
* 이미지 넣기 __( ```ctrl + shift + L``` )__
* 코드 블럭 생성/삭제 __( ```ctrl + M, ctrl + C``` )__
* 인라인 코드 블럭 생성/삭제 __( ```ctrl + M, ctrl + I``` )__
* 블릿 생성/삭제 __( ```ctrl + M, ctrl + B``` )__
* 리스트 생성/삭제 __( ```ctrl + M, ctrl + 1``` )__
* 체크박스 생성/삭제 __( ```ctrl + M, ctrl + X``` )__

### Basic Visual Code

* 최근 파일이나 기호를 탐색  __( ```ctrl + P``` )__
* ```?``` 를 입력하면 명령창에서 실행할 수 있는 명령 목록 조회  __( ```ctrl + P```)__
* 마지막 연 파일에 접근 __( ```ctrl + shift + Tap``` )__
* 편집기 명령으로 바로 이동 __( ```ctrl + shift + P``` )__
* 파일의 특정 기호로 이동 __( ```ctrl + shift + O``` )__
* 파일의 특정 행으로 이동 __( ```ctrl + G``` )__
* 주석 __( ```ctrl + /``` )__
* 터미널 __( ```ctrl + ` ``` )__
* 코드 접기/펴기 __( ```ctrl + shfit + [``` )__ __( ```, ctrl + shfit + ]``` )__
* 마크다운 미리보기 __( ```ctrl + K, V``` )__
* 현재 프로젝트 전체 파일에서 검색 __( ```ctrl + shift + F``` )__
* Explorer 띄우기 __( ```ctrl + shift + E``` )__
* Source Control 띄우기 __( ```ctrl + shift + G``` )__
