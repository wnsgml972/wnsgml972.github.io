---
layout: post
title: "Windows WinDBG, UMDH로 Memory Leak 잡기"
subtitle: "Catch Memory Leak with Windows WinDBG"
date: 2020-02-15
author: KimJunHee
category: C
tags: c memory-leak windows WinDbg, UMDH Windows-10-SDK UMDH
finished: true
---

> Memory Leak을 잡기 위한 여러 도구들이 있지만, 생각보다 접근성이 쉽지 않거나, 원하는 프로세스를 찾지 못하는 문제가 있었습니다. 그렇기 때문에 본 게시글에서는 여러 도구 중 전통적으로 쓰이던 `Windows SDK`에 있는 `WinDBG`를 통해 Memory Leak을 잡는 방법에 대해 작성하였습니다.

<br/>

# Memory Debug

## 기본 배경지식

먼저 Memory Leak이 발생하는 이유와, 알아야 할 기본적인 지식이라고 생각되는 것에 대해 간단히 정리하였습니다.

![img](/assets/images/c/5/user_mode_virtual_address.png)

* **기본적인 경우에** 32bit 윈도우를 지원하면 가상 메모리 한계는 2GB고, 64bit는 `x64` 기준 약 8테라 바이트입니다.
* 메모리 이슈를 분석할 때에는 더 나은 도구로 `Commit Size`를 포함한 여러 지표를 확인해야합니다.
* **재현 가능한 메모리릭은** `UMDH`등의 툴을 활용할 수 있습니다.
* **재현 불가능한 메모리릭은** `windbg로 풀 덤프 Heap 분석`을 시도해야합니다.

위에서 정리한 바와 같이, `UMDH`의 경우는 메모리 릭을 발생시키는 방법을 재현 가능할 때 사용할 수 있는 도구이고, `WinDBG 풀 덤프 Heap 분석`의 경우 재현 불가능한 메모리릭을 잡기 위한 도구입니다. 상황에 맞게 잘 활용해야 합니다!



<br/><br/>

## 상황 인식

### 게임을 하다가 자꾸 메모리가 부족하다면서 튕겨요... (`Out of Memory`)

* RAM은 남아도는데...?
* 머신의 물리 메모리(RAM)이 부족한 것이 아니라 __Process의 가상 메모리가__ 부족한 것!
* 대부분 컴퓨터 사양 문제가 아닌, 응용 프로그램의 문제다.
* 프로세스 가상 메모리의 한계는 : 프로세스 플랫폼에 따라 (32bit, 64bit), 운영체제 버전(x86, x64)에 따라
* 일반적으로 32bit에서는 가상 주소 공간은 2기가 바이트 범위이고, 64bit에서는 8테라 바이트 범위이다.
* 32bit인데 4기가 바이트가 아닌 이유는 커널 메모리와 유저 메모리가 나누어져 있기 때문!
* 64bit 환경에서는 `Out of Memory`가 잘 뜨진 않지만, 메모리 증가로 **페이즈 폴트 증가, 캐시 미스 증가, 종합하여 퍼포먼스에 악영향을 미칠 수 있다.**

### `Out of Memory`의 원인들

* `Commit`으로 인한 가상 메모리 고갈 -> `Memory Leak`
* `Reserve`로 인한 가상 메모리 고갈
* `Page File Limit`
* 단편화
* 등등



<br/><br/>

## 활용 도구 준비하기

~~~shell
1. UMDH.exe
2. WinDBG.exe
~~~

### WinDBG 사용하기

> WinDBG를 사용하려면 Windows SDK 안에 있는 WinDBG를 다운 받아야 합니다. 참고로 `UMDH`도 `WinDBG` 포함

#### Install WinDBG SDK

* <https://docs.microsoft.com/ko-kr/windows-hardware/drivers/debugger/debugger-download-tools>

#### Symbol Path Config

* <https://docs.microsoft.com/ko-kr/windows-hardware/drivers/debugger/using-a-symbol-server>
* 그냥 여기 가서 2개 cmd 창에 복붙!

~~~bash
set _NT_SYMBOL_PATH=srv*DownstreamStore*SymbolStoreLocation
set _NT_SYMBOL_PATH=srv*DownstreamStore*https://msdl.microsoft.com/download/symbols
~~~

<br/><br/>


## Memory Leak 검증 시나리오

### 특정 행위를 할 때, Memory Leak이 되는 것 같은 시점을 포착했을 때 (재현이 가능할 때)

1. 동적 할당이 일어나는 콜스택 별로, 할당 횟수, 해제 횟수, 할당 크기 수집
2. 재현 전, 콜스택 별 메모리 할당량 기록
3. 재현 (특정 행위 10번 반복)
4. 재현 후, 콜스택 별 메모리 할당량 기록, 2번과 비교

### UMDH.exe  : 재현이 가능해요!

1. 동적 할당이 일어나는 콜스택 별로, 할당 횟수, 해제 횟수, 할당 크기 수집
    * `gflags /i Client.exe +ust`
2. 재현 전, 콜스택 별 메모리 할당량 기록
    * `umdh -pn:Client.exe > C:\log1.txt`
3. 재현 (특정 행위 10번 반복)
4. 재현 후, 콜스택 별 메모리 할당량 기록, 2번과 비교
    * `umdh -pn:Client.exe > C:\log2.txt`
5. diff check 사용
    * `umdh.exe C:\log1.txt C:\log2.txt > C:\diff.txt`
5. Heap Dump를 위한 크롤링 부분은 성능에 매우 악영향을 미치니, 메모리 릭 검증할 때만 사용할 것!
6. 분석 시 참고 : <https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/interpreting-a-log-comparison>

> command를 통한 환경 변숫값 지정, GFlag Heap 추적 설정, 추적 해제 등 생각보다 사용하기 쉽지 않은 부분 많았습니다. 그렇기 때문에 밑에 배치 파일을 통해 모든 것을 사용하기 쉽게 만든 부분에 대한 설명이 있습니다. <br/>
위 명령어가 어렵다고 생각되시면, 간단하게 어떻게 이뤄지고 있는지에 대해서만 익히고, 밑에 있는 배치 파일 코드를 통해 Memory Leak을 잡으실 수 있습니다.


<br/>

### WinDBG.exe  : 재현이 불가능해요! ㅠ

1. 작업관리자에서 프로세스 탐색
2. 덤프 파일 만들기 클릭
3. WinDBG.exe -> Heap 분석 사용
4. WinDBG.exe 프로그램 실행 후, 덤프 파일 열기, 심볼 경로를 설정
5. 전체적인 Heap 상황 확인
    * `!heap -s`
    * 특정 heap들이 다른 heap 보다 월등히 큰 것을 탐색
    * 해당 heap의 주소 기억
    * `!heap -stat -h 2150000(주소)`   : 누수가 발생한 힙에서 할당 사이즈 별 개수 통계
    * `!heap -flt s 30`  -> 가장 많이 할당된 크기의 메모리 블록 모두 검색
6. 누수가 발생한 힙에서 메모리 크기 별 할당 횟수 집계
7. 가장 많이 할당된 크기의 메모리 블록 모두 검색

> 재현이 불가능한 Memory Leak에 대해서는 밑에 Reference에 있는 게시글에서 좀 더 자세한 내용을 확인하실 수 있습니다.



<br/><br/>

## UMDH 배치 파일

### 간단한 사용법

* UMDH를 쉽게 사용하기 위한 배치 파일입니다.
* 프로그램 시작 시 1, 2 배치파일 실행
* 메모리 릭 재현 *10
* 3, 4 배치 파일 실행
* 을 이용하시면 쉽게 메모리 덤프 비교 파일을 얻을 수 있습니다.
* 본 배치 파일에 임의로 적혀있는 기본 변숫값들은 `KaKaoTalk.exe`을 예시로 구현하였습니다.

**카카오톡 테스트 값 결과 파일**
![result](/assets/images/c/5/kakao_dump.png)


<br/>

### Symbol 환경 변수 지정, 사용자 변수 생성, GFlag Heap Dump On

해당 부분에서는 `:: ----- Input Your Info`에 해당하는 4가지 변수에 대해서만 직접 입력해주시면 됩니다.

1. `YourProgramBitInfo` : 해당 프로그램 개발 플랫폼 정의
2. `WinSDKProgramPath` : WinSDK 설치 경로
3. `YourTargetProgram` : Memory Dump를 진행할 프로세스 이름
4. `YourOutPutFileBasePath` : Memory Dump 후 기록된 Output File Path

~~~bat
:: 1. windbg_start_initialize.bat
:: Var Set ----
:: symbol set
set _NT_SYMBOL_PATH=srv*DownstreamStore*SymbolStoreLocation
set _NT_SYMBOL_PATH=srv*DownstreamStore*https://msdl.microsoft.com/download/symbols

:: ----- Input Your Info
:: Input Your Info
set YourProgramBitInfo=x86
:: or x64

set WinSDKProgramPath=C:\Program Files (x86)\Windows Kits\10\Debuggers\%YourProgramBitInfo%\
set YourTargetProgram=KaKaoTalk.exe
set YourOutPutFileBasePath=C:\Users\kjh0121\Documents

:: Input Dumb Result File Path, Name
set ResultFile1=%YourOutPutFileBasePath%\log1.txt
set ResultFile2=%YourOutPutFileBasePath%\log2.txt
set DiffCheckResultFile=%YourOutPutFileBasePath%\diff.txt

:: GFlag Memory Tracking On ----
:: gflags excute `YourTargetProgram`
cd %WinSDKProgramPath%
gflags /i %YourTargetProgram% +ust
~~~



<br/>

### 최초 상태 Memory Dump

~~~bat
:: 2. windbg_start.bat
:: excute umdh.exe `YourTargetProgram`
:: Result is `ResultFile1`
cd %WinSDKProgramPath%
umdh.exe -pn:%YourTargetProgram% > %ResultFile1%
~~~


<br/>

### Memory Leak 재현 후 Memory Dump

~~~bat
:: 3. windbg_end.bat
:: excute umdh.exe `YourTargetProgram` Same!, Perhaps a Memory Leak occurred.
:: Result is `ResultFile2`
cd %WinSDKProgramPath%
umdh.exe -pn:%YourTargetProgram% > %ResultFile2%
~~~




<br/>

### 완성된 2개의 Output File Difference Check, 사용 변수 모두 초기화, Heap Dump Off

~~~bat
:: 4. windbg_diff_check
:: excute umdh.exe difference check `ResultFile1` and `ResultFile2`
:: Result is `DiffCheckResultFile`
cd %WinSDKProgramPath%
umdh.exe -v -d -l %ResultFile1% %ResultFile2% > %DiffCheckResultFile%

:: GFlag Memory Trackiong OFF ---
:: Initialize GFlag
gflags /i %YourTargetProgram% -ust

:: Var Initialize ---
:: Var Set Initialize
set _NT_SYMBOL_PATH=
set _NT_SYMBOL_PATH=

:: Input Your Info
set WinSDKProgramPath=
set YourTargetProgram=
set YourOutPutFileBasePath=

:: Input Dumb Result File Path, Name
set ResultFile1=
set ResultFile2=
set DiffCheckResultFile=
~~~





<br><br>

## 실제 Memory Leak 해결 사례

### 해결 과정

1. 프로그램 시작 시 User 힙 메모리 덤프
2. Document를 열었다 닫았다 * 5 하고, User 힙 메모리 덤프
3. 해당 덤프 파일 difference file 생성
4. Leak 예상 부분 수정
5. 다시 해결됐는지 같은 방법으로 확인

### 결과 파일

![result](/assets/images/c/5/memory_leak_diff_result.png)

위의 그림을 보면, Memory Leak으로 의심되는 부분에 대한 정보가 나오게됩니다. 해당 부분에서 **프로젝트 이름, 클래스 이름, 함수 이름, 소스파일 위치, 라인 수까지** 정확한 정보가 나오므로 해당 부분을 기준으로 분석을 진행했습니다.

해당 부분은 `cpp` `shared_ptr`의 댕글링 포인터로 인한 오류였습니다. Memory Leak 해결 방법으로 해당 부분을 `weak_ptr`로 바꾸어 Memory Leak이 없어진 것을 확인하였습니다.


<br/><br/>

## Reference

* [NDC 2018 신입 개발자가 알아야 할 윈도우 메모리릭 디버깅](https://www.slideshare.net/seao/ndc18-95258747)

