---
layout: post
title: "UMDH로 Memory Leak 잡기"
subtitle: ""
date: 2020-02-13
author: KimJunHee
category: C
tags: c memory-leak
finished: true
---

> ssssss

# Memory Debug

## 핵심!!
![img](/img/c/5/user_mode_virtual_address.png)
* 32bit 윈도우를 지원하면 가상 메모리 한계는 2GB고, 64bit는 `x64` 기준 8테라 바이트이다.
* 메모리 이슈를 분석할 때에는 더 나은 도구로 Commit Size를 포함한 여러 지표를 확인하자.
* 재현 가능한 메모리릭은 UMDH등의 툴을 활용하자.
* 재현 불가능한 메모리릭은 windbg로 풀덤프 Heap 분석을 시도하자.

## 상황 인식
### 게임을 하다가 자꾸 메모리가 부족하다면서 팅겨요... (`Out of Memory`)
* RAM은 남아도는데...?
* 머신의 물리 메모리(RAM)이 부족한 것이 아니라 __Process의 가상 메모리가__ 부족한 것!
* 대부분 컴퓨터 사양 문제가 아닌, 응용 프로그램의 문제다.
* 프로세스 가상 메모리의 한계는 : 프로세스 플랫폼에 따라 (32bit, 64bit), 운영체제 버전(x86, x64)에 따라
* 일반적으로 32bit에서는 가상 주소 공간은 2기가 바이트 범위이고, 64bit에서는 8 테라 바이트 범위이다.
* 32bit인데 4기가 바이트가 아닌 이유는 커널 메모리와 유저 메모리가 나뉘어져 있기 때문!
* 64bit 환경에서는 `Out of Memory`가 잘 뜨진 않지만, 메모리 증가로 페이즈 폴트 증가, 캐시 미스 증가, 종합하여 퍼포먼스에 악영향을 미칠 수 있다.

### `Out of Memory`의 원인들
* Commit으로 인한 가상 메모리 고갈 -> `Memory Leak`
* Reserve로 인한 가상 메모리 고갈
* Page File Limit 초과
* 단편화
* 등등



<br/><br/>

## Memory Leak 검증 시나리오
### 특정 행위를 할 때, Memory Leak이 되는 것 같은 시점을 포착했을 때
1. 동적 할당이 일어나는 콜스택 별로, 할당 횟 수, 해제 횟 수, 할당 크기 수집
2. 재현 전, 콜스택 별 메모리 할당량 기록
3. 재현 (스킬 창 열기/닫기 10번 반복)
4. 재현 후, 콜스택 별 메모리 할당량 기록, 2번과 비교


<br/><br/>

## 활용 도구

~~~
1. UMDH.exe
2. WinDBG.exe
~~~

### WinDBG 사용하기
> WinDBG를 사용하려면 Windows SDK안에 있는 WinDBG를 다운 받아야 함! 참고로 UMDH도 WinDBG 포함

#### Install WinDBG SDK
* <https://docs.microsoft.com/ko-kr/windows-hardware/drivers/debugger/debugger-download-tools>

#### Symbol Path Config
* <https://docs.microsoft.com/ko-kr/windows-hardware/drivers/debugger/using-a-symbol-server>
* 그냥 여기가서 2개 cmd 창에 복붙, 복붙!
~~~bash
set _NT_SYMBOL_PATH = srv*DownstreamStore*SymbolStoreLocation
set _NT_SYMBOL_PATH=srv*DownstreamStore*https://msdl.microsoft.com/download/symbols
~~~

### 이제 밑에 명령어를 사용한 비교!

### UMDH.exe  : 재현이 가능해요!
1. 동적 할당이 일어나는 콜스택 별로, 할당 횟 수, 해제 횟 수, 할당 크기 수집
    * `gflags /i Client.exe +ust`
2. 재현 전, 콜스택 별 메모리 할당량 기록
    * `umdh -pn:Client.exe > C:\log1.txt`
3. 재현 (스킬 창 열기/닫기 10번 반복)
4. 재현 후, 콜스택 별 메모리 할당량 기록, 2번과 비교
    * `umdh -pn:Client.exe > C:\log2.txt`
5. diff check 사용
    * `umdh.exe C:\log1.txt C:\log2.txt > C:\diff.txt`
5. 성능에 매우 악 영향을 미치니, 메모리 릭 검증할 때만 사용할 것!
6. 분석 시 참고 : <https://docs.microsoft.com/en-us/windows-hardware/drivers/debugger/interpreting-a-log-comparison>

<br/>

### WinDBG.exe  : 재현이 불가능해요!ㅠ
1. 작업관리자에서 프로세스 탐색
2. 덤프 파일 만들기 클릭
3. WinDBG.exe -> Heap 분석 사용
4. WinDBG.exe 프로그램 실행 후, 덤프 파일 열기, 심볼 경로를 설정
5. 전체적인 Heap 상황 확인
    * !heap -s
    * 특정 heap들이 다른 heap 보다 훨등히 큰 것을 탐색
    * 해당 heap의 주소 기억
    * !heap -stst -h 2150000(주소)   : 누수가 발생한 힙에서 할당 사이즈 별 개수 통계
    * !heap -flt s 30  -> 가장 많이 할당된 크기의 메모리 블록 모두 검색
6. 누수가 발생한 힙에서 메모리 크기 별 할당 횟 수 집계
7. 가장 많이 할당된 크기의 메모리 블록 모두 검색



<br/><br/>

## Reference
* [NDC 2018 신입 개발자가 알아야 할 윈도우 메모리릭 디버깅](https://www.slideshare.net/seao/ndc18-95258747)


## 배치파일

~~~bat
:: 1. windbg_start_initialize.bat
:: get admin
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

~~~bat
:: 2. windbg_start.bat
:: excute umdh.exe `YourTargetProgram`
:: Result is `ResultFile1`
cd %WinSDKProgramPath%
umdh.exe -pn:%YourTargetProgram% > %ResultFile1%
~~~

~~~bat
:: 3. windbg_end.bat
:: excute umdh.exe `YourTargetProgram` Same!, Perhaps a Memory Leak occurred.
:: Result is `ResultFile2`
cd %WinSDKProgramPath%
umdh.exe -pn:%YourTargetProgram% > %ResultFile2%
~~~

~~~bat
:: 4. windbg_diff_check
:: excute umdh.exe difference check `ResultFile1` and `ResultFile2`
:: Result is `DiffCheckResultFile`
cd %WinSDKProgramPath%
umdh.exe -v -d -l %ResultFile1% %ResultFile2% > %DiffCheckResultFile%

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

:: GFlag Memory Trackiong OFF ---
:: Initialize GFlag
gflags /i %YourTargetProgram% -ust
~~~

* UMDH를 쉽게 사용하기 위한 배치 파일입니다.
* 프로그램 시작 시 1, 2 배치파일 실행
* 메모리 릭 재현 *10
* 3, 4 배치 파일 실행
* 을 이용하시면 쉽게 메모리 덤프 비교 파일을 얻을 수 있습니다.
* Cutom Input 값 설명

## 해결 과정

감사합니다! 댕글링 포인터로 인한 오류였던 것 같습니다.
메모리릭 해결 방법으로는 다음과 같은 방법을 사용했습니다. 

1. 프로그램 시작 시 User 힙 메모리 덤프
2. Document를 열었다 닫았다 * 5하고 User 힙 메모리 덤프
3. 해당 덤프 파일 difference file 생성
4. Leak 예상 부분 수정
5. 다시 해결됐는지 같은 방법으로 확인

**결과 파일**
![result](/img/c/5/memory_leak_diff_result.png)

해당 부분에서 아직 해결되지 않은 부분이 AUIGalleria 부분에서 있는데, 제가 정확한 그래픽 엔진 메모리의 할당과 초기화의 시점을 모르기 때문에 이 부분은 이세인 담당님이나 박동근 선임님과 같이 협업하며 해결해야 할 것 같습니다.

해당 부분의 덤프 파일 부분은 다음과 같습니다. 읽어주셔서 감사합니다.

**카카오톡 테스트 값 결과 파일**
![result](/img/c/5/kakao_dump.png)