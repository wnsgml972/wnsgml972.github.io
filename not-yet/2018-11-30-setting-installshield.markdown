---
layout: post
title: "Installshield를 이용한 Installscript 인스톨 제작 가이드"
subtitle: ""
date: 2018-11-30
author: KimJunHee
category: Setting
tags: installshield
finished: true
---

## Intro

> 관리해야 할 항목들은 다음과 같다

1. 프로그램 버전
2. 설치 언어 및 프로그램 언어
3. 확장자 - 연결 프로그램 등록
4. 실행 파일 아이콘 이미지
5. 레지스트리
6. 필요 패키지

<br/><br/>

## Installshield Project 경로

> 다음 경로의 프로젝트 파일을 실행한다.(`*.ism file`)

Project  |                     Destination
-------- | ----------------------------------------------------
`` | ``

### 주의

* 현재 인스톨실드 프로젝트는 SVN등으로 관리가 되지 않으며, 별도의 백업을 하지 않기 때문에 수정에 주의가 필요하다
* R1→R2 또는 V200→V300 등으로의 큰 변화가 있을 경우, 위 프로젝트폴더 전체를 복사해서 작업하는 것을 추천한다. 즉 V200R2버전인 경우, MIDAS_PLT_MODS_V200_R2_KR 폴더를 새로 만들어 작업한다. 복사한 ism 파일 및 동 경로의 폴더명도 변경해주자




<br/><br/>

## 업무 내용

1. 프로그램 새 버전을 지정된 위치에 복사(**주 업무**): [Chap.4~6](#chap4) 
2. 인스톨 커스터마이즈: 인스톨 과정 중에 필요한 슬라이드, 또는 각 옵션등을 커스터마이징하는 작업. 
   * 프로그램 버전 구분을 위한 GUID설정 
   * 필요한 프로그램 사본 위치 지정/변경: [Chap.7](#chap7)
   * 인스톨 중 나오는 슬라이드(이미지) 추가/삭제
   * 라이센스 텍스트 편집
   * 등등
  
> 위 두가지 중, 1)에 대해 주로 알아본 뒤, 1)과 관련한 2) 의 특정 작업에 대해 설명하려 한다.(추후 시간있을 때, 업데이트 예정??)




<br/><br/>


## <a id="chap4">프로그램 복사 경로 (인스톨 묶을 때 필요한 프로그램 사본 위치)</a>

> 각 프로그램을 해당 경로에 복사하자.

### 주의

* V200 부터는 **64bit/32bit 통합**. 두 버전의 프로그램이 모두 있는지, 또는 문제가 없는지 확인이 필요하다.
* `R1 → R2` 로의 이행에서 R1과 별개로 R2의 **프로그램 사본을 따로 관리하고 싶은 경우**에는, [Chap.7을 참조](#chap7)하여 해당 경로를 변경해 주자.


### Plant MODS

|  Program   |                           Destination                           |
| ---------- | --------------------------------------------------------------- |
| Plant MODS | `` |

### MIDAS Plant

|       Program       |                                       Destination                                       |
| ------------------- | --------------------------------------------------------------------------------------- |
| midas Plant (32bit) | `` |
| midas Plant (64bit) | `` |


### MIDAS Foundation

|         Program          |                                            Destination                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| midas Foundation (32bit) | `` |
| midas Foundation (64bit) | `` |


### MIDAS Drawing

캐드팀에서 관리를 한다. 위의 Plant 와 Foundation 과는 다르게, 한 프로그램에 대해 컴포넌트가 여러 개 정의 되어 있다.



### Design+

Design+는 특별히 변동사항이 없는 것으로 판단되니, 현재 그대로 이용하면 될 듯

|    Program    |                            Destination                             |
| ------------- | ------------------------------------------------------------------ |
| midas Design+ | `` |



<br/><br/>

## 프로그램 원본 경로

> 지시에 따라서 파일을 [Chap.4](#chap4)에 있는 경로에 복사하도록 하자.

Plant 및 Foundation 은 기획 담당자가 지정해준 폴더에 원본이 있다.



<br/><br/>

## 빌드 Output 경로

> Installshield 빌드가 완료되면 다음 경로에 인스톨 관련 파일이 생성되므로 이 파일들을 지정된 장소에 복사하도록 한다.

폴더 명 규칙은 다음과 같다.  
`ex.) 2016년 2월 15일 한글판 => 20160215_KR`

|     Category      |                                                  Destination                                                   |
| ----------------- | -------------------------------------------------------------------------------------------------------------- |
| 인스톨 Ouput 경로 | `` |
| 업로드 경로       | ``                                                        |




<br/><br/>

## <a id="chap7">프로그램 복사 경로 변경(작업에 주의 필요‼)</a>

### 직접 컴포넌트에서 경로 바꾸기

> 인스톨실드가 인스톨을 만들 때 참조하는 프로그램의 경로를 변경하고 싶은 경우 다음의 
방법을 통해 변경하도록 한다.

#### 주의

* **링크 타입 중** `Dynamic, Static` 이 있는데, 영문판을 참고하여 편집하도록 하자.

#### 업무 내용

![installshield](/assets/img/kjh0121/11/11.28/installshield1.png)

위의 그림을 참고하자. 가장 왼쪽 트리의 Organization>Setup Design `(1)`을 선택하면 대화상자 중간의 트리가 표시된다. 그 트리에서 경로를 바꾸고 싶은 항목(폴더에 파일이 겹쳐진 모양의 아이콘)을 선택(예로 32bit_midas Plant, `(2)`한다. 오른편의 General>Link Type 을 보면 , Dynamic [참조경로] 가 표시되어있다`(3)` 이곳을 더블클릭하면 Link Type 대화상자가 나타나며, 경로를 바꿀 수 있다`(4)`.

<br/>

### <TIP> Path Variables

프로그램 복사 경로의 데이터가 많을 경우에는 매번 변경으로 이동할 때, 지연시간이 발생해 짜증.. 을 유발하는 경우가 많다. 또한, 대체로 경로가 상당히 길기 때문에 보기에도 불편한 경우가 많다. 이를 해결하기 위해서, Path Variables(이하 경로변수)를 사용하면 매우 쾌적하게 작업 할 수 있다.




<br/><br/>

## 인스톨 진행중 백그라운드 슬라이드 추가/삭제

> 추후 배포판의 기능이 추가되는 경우에, 인스톨 중 표시되는 슬라이드 이미지 추가 요청이 올 수 있다. 

이 작업은 [Chap.7](#chap7)과 마찬가지로, 인스톨실드 프로젝트 내부에서 관리하고 있다. `Behavior and Logic>Support Files/Billboards` 에서 편집을 할 수 있다. 인스톨 시작 이미지도 

??



<br/><br/>

## 라이센스 텍스트 편집

> 다른 제품의 라이센스 텍스트를 이용해서 조금 편집하면 될 듯 하다.


<br/><br/>
<hr/>

## 기타 사항

* Windows 응용 프로그램 완벽한 배포까지 <http://blog.dramancompany.com/2015/12/%EC%B2%98%EC%9D%8C-windows-%EC%84%A4%EC%B9%98-%ED%8C%8C%EC%9D%BC%EC%9D%84-%EB%B0%B0%ED%8F%AC%ED%95%98%EB%8A%94-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%93%A4%EC%9D%84-%EC%9C%84%ED%95%98%EC%97%AC/>

<br/><br/>

## Install Shield 추가 수업 들은 것

### GUID

* 고유 프로그램 ID인 GUID, 재설치나, 프로그램 삭제 시 등등에서 운영체제가 해당 프로그램을 찾을 때 필요하다.

### Install File

* 결국 압축파일이다! 각 실행 파일을 설치하고 운영체제 단에서 필요한 것을 해준다.

### 레지스트리

* 운영체제 단에서 사용하는 전역 변수

### 새로운 확장자 만들기
 
 * 인스톨 파일을 만들 때 mbcz라는 확장자를 사용하려면, 운영체제에게 새로운 확장자라는 것을 알려줘야 한다.

### 재배포패키지, CIM 설치 시 필요한 재 배포 패키지도 같이 설치해야 한다. 

* 스크립트 직접 작성


### Install 제작 후 확인해야 할 것

* 인스톨 기본 동작 잘 되는가?
    * 인스톨 파일 이미지 잘 보이는가?
    * 잘 지워지는가? (깔아놨던 것을 모두 지우는지)
    * 재설치 한번 해봤을 때 이미 깔렸으면 물어보는가? (GUID 확인)
* 언인스톨이 잘 되는가?
* 레지스트리 등록은 잘 되는가?
    * CIM 아이콘 안 깨졌는지.
    * 직접 주소 확인해보기 (윈도우 레지스트리 확인)
    * CIM 파일 더블 클릭 시 잘 되는가?
    * 윈도우 레즈스트리 편집기에서 밑에 경로로 가보면 모든 소프트웨어의 GUID를 확인할 수 있다.
~~~
HKEY_LOCAL_MACHINE\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\
HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\
~~~

### 배우면서 느낀 점?

* 사실상 스크립트 코드 읽는 법
* 사실상 스크립트 디버그 하는 법
* `F1` 검색하는 법
* 각 사용하는 `<PATH>` 같은 전역변수 작성 법
* Component 생성 법

등등 만 알면 나머지는 F1을 눌러 해결 할 수 있을 것 같다.


### 예제 코드

> 각각 vcredist의 64bit, 32bit지를 설치하는 예제코드이다.

1. `if then`은 `if` 이다. (대괄호가 없다. `endif`로 종료한다.)
2. `SUPPORTDIR`은 임시 디렉토리의 경로로, 필요한 재배포 패키지를 임시의 디렉토리를 생성해 그곳에 깔고 다시 그 디렉토리와 재배포 패키지 같은 것을 지우기 위함이다. -> (사용자 생성 문자열과는 좀 다르다. 이런 Default 문자열이 몇개 있다.)
3. `ChangeDirectory` shell 명령어 처럼 현재 디렉토리를 옮기는 명령이다.
4. 레지스트리 Root를 `HKEY_LOCAL_MACHINE`로 정한다.
5. GUID를 검사하고 이미 있으면 넘어가고 없으면 설치한다.

~~~c
/////////////////////////////////////////////////////////////////////    
// 1.1. vcredist_x84 2012 설치
if(SYSINFO.bIsWow64 = TRUE) then
szVcredistPathX86 = "SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\";
szVcredistPathX64 = "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\";
else
szVcredistPathX86 = "SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\";
endif;

ChangeDirectory (SUPPORTDIR^"vcredist_2012");
RegDBSetDefaultRoot(HKEY_LOCAL_MACHINE);
szKey = szVcredistPathX86 + "{B175520C-86A2-35A7-8619-86DC379688B9}";

if( RegDBKeyExist(szKey) < 0) then
if(LaunchAppAndWait (SUPPORTDIR^"vcredist_2012\\vcredist_x86.exe"," /passive /norestart ",WAIT) < 0) then
    MessageBox ("Unable to launch "+SUPPORTDIR^"vcredist_2012\\vcredist_x86.exe"+".", SEVERE);
endif;
endif;

/////////////////////////////////////////////////////////////////////    
// 1.2. vcredist_x64 2012 설치
if(SYSINFO.bIsWow64 = TRUE) then
REGDB_OPTIONS = REGDB_OPTIONS | REGDB_OPTION_WOW64_64KEY;

ChangeDirectory (SUPPORTDIR^"vcredist_2012");
RegDBSetDefaultRoot(HKEY_LOCAL_MACHINE);
szKey = szVcredistPathX64 + "{a1909659-0a08-4554-8af1-2175904903a1}";
	
		if( RegDBKeyExist(szKey) < 0) then
			if(LaunchAppAndWait (SUPPORTDIR^"vcredist_2012\\vcredist_x64.exe"," /passive /norestart ",WAIT) < 0) then
				MessageBox ("Unable to launch "+SUPPORTDIR^"vcredist_2012\\vcredist_x64.exe"+".", SEVERE);
			endif;
		endif;
		REGDB_OPTIONS = REGDB_OPTIONS & (~REGDB_OPTION_WOW64_64KEY);
	endif;
~~~
