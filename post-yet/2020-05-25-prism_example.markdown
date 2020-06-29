---
layout: post
title: "Prism Example"
subtitle: "Prism usage example."
date: 2020-05-25
author: KimJunHee
category: test
tags: Test
permalink: /test/prism_example/
finished: true
---

## language category
* css
* go
* bash
* objectivec
* java
* markup
* kotlin
* liquid
* makefile
* powershell
* ruby
* php
* nginx
* javascript
* vim
* python
* swift
* sql
* typescript
* json
* graphql
* git
* docker
* cmake
* cil
* arduino
* c
* apachconf
* actionscript
* clike


<br/>

## prism example

<!-- line-number -->
<pre class="language-none line-numbers"><code>
This raw text
is not highlighted
but it still has
line numbers
</code></pre>

<!-- line-number -->
<pre class="language-none" data-line="2-7"><code>
This raw text
is not highlighted
but it still has
line numbers
line numbers
line numbers
line numbers
but it still has
line numbers
line numbers
line numbers
line numbers
</code></pre>


<!-- auto linker -->
<pre class="language-css"><code>
@font-face {
  src: url(http://lea.verou.me/logo.otf);
  font-family: 'LeaVerou';
}
</code></pre>

<!-- auto Previewers -->
<pre class="language-css"><code>
@gradient: linear-gradient(135deg, #9dd53a 0%, #a1d54f 50%, #80c217 51%, #7cbc0a 100%);
.example-gradient {
background: -webkit-linear-gradient(-45deg, #9dd53a 0%, #a1d54f 50%, #80c217 51%, #7cbc0a 100%); /* Chrome10+, Safari5.1+ */
background:    -moz-linear-gradient(-45deg, #9dd53a 0%, #a1d54f 50%, #80c217 51%, #7cbc0a 100%); /* FF3.6+ */
background:     -ms-linear-gradient(-45deg, #9dd53a 0%, #a1d54f 50%, #80c217 51%, #7cbc0a 100%); /* IE10+ */
background:      -o-linear-gradient(-45deg, #9dd53a 0%, #a1d54f 50%, #80c217 51%, #7cbc0a 100%); /* Opera 11.10+ */
background:         linear-gradient(135deg, #9dd53a 0%, #a1d54f 50%, #80c217 51%, #7cbc0a 100%); /* W3C */
}
@angle: 3rad;
.example-angle {
transform: rotate(.4turn)
}
@nice-blue: #5B83AD;
.example-color {
color: hsla(102, 53%, 42%, 0.4);
}
@easing: cubic-bezier(0.1, 0.3, 1, .4);
.example-easing {
transition-timing-function: ease;
}
@time: 1s;
.example-time {
transition-duration: 2s;
}
</code></pre>


<!-- command line -->
<pre class="language-bash command-line" data-user="root" data-host="localhost"><code>
cd /usr/local/etc
cp php.ini php.ini.bak
vi php.ini
</code></pre>

<pre class="language-bash command-line" data-user="chris" data-host="remotehost" data-output="2, 4-8"><code>
pwd
/usr/home/chris/bin
ls -la
total 2
drwxr-xr-x   2 chris  chris     11 Jan 10 16:48 .
drwxr--r-x  45 chris  chris     92 Feb 14 11:10 ..
-rwxr-xr-x   1 chris  chris    444 Aug 25  2013 backup
-rwxr-xr-x   1 chris  chris    642 Jan 17 14:42 deploy
</code></pre>

<pre class="language-powershell command-line" data-prompt="PS C:\Users\Chris>" data-output="2-19"><code>
dir


Directory: C:\Users\Chris


Mode                LastWriteTime     Length Name
----                -------------     ------ ----
d-r--        10/14/2015   5:06 PM            Contacts
d-r--        12/12/2015   1:47 PM            Desktop
d-r--         11/4/2015   7:59 PM            Documents
d-r--        10/14/2015   5:06 PM            Downloads
d-r--        10/14/2015   5:06 PM            Favorites
d-r--        10/14/2015   5:06 PM            Links
d-r--        10/14/2015   5:06 PM            Music
d-r--        10/14/2015   5:06 PM            Pictures
d-r--        10/14/2015   5:06 PM            Saved Games
d-r--        10/14/2015   5:06 PM            Searches
d-r--        10/14/2015   5:06 PM            Videos
</code></pre>
