---
layout: post
title: "Mosquitto를 Broker를 이용하여 My_Sub, My_Pub 작성 및 실행"
subtitle: ""
date: 2018-02-13
author: KimJunHee
category: MQTT
tags: mqtt mosquitto ubuntu linux c
finished: true
---

## ```my_pub.c```, ```my_sub.c``` 생성

### ```my_pub.c```

{% highlight c %}

#include <errno.h>
#include <fcntl.h>
#include <stdlib.h>
#include <string.h>
#include <mosquitto.h>
#include <stdio.h>

#define MQTT_HOSTNAME "localhost"
#define MQTT_PORT 1883
#define MQTT_USERNAME "admin"
#define MQTT_PASSWORD "admin"
#define MQTT_TOPIC "myTopic"


int main(int argc, char **argv) {
   struct mosquitto *mosq = NULL;

   // 초기화
   mosquitto_lib_init();

   // 모스키토 런타임 객체와 클라이언트 랜덤 ID 생성
   mosq = mosquitto_new(NULL, true, NULL);
   if (!mosq) {
      printf("Cant initiallize mosquitto library\n");
      exit(-1);
   }

   mosquitto_username_pw_set(mosq, MQTT_USERNAME, MQTT_PASSWORD);

   // MQTT 서버 연결 설립, keep-alive 메시지 사용 안함
   int ret = mosquitto_connect(mosq, MQTT_HOSTNAME, MQTT_PORT, 0);
   if (ret) {
      printf("Cant connect to mosquitto server\n");
      exit(-1);
   }

   char text[20] = "Nice to meet u!\n";

   ret = mosquitto_publish(mosq, NULL, MQTT_TOPIC, strlen(text), text, 0, false);
   if (ret) {
      printf("Cant connect to mosquitto server\n");
      exit(-1);
   }

   // 네트워크 동작이 끝나기 전에 모스키토 동작을 막기위해 잠깐의 딜레이가 필요함
   //sleep(1);

   mosquitto_disconnect(mosq);
   mosquitto_destroy(mosq);
   mosquitto_lib_cleanup();

   return 0;
}

{% endhighlight %}

<br/>
### ```my_sub.c```

{% highlight c %}
#include <signal.h>
#include <stdio.h>
#include <stdint.h>
#include <string.h>

#include <mosquitto.h>

#define mqtt_host "localhost"
#define mqtt_port 1883
#define MQTT_TOPIC "myTopic"

static int run = 1;

void handle_signal(int s)
{
   run = 0;
}

void connect_callback(struct mosquitto *mosq, void *obj, int result)
{
   printf("connect callback, rc=%d\n", result);
}

void message_callback(struct mosquitto *mosq, void *obj, const struct mosquitto_message *message)
{
   bool match = 0;
   /*printf("got message '%.*s' for topic '%s'\n", message->payloadlen, (char*) message->payload, message->topic);*/
	printf("receive message(%s) : %s",message->topic, message->payload);
   //뭐하는 코드인지 모름 작동 안함
   //mosquitto_topic_matches_sub("/devices/wb-adc/controls/+", message->topic, &match);
   if (match) {
      printf("got message for ADC topic\n");
   }

}

int main(int argc, char *argv[])
{
   uint8_t reconnect = true;
   //char clientid[24];//id를 사용하는 경우
   struct mosquitto *mosq;
   int rc = 0;

   signal(SIGINT, handle_signal);
   signal(SIGTERM, handle_signal);

   mosquitto_lib_init();

   //메모리 초기화
   //memset(clientid, 0, 24);//맨 앞부터 0을 24개 삽입 (초기화)
   //snprintf(clientid, 23, "mysql_log_%d", getpid());//23길이의 clientid에 pid를 가진 문자열 삽입
   // mosq = mosquitto_new(clientid, true, 0);//mosquitto 구조체 생성 <-
   mosq = mosquitto_new(NULL, true, 0);//mosquitto 구조체 생성

   if(mosq){
      mosquitto_connect_callback_set(mosq, connect_callback);
      mosquitto_message_callback_set(mosq, message_callback);

       rc = mosquitto_connect(mosq, mqtt_host, mqtt_port, 60);//mosqutiio 서버와 연결

      mosquitto_subscribe(mosq, NULL, MQTT_TOPIC, 0);//subscribe

      while(run){
         rc = mosquitto_loop(mosq, -1, 1);
         if(run && rc){
            printf("connection error!\n");
            sleep(10);
            mosquitto_reconnect(mosq);
         }
      }
      mosquitto_destroy(mosq);
   }

   mosquitto_lib_cleanup();

   return rc;
}
{% endhighlight %}

<br/>
### 완성 모습

![MQTT](/img/mqtt/3/create.png)

<br/><br/>
## gcc를 이용하여 컴파일

> 컴파일 시에 -lmosquitto를 붙여 컴파일을 해야 mosquitto library를 사용할 수 있습니다.

###  my_sub

{% highlight bash %}
$ gcc -o my_sub my_sub.c -lmosquitto
{% endhighlight %}

###  my_pub

{% highlight bash %}
$ gcc -o my_pub my_pub.c -lmosquitto
{% endhighlight %}

<br/><br/>
## 확인

> 마찬가지로 각각 다른 터미널을 이용하여 바이너리 파일로 Broker를 실행시켜 놓은 뒤 Publish와 Subscribe를 테스트 합니다.

###  my_sub

![MQTT](/img/mqtt/3/sub.png)

<br/>
###  my_pub

![MQTT](/img/mqtt/3/pub.png)
