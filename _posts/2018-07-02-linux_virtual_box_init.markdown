---
layout: post
title: "Virtual Box Ubuntu 설치 및 개발 기본 설정"
subtitle: "개발하기 좋은 환경에 대한 설정과 여러 패키지를 한번에 다운 받는 방법입니다."
date: 2018-07-02
author: KimJunHee
category: Linux
tags: linux virtual-box
finished: true
---

## Virtualbox ubuntu 설치

### Virtualbox 디스크 설정

1. LAM 4GB, Disk 100GB로 설정 (각자 취향에 맞게 설정합니다.)
2. 저장소 -> 컨트롤러: IDE에서 iso 파일 설정

### ubuntu 설치

> 자동 완성에 편하게 하기 위해 영어로 설치하였으며 필요한 드라이버를 다 설치하였습니다.

![install](/img/linux/1/install-1.png)
![install](/img/linux/1/install-3.png)
![install](/img/linux/1/install-2.png)


<br/><br/>
## 개발 초기 설정

### 호스트와 가상머신 간의 클립보드 공유, 드래그 앤 드롭 설정

* 장치 -> 클립보드 공유 -> 양방향<br/>장치 -> 드래그 앤 드롭 -> 양방향으로 설정
* 장치 -> 게스트 확장 CD 이미지 삽입 클릭
* 모든 설정이 끝난 뒤 reboot

### 루트의 비밀 번호를 설정

![install](/img/linux/1/init-1.png)

<br/>
### apt를 빠르게 이용하기 위해 다운 받는 주소를 변경 (해외주소 -> 국내주소)

* ```sudo vi /etc/apt/sources.list```

![install](/img/linux/1/init-2.png)

<br/>
* 글을 일괄적으로 모두 바꿔주기 위한 명령어를 사용합니다. ```%s/kr.archive.ubuntu.com/ftp.daum.net/g```

![install](/img/linux/1/init-3.png)

<br/>
* 마찬가지로 한가지 주소 더 바꿔줍니다. ```%s/security.ubuntu.com/ftp.daum.net/g```

![install](/img/linux/1/init-4.png)

<br/>
* 저장하고 나가줍니다. ```wq!```

![install](/img/linux/1/init-5.png)

<br/>
### 루트 권한으로 접속한 뒤 package를 update

* ```apt-get update```

![install](/img/linux/1/init-6.png)

<br/>
* ```sudo add-apt-repository ppa:webupd8team/atom```
* ```sudo apt update; sudo apt install atom```

> 먼저 text 편집기인 atom을 다운 받습니다.

<br/>
* ```apt-get install build-essential libncurses5 libncurses5-dev kernel-package bin86 libssl-dev ftpd ssh wireshark iperf speedometer mpv git strongswan vim net-tools```

> 각종 패키지를 다운 받습니다.<br/>
1. ```build-essential libncurses5 libncurses5-dev kernel-package bin86 libssl-dev``` 는 커널 컴파일을 위한 패키지입니다.
2. ```ftpd``` ftp 서버 사용을 위한 패키지입니다.
3. ```ssh``` 원격 접속을 위한 패키지입니다.
4. ```wireshark``` 패킷 캡쳐를 위한 패키지입니다.
5. ```iperf``` 네트워크 성능 측정을 위한 패키지입니다.
6. ```speedometer``` 네트워크의 대역폭에 대한 모니터링을 할 수 있는 패키지입니다.
7. ```mpv``` 리눅스에서 사용 되는 플레이어 패키지입니다.
8. ```git``` git 사용을 위한 패키지입니다.
9. ```strongswan``` IPSec 사용을 위한 패키지입니다.
10. ```vim``` vi의 업그레이드 버젼인 편집 툴 패키지입니다.
11. ```net-tools``` 네트워크 관리자가 흔히 사용하는 여러 가지 기능들(명령어, 유틸리티등)을 사용하기 쉽게 모아놓은 패키지입니다.

![install](/img/linux/1/init-11.png)

<br/>
* wireshark는 root 권한으로만 패킷을 캡쳐할 수 있는데 일반 사용자도 가능하게 할 것이냐고 물어봅니다. 우리는 Yes를 눌러줍니다

![install](/img/linux/1/init-7.png)

<br/>
* 2번째 것으로 넘어갑니다.

![install](/img/linux/1/init-8.png)

<br/>
* update가 다 끝난 뒤 ```sudo chmod +x /usr/bin/dumpcap```을 이용해서 wireshark를 일반 사용자도 캡쳐가 가능하도록 권한을 바꿔줍니다.

![install](/img/linux/1/init-9.png)

<br/>
* 확인해보면 권한이 바뀌어 있는 걸 알 수 있습니다.

![install](/img/linux/1/init-10.png)
