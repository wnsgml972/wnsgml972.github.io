---
layout: post
title: "아두이노 블루투스 모듈을 이용해 LED 제어하기"
subtitle: ""
date: 2018-01-25
author: KimJunHee
category: Arduino
tags: arduino bluetooth
finished: true
---

## 아두이노 스케치 설치

* <http://appinventor.mit.edu/explore/>에 접속해 SOFTWARE를 클릭 후 다운받는다.

![Git](/img/arduino_down.png "arduino down")

* 스케치의 다운이 완료되면 더블 클릭해 실행시키면 된다.

<br/><br/>
## 아두이노 LED 제어

* 필요한 하드웨어는 총 3가지이다.

UNO Board                                    | Bread Board | Bluetooth Module |
-----                                        | -----       | -----            |
![Git](/img/arduino_uno.jpg "arduino uno board") | ![Git](/img/arduino_bread.jpg "arduino bread board") | ![Git](/img/arduino_bluetooth.jpg "arduino bluetooth module")

* 보드 연결

![Git](/img/arduino_complete1.jpg "arduino complete")

* 스케치 코드

{% highlight md %}
#include <SoftwareSerial.h>

SoftwareSerial BTSerial(2, 3);   //bluetooth module Tx:Digital 2 Rx:Digital 3

void setup() {
  pinMode(8, OUTPUT);    //HC-05
  digitalWrite(8,HIGH);

  Serial.begin(9600);
  BTSerial.begin(9600);
  Serial.println("ATcommand");  //ATcommand Start
}

void loop() {
  if (BTSerial.available())
    Serial.write(BTSerial.read());
  if (Serial.available())
    BTSerial.write(Serial.read());

}
{% endhighlight %}

* 핸드폰에 적절한 어플리케이션을 다운받거나 이용하고 아두이노 보드에 스케치 코드를 업로드해 확인한다.

![Git](/img/arduino_complete2.jpg "arduino complete")
