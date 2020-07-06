cd /home/user/
sudo apt-get update
sudo apt-get -y install autoconf automake build-essential libass-dev libfreetype6-dev libgpac-dev libsdl1.2-dev libtheora-dev libtool libva-dev libvdpau-dev libvorbis-dev libx11-dev libxext-dev libxfixes-dev pkg-config texi2html zlib1g-dev
mkdir ffmpeg_sources
cd ffmpeg_sources/
wget http://www.tortall.net/projects/yasm/releases/yasm-1.2.0.tar.gz
tar xvfz yasm-1.2.0.tar.gz
cd yasm-1.2.0/
./configure --prefix="$HOME/ffmpeg_build" --bindir="$HOME/bin"
make
make install
make distclean
cd ..
wget http://www.nasm.us/pub/nasm/releasebuilds/2.13.01/nasm-2.13.01.tar.xz
tar xvf nasm-2.13.01.tar.xz
cd nasm-2.13.01/
./configure
make
sudo make install
cd ..
wget http://download.videolan.org/pub/x264/snapshots/last_x264.tar.bz2
tar xjvf last_x264.tar.bz2
cd x264-snapshot*/
PATH="$PATH:$HOME/bin" ./configure --prefix="$HOME/ffmpeg_build" --bindir="$HOME/bin" --enable-static
make
make install
make distclean
cd ..
wget -O fdk-aac.zip https://github.com/mstorsjo/fdk-aac/zipball/master
unzip fdk-aac.zip
cd mstorsjo-fdk-aac*/
autoreconf -fiv
./configure --prefix="$HOME/ffmpeg_build" --disable-shared
make
make install
make distclean
sudo apt-get install libmp3lame-dev
cd ..
wget http://downloads.xiph.org/releases/opus/opus-1.1.tar.gz
tar xvfz opus-1.1.tar.gz
cd opus-1.1/
./configure --prefix="$HOME/ffmpeg_build" --disable-shared
make
make install
make distclean
cd ..
wget http://github.com/webmproject/libvpx/archive/v1.7.0/libvpx-1.7.0.tar.gz
tar xvfz libvpx-1.7.0.tar.gz
cd libvpx-1.7.0/
./configure --prefix="$HOME/ffmpeg_build" --disable-examples
make
make install
make clean
cd ..
wget http://ffmpeg.org/releases/ffmpeg-snapshot.tar.bz2
tar xjvf ffmpeg-snapshot.tar.bz2
cd ffmpeg/
PATH="$HOME/bin:$PATH" PKG_CONFIG_PATH="$HOME/ffmpeg_build/lib/pkgconfig" ./configure   --prefix="$HOME/ffmpeg_build"   --pkg-config-flags="--static"   --extra-cflags="-I$HOME/ffmpeg_build/include"   --extra-ldflags="-L$HOME/ffmpeg_build/lib"   --extra-libs="-lpthread -lm"   --bindir="$HOME/bin"   --enable-gpl   --enable-libass   --enable-libfdk-aac   --enable-libfreetype   --enable-libmp3lame   --enable-libopus   --enable-libtheora   --enable-libvorbis   --enable-libvpx   --enable-libx264  --enable-nonfree
make
make install
make distclean
hash -r
echo "MANPATH_MAP $HOME/bin $HOME/ffmpeg_build/share/man" >> ~/.manpath
. ~/.profile
sudo apt install ffmpeg
cd /home/user/ffmpeg_sources/
sudo rm *.tar.*
sudo rm *.zip
