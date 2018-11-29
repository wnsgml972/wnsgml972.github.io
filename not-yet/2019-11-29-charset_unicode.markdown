---
layout: post
title: "Unicode, UCS, UTF 분석"
subtitle: ""
date: 2018-11-29
author: KimJunHee
category: Charset
tags: 
finished: true
---



## Unicode란?

![unicode](/img/charset/1.png){: width="300" height="300"){: .center}

* 유니코드(Unicode)는 전 세계의 모든 문자를 컴퓨터에서 일관되게 표현하고 다룰수 있도록 설계된 산업 표준이다.
* 유니코드 협회(Unicode Consortium)가 제정 및 관리를 담당하고 있다.
* 유니코드의 목적은 현존하는 다양한 문자 인코딩 방식을 유니코드라는 공통된 코드로 교체하는 것이다.
* 유니코드의 기원은 1987년 Xerox의 Joe Becker와 Apple의 Lee Collins, Makr Davis가 통일된 문자 집합을 만들기 위해 시작된 프로젝트이다.
* 유니코드는 유니코드 문자(Unicode Character Set : ISO 10646) 뿐만 아니라 문자 정보 데이터베이스, 문자를 다루는 알고리즘, 문화권을 포함하는 개념이다.
    * 문자의 표기 방향 (문자의 Data 순서와 시각적 표기 순서의 차이 : 아랍어는 왼쪽에서 오른쪽으로 작성한다)
    * 문자의 조립, 분해 방식 (예 : 한글 - ㅎㅏㄴㄱㅡㄹ)
    * 렌더링 방식
    * 두 문자의 우선순위 비교 방법
    * 숫자의 구분자 표기 방법

## 유니코드 문자란? (Universal Character Set : ISO 10646)

* 문자를 코드로 인코딩하는 방법에 대한 국제 표준안
* 초기에 1개의 문자를 16-bit BMP(Basic Multilingual Plane)에 인코딩하여 저장하는 방법으로 시작된 표준안이다.
* 1개의 문자를 2 byte인 16-bit에 저장한다고 하여 UCS-2라고 명명하였다.
* 1991년 유니코드 협회와 공동작업을 시작하여 1993년 유니코드 2.0 부터 UCS와 1:1 대응하도록 맞추었다.
* UCS-4는 4개의 byte를 사용하여 현재 세상의 모든 문자를 표기할 수 있는 코드(Code Point)이다.
* 1개의 문자는 1개의 코드(Code Point)에 대응한다.
    * UCS-2 에서는 16-bit가 1개의 문자로 대응
    * UCS-4 에서는 32-bit가 1개의 문자로 대응
* 일반적으로 Unicode Code Point를 표준으로 사용한다.
    * 1개의 유니코드 문자를 디코딩하면 4 byte (32-bit)의 값으로 대응한다.
    * 유니코드 문자의 좌표는 U+xxxx 형태로 표현한다. (예 : U+1F61B -> 😛)

![unicode](/img/charset/2.png)

## Unicode Transformation Format (UTF)

* 어떠한 문자에 대응하는 UCS 문자 코드(Code Point)로 인코딩하는 방식 또는 알고리즘이다.
    * UTF-16은 UCS-2를 기반으로 확장한 인코딩 방법
    * UTF-32는 UCS-4를 기반으로 확장한 인코딩 방법
    * UTF-8은 ASCII를 기반으로 확장한 인코딩 방법
* 각각의 UTF-x로 인코딩된 코드를 디코딩하면 이에 해당하는 Unicode Code Point를 획득할 수 있도록 설계되어 있다.
* 일반적으로 최종적으로 UCS-4에 해당하는 코드(Code Point)로 디코딩이 된다.
* UTF-16의 경우에는 CPU의 엔디안(Endian)처리 방식에 따라 조금 다르게 인식할 수 있다. (BigEndian은 UTF-16BE, LittleEndian은 UTF-16LE)
* UTF-16의 엔디안(Endian)을 구분하기 위해 파일의 시작 지점에 BOM(Byte Order Mark : 0xFEFF)를 표준에서 허용하고 있다. (4 byte를 읽었을 때 0xFE 0xFF, 0xFF 0xFE 인지에 따라 Endian 처리를 판단함)
* UTF-16에서 BOM이 없는 경우 Big Endian을 기본값으로 가정한다. (Intel CPU를 사용하는 Windows는 Little Endian이 기본값이라 표준과 조금 어긋나있음)

## Unicodes in Software

* W3C : 모든 웹표준 파일은 UTF-8을 기본으로 사용하도록 한다. (JSON, XML, HTML, CSS 등)
* Windows : UTF-16을 기본으로 사용한다.
* Java(JVM) : UCS-2를 기본으로 사용하다 J2SE 5.0부터 UTF-16으로 변경되었다.
* Javascript : 많은 엔진 코드가 UCS-2 또는 UTF-16을 기본으로 사용한다.
* Python : UCS-2를 기본으로 사용하지만 빌드 옵션에서 UTF-32로 바꿔서 사용이 가능하다.
* International Components for Unicode (ICU) : 내부적으로 UTF-16을 기본으로 사용하고 있다.

## Unicode vs. UCS vs. UTF

### Unicode
* 문자를 표현하기 위한 표준안
* 표기 순서, 정렬 방식, 문화권 차이 등의 알고리즘을 포함하는 포괄적인 개념이다.

### UCS

* 어떠한 문자를 1개의 코드(Code Point)에 대응한 것에 대한 표준이다.
* UCS-2는 문자를 16-bit에 대응한 것으로 일반적/일상적으로 사용하는 문자들(BMP 영역)이 여기에 속해있다.
* UCS-4는 문자를 32-bit에 대응한 것으로 UCS-2에서 표현할 수 없었던 고대 상형문자, 이모티콘 등을 포함하는 전체 유니코드 영역을 표현한다.

### UTF

* 위의 UCS(일반적으로 UCS-4)를 가변 크기로 인코딩하는 방식 또는 알고리즘이다.
* UTF-8은 UCS를 8-bit 단위로 인코딩한 것이다.
* UTF-16은 UCS를 16-bit 단위로 인코딩한 것이다.
* UTF-32는 UCS를 32-bit 단위로 인코딩한 것이다.

![unicode](/img/charset/3.png)

## Unicode in C++

* `wchar_t`는 원래 8-bit보다 큰 문자를 표기하기 위해 정의한 형식이다. (표준안에서 몇 bit를 사용해야하는지 정의하지 않음)
    * Windows : 16-bit를 사용하고 있으며, UTF-16 데이터를 넣어서 사용함
    * 나머지(일반적으로) : 32-bit를 사용하고 있으며, UTF-32 데이터를 넣어서 사용함
* C++11에서 명시적인 자료형이 추가되었다. (`char16_t`, `char32_t`)
    * `const char str[] = u8"여기는 UTF-8"; // std::string과 대응`
    * `const char16_t str[] = u"여기는 UTF-16"; // std::u16string과 대응`
    * `const char32_t str[] = U"여기는 UTF-32"; // std::u32string과 대응`

## Unicode in Windows

* Windows Code Page : 1980년대에서 1990년대까지 사용했던 Windows의 고유 문자 코드(Code Point) 처리 방식
    * 크게 ANSI Code Page와 OEM Code Page를 가지고 있다.
    * 51949 : EUC-KR Code Page로 2000년대 초반 우리나라에서 많이 사용하던 형식이다.
    * 65001 : UTF-8 Code Page로 표준화된 통신을 위해서는 이 코드를 사용해서 변환해야 한다.
    * 949 : ANSI/OEM Korean Code Page로 EUC-KR에서 표기할 수 없는 문자를 개선한 확장된 버전이다. (한글 OS에서 ASCII 형식으로 불러올 때의 기본 인코딩 방식)
* Windows Kernel : 내부적으로 16-bit로 된 wchar_t인 UTF-16을 기본으로 사용한다.
    * TCHAR 계열을 사용하여 개발할 경우 유니코드로 빌드할 경우 wchar_t로 변환하여 빌드가 된다.
    * 기존 코드 호환을 위해 ~~~A와 ~~~W 두가지 함수를 제공하고 있으며 ~~~A함수를 호출할 경우 내부적으로 wchar_t로 변환한 후 ~~~W를 호출하게 되어있다.
* Windows에서는 UTF-16 + BOM으로 파일을 저장해야 올바르게 유니코드 파일이라고 인식한다. (예 : 메모장 프로그램 등)
* 팁 : Visual Studio에서 's8'옵션을 사용하면 UTF-8로 인코딩된 텍스트가 디버그 창에서 올바르게 표기된다.

![unicode](/img/charset/4.png)

## 한글 코드의 표현 방식

* 유니코드 상에서 한글은 각각의 자모와 그 조합으로 구성되어 있다.
* 한글은 크게 2가지로 표현이 가능하다.
    * 자모를 분리하여 저장하는 방식 NFD : 간다 -> [ㄱ][ㅏ][ㄴ][ㄷ][ㅏ]
    * 자모를 조합하여 저장하는 방식 NFC : 간다 -> [간][다]
* 운영체제에 따른 처리 방식
    * Windows, Linux, Android : NFC 방식
    * macOS, iOS : NFD 방식

## NFD, NFC, NFKC, NFKCD

* NFD(Normalization Form Canonical Decomposition) : 글자를 분해한 상태대로 표현
* NFC(Normalization Form Canonical Composition) : 글자를 재조합하여 표현
* NFKD(Normalization Form Compatibility Decomposition) : 호환 가능한 글자로 분해한 상태대로 표현
* NFKC(Normalization Form Compatibility Composition) : 호환 가능한 글자를 재조합하여 표현

![unicode](/img/charset/5.png)
![unicode](/img/charset/6.png)

## 기타

* KS X 1001 : 한국 산업 규격에서 정한 한글 표현 방식으로 EUC-KR, CP949의 모태
* KS X 1005 : 한국 산업 규격에서 정한 Unicode 2.0 기준에 맞춘 코드(UCS-2).

## 결론

* 유니코드 : 문자 코드와 알고리즘을 포괄하는 표준
* UCS : 각각의 문자를 1개의 코드(Code Point)에 대응한 것에 대한 표준
* UTF : UCS를 가변 크기로 인코딩하는 알고리즘


<br/><br/>
## 참고

* <https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow>
* <http://blog.appkr.kr/learn-n-think/comparing-workflows/#2-feature-branch-workflow>
