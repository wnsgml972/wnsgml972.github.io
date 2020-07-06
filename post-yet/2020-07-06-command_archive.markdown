---
layout: post
title: "Command Archive"
subtitle: ""
date: 2020-07-06
author: KimJunHee
category: Setting
tags: archive command script
permalink: /test/command/archive/
finished: true
---

## Linux Command Archive

### Shell Script

#### 특정 프로세스 kill (awk는 여기서 공백으로 구분된 파일 출력들 중 2번 째를 추출해내는 역할을 함)

~~~bash
kill -9 `ps -ef | grep ffmpeg | awk '{print $2}'`
~~~

#### ffmpeg webm

~~~bash
ffmpeg -i ftp://user:1@192.168.10.2/sample.mp4 -threads 8 -cpu-used 5 -deadline realtime -an http://localhost:12390/feed1.ffm
~~~


#### local 환경에서 통신할 때 대역폭 한계 지정,  (가상 머신끼리, enp0s8은 인터페이스)

~~~bash
sudo tc qdisc add dev enp0s8 root handle 1:0 tbf rate 900Mbit burst 500k latency 1ms
sudo tc qdisc change dev enp0s8 root handle 1:0 tbf rate 900Mbit burst 500k latency 1ms
~~~


<br/>

### Shell Script Program

* [gcc, gpp compile version update](/sh/update-compiler.sh)
* [set-mysql.sh](/sh/set-mysql.sh)
* [set-ffserver.sh](/sh/set-ffserver.sh)
* [set-tomcat8.sh](/sh/set-tomcat8.sh)




<br/><br/>

## Windows Command Archive

### Batch

#### Run PowerShell Script

~~~batch
@echo off
set BASE_PATH=C:\Users\kjh0121\Desktop\

powershell -executionpolicy bypass -File %BASE_PATH%/copy.ps1
~~~


### PowerShell Script

#### Copy Directory

~~~powershell
# 폴더 전체 복사
$FOLDER1="C:\Users\kjh0121\Desktop\1"
$FOLDER2="C:\Users\kjh0121\Desktop\2"

Copy $FOLDER1 $FOLDER2 -Recurse -Force
~~~




<br/><br/>

## Command Archive Good Reference

* <https://github.com/jlevy/the-art-of-command-line>
