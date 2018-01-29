---
layout: post
title: "아두이노 블루투스 통신"
subtitle: "아두이노 블루투스 모듈을 이용해 LED 제어하기"
date: 2018-01-25
author: KimJunHee
category: Arduino
tags: arduino bluetooth app-inventor
finished: true
---

## 아두이노 스케치 설치

* <http://appinventor.mit.edu/explore/>에 접속해 SOFTWARE를 클릭 후 다운받는다.

![Arduino](/img/arduino_down.png "arduino down")

* 스케치의 다운이 완료되면 더블 클릭해 실행시키면 된다.


<br/><br/>
## 스케치 환경 설정

* Installer에서 USB 드라이버를 다운 받는다.

* 포트 설정을 변경한다.

![Arduino](/img/arduino_port.png "Change Port")



<br/><br/>
## 아두이노 LED 제어

* 필요한 하드웨어는 총 3가지이다.

UNO Board                                    | Bread Board | Bluetooth Module |
-----                                        | -----       | -----            |
![Arduino](/img/arduino_uno.jpg "arduino uno board") | ![Arduino](/img/arduino_bread.jpg "arduino bread board") | ![Arduino](/img/arduino_bluetooth.jpg "arduino bluetooth module")

* 구성도

![Arduino](/img/arduino_structure.png "Structure")

* 아두이노 보드의 회로 연결

![Arduino](/img/arduino_complete1.jpg "arduino complete")

* 스케치 코드

{% highlight c %}
#include <SoftwareSerial.h>

// 2, 3번 핀을 이용
SoftwareSerial bluetooth(2, 3);  //Tx,  Rx (블루투스의 수신 송신)
int ledPin = 8;

void setup( ) {
  bluetooth.begin(9600); // 반드시 필요함
  pinMode(ledPin, OUTPUT);
}

void loop() {
   if (bluetooth.available()){
    byte read = bluetooth.read();
    if (read == 1)
      digitalWrite(ledPin, HIGH);
    else if (read == 2)
      digitalWrite(ledPin, LOW);
  }
}
{% endhighlight %}



* 핸드폰에 적절한 어플리케이션을 다운받거나 직접 만들어 이용하고 아두이노 보드에 스케치 코드를 업로드해 확인한다.

![Arduino](/img/arduino_complete2.jpg "arduino complete")

* 앱 인벤터로 간단히 어플리케이션을 만들 수 있다.

[앱 인벤터 배우기](https://wnsgml972.github.io/wnsgml972.github.io/app%20inventor/app-inventor_start.html "app-inventor")  <br/>
[아두이노와 블루투스를 이용한 LED 제어 어플리케이션](https://wnsgml972.github.io/wnsgml972.github.io/app%20inventor/app-inventor_bluetooth.html "app-inventor")
