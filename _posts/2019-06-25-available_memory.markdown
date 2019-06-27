---
layout: post
title: "System Call을 사용하여 유효한 포인터 검증하기"
subtitle: "Pointer Verificationing Using System Call in C, CPP"
date: 2019-06-25
author: KimJunHee
category: C
tags: c cpp memory virtual-memory os page system-programming win-api
finished: true
---


## 사용하게 된 계기
프로그램 개발 중 포인터의 주솟값을 컨테이너에 보관하여 사용하는 방식을 사용하고 있었습니다. 그러나 해당 포인터가 스마트 포인터에 의해 해제되거나, 다른 장소에서 해제되어 사용하지 못하게 될 경우가 있습니다. 그러한 경우에 컨테이너에 남아 있는 주솟값을 통해 데이터에 그대로 접근하면, 프로그램이 잘못된 포인터에 접근하여 치명적인 오류가 발생하게 됩니다. 

그러므로 해당 포인터를 사용하기 전, 사용 가능한 포인터인지 검증하는 방법이 필요했습니다. 기존에 이미 사용하던 방식이 있었으나, 완벽하게 검증하지 못하여 새롭게 알아보게 되었습니다.

<br/>

## 가상 메모리

System Call을 직접 사용하는 만큼 알아야 할 운영체제에 관한 지식에 대해 정리하였습니다. 만약 코드만 확인하신다면 아래로 내려가셔도 괜찮습니다!

### 개요
운영체제의 역할 중에 제일 큰 비중을 차지하는 부분은 프로세스 관리와 메모리 관리입니다. 그 중 메모리 관리의 **가상 메모리는** 어떻게 하면 효과적으로 메모리를 사용할 수 있는가에 대한 질문을 해결해주는 방법입니다.

### 운영 체제의 메모리 적재
먼저 운영 체제는 실제 프로그램이 동작할 때 코드화된 부분에 의해 항상 같은 위치의 메모리 주소로부터 메모리를 불러들이게 됩니다. 하지만 메모리에 프로그램을 적재할 때 항상 같은 위치에 프로그램을 올리는지는 알 수가 없습니다. 그래서 이를 알맞게 맞추어 조절해주는 역할을 하는 것이 필요합니다. 그것이 바로 **MMU의 재배치 레지스터입니다.** 우리는 이것을 사용하여 논리 주소와 물리 주소를 두어, CPU에서 메모리 요청을 하면 논리 주소에 접근하고, MMU 재배치 레지스터에 의해 실제 데이터의 물리 주소까지 접근하게 됩니다.

### 연속 메모리 할당
시간이 지나 컴퓨터의 구조가 발달되어 오면서 다중 프로그래밍 환경이 조성되었고, 여러 프로세스에서 한 메인 메모리에 대한 공간을 사용하게 되었습니다. 그리고 그에 맞게 메모리를 적재하는 방식이 생겨났습니다. 이것을 **연속 메모리 할당 방식**이라고 합니다. 연속 메모리 할당 방식에는 3가지가 있으나 여기서 필요한 내용은 아니므로 설명하지 않겠습니다. 그러나 이것으로도 메모리에 적재하려 할 때, 새로운 프로세스의 크기가 너무 커 채워지지 못한 빈 공간이 생기게 되며, 결국 메모리 공간이 낭비되게 됩니다. **이것을 외부 단편화라고 합니다.**

그것을 해결하고자 하는 방법으로 프로세스를 일정 크기인 페이지로 잘라서 메모리에 적재하는 방식인 페이지라는 방법을 사용하게 되었습니다.

### 페이지
페이지에서는 MMU와 비슷한 페이지 테이블이라는 것이 존재합니다. 페이지 테이블은 프로세스를 나눈 페이지마다 물리 주소를 연결해 CPU는 마치 프로세스가 연속된 메모리 공간에서 동작하고 있다고 생각하게 할 수 있습니다. 즉 프로세스를 일정한 단위인 페이지로 쪼개어 적재하는 페이징이라는 방법을 사용하여 외부 단편화를 효과적으로 줄일 수 있게 되었습니다.

마지막으로 운영체제는 메모리 관리와 더불어서 보호라는 기능도 수행합니다. 앞서 설명해드린 것과 같이 모든 프로세스는 CPU에서 요구하는 논리 주소에 의해 기능을 수행합니다. **다른 말로 하면 모든 주소는 페이지 테이블을 경유하여 메인 메모리로 들어가게 됩니다.** 이렇게 경유하게 되는 페이지 테이블에는 해당 페이지에 대한 접근 제어를 가능하게 해주는 특정 비트가 있습니다. 해당 비트는 읽기, 쓰기, 실행(`r, w, x`)을 다루며 접근을 제어하여 메모리를 보호하게 됩니다.

### 소프트웨어에서 직접 사용!
이제 우리가 소프트웨어에서 사용하기 위해 정리하겠습니다. 위에서 본 것과 같이 운영 체제는 메모리를 관리하고 있습니다. 우리는 직접 시스템 콜을 이용하여 메모리가 물리적 메모리에 적재되었는지, 메모리의 접근 권한이 어떻게 되는지를 검사하여 내가 사용해도 되는 포인터인지를 검사하는 방식을 이용하겠습니다. 그리고 그러한 정보를 얻을 수 있는 함수가 바로 **VirtualQuery**라는 함수입니다.




<br/><br/>

## VirtualQuery
**`retrieves information about a range of pages in the virtual address space of the calling process.`**

MSDN에 적혀있는 다음의 설명에 따르면 VirtualQuery 함수를 사용하여 넘어온 메모리의 정보를 `_MEMORY_BASIC_INFORMATION`라는 구조체에 담아오게 됩니다. 
해당 정보는 메모리 상태, 메모리 유형, 메모리 보호 총 세 가지로 나누어지며, 비트 연산을 이용하여 확인할 수 있습니다.


### 메모리 상태
* `MEM_COMMIT` : 물리적 메모리 확정 상태이다. (실제 사용을 위해 필요)
* `MEM_RESERVE`: 물리적 메모리 확정 없이 주소 공간만 예약 상태이다.
* `MEM_FREE`: 이 영역은 어떤 저장소로도 매핑되지 않은 상태이다.

### 메모리 유형
* `MEM_PRIVATE` : 이 영역은 시스템의 페이징 파일에 매핑되어있다.
* `MEM_IMAGE`: 이 영역의 가상 주소는 이전에 메모리 맵 이미지 파일(exe, dll)에 **매핑됐었다.** 그러나 더 이상 이미지 파일로 매핑되어 있지 않을 수도 있다. <br/>예를 들어 특정 모듈 내에 전역변수에 대해 쓰기가 시도되었다면 `Copy And Write`로 인해 이전 이미지 파일로부터 페이징 파일로 매핑 정보가 변경된다.
* `MEM_MAPPED`: 이 영역은 이전에 메모리 맵 데이터 파일로 **매핑됐었다.** 그러나 더 이상 데이터 파일로 매핑되어 있지 않을 수 있다. <br/>예를 들어 데이터 파일은 `Copy And Write`에 의해 보호될 수 있는데. 이경우 이 영역에 대해 쓰기가 시도되었다면 원래의 데이터 파일이 아니라 페이징 파일로 매핑 정보가 변경된다.

### 메모리 보호 (페이지 테이블의 보호 플래그를 확인할 수 있음)
* `PAGE_READONLY`: 읽기 전용 상태
* `PAGE_READWRITE` : 읽거나 쓸 수 있는 상태
* `PAGE_NOACCESS`: 접근이 금지된 상태
* `PAGE_WRITECOPY`: 실행 위반. 이 페이지에 쓰기 시도하면 시스템은 이것의 복사본을 준다. 단 `Copy And Write` 매커니즘
* `PAGE_EXECUTE` : 실행 전용 상태
* `PAGE_EXECUTE_READ`: 읽거나 실행 가능한 상태
* `PAGE_EXECUTE_READWRITE`: 읽기, 쓰기, 실행 모두 가능한 상태
* `PAGE_EXECUTE_WRITECOPY`: 읽기, 쓰기, 실행 모두 가능한 상태 단. `Copy And Write` 매커니즘
* `PAGE_GUARD` : 페이지에 내용이 쓰였을 경우 애플리케이션이 그 사실을 인지할 수 있도록 사용된다.
* `PAGE_NOCACHE`:  커밋 된 페이지에 대해 캐싱을 수행하지 않도록 한다. 거의 디바이스 드라이버에서나 쓰이는 접근 권한이다.
* `PAGE_WRITECOMBINE`: 이 역시 디바이스 드라이버에서나 쓰이는 접근 권한인데 단일 장치에 여러 번의 쓰기 작업을 하나로 결합할 수 있도록 한다. 

### 사용하는 것
* 실제 물리 주소로 적재되었는지 확인하는 메모리 상태 `MEM_COMMIT`
* 메모리가 읽거나 쓰기가 가능한 상태인지 검사하는 `PAGE_READWRITE`, `PAGE_EXECUTE_READWRITE`



<br/><br/>

## In Code

~~~cpp
/*
IsAvailableMemory : 1. 주어진 메모리 주소의 상태가 물리적 메모리로 확정되었는지 검사 (실제 사용을 위해 필요)
                    2. 주어진 메모리의 보호 속성이 읽기나 쓰기가 가능한지 검사
    Param :
        LPVOID  pMemoryAddr : 검사하고자 하는 메모리의 주소
    Return Value :
        ERROR_SUCCESS : System Error Code, 모든 것이 성공할 경우의 에러코드
        기타 값 : Read/Write 가능한 메모리가 아니면 해당 주소의 Protect Mode 를
                    나타내는 0이 아닌 값을 리턴함.
    Reference :
        1. https://docs.microsoft.com/en-us/previous-versions/aa915370(v=msdn.10)/
        2. https://docs.microsoft.com/en-us/windows/desktop/debug/system-error-codes--0-499-/
*/
INT IsAvailableMemory(LPVOID pMemoryAddr)
{
    MEMORY_BASIC_INFORMATION    MemInfo = { 0, };
    SIZE_T  nResult = 0;

    nResult = VirtualQuery(pMemoryAddr, &MemInfo, sizeof(MemInfo));

    if (nResult == 0) // 커널 영역인 경우 VirtualQuery 자체가 Fail함.  
    {
        return -1;
    }
    else if (!(MemInfo.State & MEM_COMMIT))
    {
        return MemInfo.State;
    }
    else if ((MemInfo.Protect & (PAGE_READWRITE | PAGE_EXECUTE_READWRITE)))
    {
        return  ERROR_SUCCESS; // System Error Code 성공 : Reference 참조
    }
    else
    {
        return  MemInfo.Protect;
    }
}

// 실제 사용 영역
if (IsAvailableMemory((LPVOID)pointer) != ERROR_SUCCESS) // 포인터가 사용 가능하지 않으면 실패한다.
    return FALSE;
~~~



<br/><br/>

## Performance & Verification
얼마만큼 시간이 걸리는지와, AfxIsValidAddress와 비교하여 얼마나 유용한지 테스트를 해봤습니다.

~~~cpp
// 1. 시간 테스트
int *ptr = new int;
DWORD_PTR newPtr = (DWORD_PTR)ptr;

clock_t start, end;
start = clock();
for(int i=0; i<10000; i++)
{
    IsAvailableMemory((LPVOID)newPtr);
}
end = clock();
auto milliSec = (double)(end - start);
auto sec = (end - start) / (double)1000;


// 2. 사용성 테스트
DWORD_PTR wastePtr = 3333333333;
if (IsAvailableMemory((LPVOID)newPtr) != ERROR_SUCCESS)
    ASSERT(0);
if (!AfxIsValidAddress((const void*)newPtr, sizeof(LPVOID), FALSE))
    ASSERT(0);

if (!AfxIsValidAddress((const void*)wastePtr, sizeof(LPVOID), FALSE))
    ASSERT(0);
if (IsAvailableMemory((LPVOID)wastePtr) != ERROR_SUCCESS)
    ASSERT(0);
~~~

### 결과
시간 : 약 0.03초, 매우 적게 시간이 걸려 사용하기 적합한 것 으로 판단!
![valid](/img/c/3/valid0.png)


사용성 : 임의의 잘못된 포인터 값에 대해 AfxIsValidAddress는 잡지 못하였지만, 직접 만든 IsAvailableMemory 함수는 해당 포인터 검증을 올바르게 해냄
![valid2](/img/c/3/valid2.png)




<br/><br/>

## Reference
* <https://docs.microsoft.com/en-us/previous-versions/aa915370(v=msdn.10)>
* <https://docs.microsoft.com/en-us/windows/desktop/debug/system-error-codes--0-499->

