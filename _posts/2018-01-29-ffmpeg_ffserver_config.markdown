---
layout: post
title: "ubuntu에서 FFmpeg, FFserver 설치하기"
subtitle: "Compile FFmpeg on Ubuntu (ubuntu-16.04.3)"
date: 2018-02-09
author: KimJunHee
category: FFmpeg
tags: ffserver ffmpeg linux
finished: true
---

> 실시간 스트리밍 프로젝트 진행하며 가장 어려웠던 점이 FFserver와 FFmpeg의 설치 및 환경 설정이였는데
그것에 대해 간단히 정리하여 Posting 한 내용입니다. <br/>
단지 sudo apt install ffmpeg만 하게되면 필요한 코덱이 다 설치되지 않아 컴파일이 되지 않습니다.

## 의존 관계가 있는 library 다운로드 및 업데이트

{% highlight bash %}
$ sudo apt-get update
$ sudo apt-get -y install autoconf automake build-essential libass-dev libfreetype6-dev libgpac-dev libsdl1.2-dev libtheora-dev libtool libva-dev libvdpau-dev libvorbis-dev libx11-dev libxext-dev libxfixes-dev pkg-config texi2html zlib1g-dev
{% endhighlight %}


<br/><br/>
## ffmpeg_sources 폴더 생성

__ffmpeg와 관련된 소스를 다운로드 받을 폴더를 생성한다.__

{% highlight bash %}
$ mkdir ~/ffmpeg_sources
{% endhighlight %}


<br/><br/>
## Yasm 설치
__Yasm이란 어셈블리 컴파일러인데 ffmpeg는 빌드 시 Yasm을 사용하므로 설치 한다.__

{% highlight bash %}
$ cd ~/ffmpeg_sources
$ wget http://www.tortall.net/projects/yasm/releases/yasm-1.2.0.tar.gz
$ tar xzvf yasm-1.2.0.tar.gz
$ cd yasm-1.2.0
$ ./configure --prefix="$HOME/ffmpeg_build" --bindir="$HOME/bin"
$ make
$ make install
$ make distclean
{% endhighlight %}


<br/><br/>
## NASM 설치

__코덱 설치에 이용되는 Assembler를 설치한다.__

{% highlight bash %}
$ cd ~/ffmpeg_sources
$ wget http://www.nasm.us/pub/nasm/releasebuilds/2.13.01/nasm-2.13.01.tar.xz
$ tar -xvf nasm-2.13.01.tar.xz
$ cd nasm-2.13.01
$ ./configure
$ make
$ sudo make install
{% endhighlight %}


<br/><br/>
## 각종 코덱 설치

### libx264 설치

{% highlight bash %}
$ cd ~/ffmpeg_sources
$ wget http://download.videolan.org/pub/x264/snapshots/last_x264.tar.bz2
$ tar xjvf last_x264.tar.bz2
$ cd x264-snapshot*
$ PATH="$PATH:$HOME/bin" ./configure --prefix="$HOME/ffmpeg_build" --bindir="$HOME/bin" --enable-static
$ make
$ make install
$ make distclean
{% endhighlight %}

<br/>
### libfdk-aac 설치

{% highlight bash %}
$ cd ~/ffmpeg_sources
$ wget -O fdk-aac.zip https://github.com/mstorsjo/fdk-aac/zipball/master
$ unzip fdk-aac.zip
$ cd mstorsjo-fdk-aac*
$ autoreconf -fiv
$ ./configure --prefix="$HOME/ffmpeg_build" --disable-shared
$ make
$ make install
$ make distclean
{% endhighlight %}

<br/>
### libmp3lame 설치

{% highlight bash %}
$ sudo apt-get install libmp3lame-dev
{% endhighlight %}

<br/>
### libopus 설치

{% highlight bash %}
$ cd ~/ffmpeg_sources
$ wget http://downloads.xiph.org/releases/opus/opus-1.1.tar.gz
$ tar xzvf opus-1.1.tar.gz
$ cd opus-1.1
$ ./configure --prefix="$HOME/ffmpeg_build" --disable-shared
$ make
$ make install
$ make distclean
{% endhighlight %}

<br/>
### libvpx 설치

{% highlight bash %}
$ cd ~/ffmpeg_sources
$ wget http://github.com/webmproject/libvpx/archive/v1.7.0/libvpx-1.7.0.tar.gz
$ tar xzvf libvpx-1.7.0.tar.gz
$ cd libvpx-1.7.0
$ ./configure --prefix="$HOME/ffmpeg_build" --disable-examples
$ make
$ make install
$ make clean
{% endhighlight %}

<br/><br/>
## ffmpeg 설치

{% highlight bash %}
$ cd ~/ffmpeg_sources
$ wget http://ffmpeg.org/releases/ffmpeg-snapshot.tar.bz2
$ tar xjvf ffmpeg-snapshot.tar.bz2
$ cd ffmpeg
$ PATH="$HOME/bin:$PATH" PKG_CONFIG_PATH="$HOME/ffmpeg_build/lib/pkgconfig" ./configure   --prefix="$HOME/ffmpeg_build"   --pkg-config-flags="--static"   --extra-cflags="-I$HOME/ffmpeg_build/include"   --extra-ldflags="-L$HOME/ffmpeg_build/lib"   --extra-libs="-lpthread -lm"   --bindir="$HOME/bin"   --enable-gpl   --enable-libass   --enable-libfdk-aac   --enable-libfreetype   --enable-libmp3lame   --enable-libopus   --enable-libtheora   --enable-libvorbis   --enable-libvpx   --enable-libx264  --enable-nonfree
$ make
$ make install
$ make distclean
$ hash -r
{% endhighlight %}


<br/><br/>
## 환경 변수 설정

{% highlight bash %}
$ echo "MANPATH_MAP $HOME/bin $HOME/ffmpeg_build/share/man" >> ~/.manpath
$ . ~/.profile
{% endhighlight %}


<br/><br/>
## ffserver 설치

{% highlight bash %}
$ sudo apt install ffmpeg

{% endhighlight %}


<br/><br/>
## ffmpeg 삭제 시

{% highlight bash %}
$ rm -rf ~/ffmpeg_build ~/ffmpeg_sources ~/bin/{ffmpeg,ffprobe,ffserver,vsyasm,x264,yasm,ytasm}
$ sudo apt-get autoremove autoconf automake build-essential libass-dev libfreetype6-dev libgpac-dev libmp3lame-dev libopus-dev libsdl1.2-dev libtheora-dev libtool libva-dev libvdpau-dev libvorbis-dev libvpx-dev libx11-dev libxext-dev libxfixes-dev texi2html zlib1g-dev
$ sed -i '/ffmpeg_build/c\' ~/.manpath
$ hash -r
{% endhighlight %}


<!-- <br/><br/>
## ffmpeg, ffserver 사용 법

* <https://wnsgml972.github.io/wnsgml972.github.io/ffmpeg/ffmpeg_ffserver-streamming.html> -->


<br/><br/>
## 참고

* <https://gist.github.com/andersao/07645c6660321e2233bc>
* <https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu>
