---
layout: post
title: "자료구조 리스트 삽입 시 오름차순 정렬"
subtitle: ""
date: 2018-05-07
author: KimJunHee
category: Data Structure
tags: c data-structure list
finished: true
---

## 전체 Code

{% highlight c %}

#include <stdio.h>
#include <stdlib.h>

typedef struct {
	int id;
	int eng;
	int math;
}student;

typedef student element;

typedef struct ListNode {
	element data; //또는 student data;
	struct ListNode *link;
}ListNode;

ListNode *create_node(int id, int eng, int math);
void insert_node(ListNode **phead, ListNode *p, ListNode *new_node);
void ascending_insert_node(ListNode **phead, ListNode *new_node);
void display(ListNode *phead);
void init_node_list(ListNode **p);
void free_all_node(ListNode **p, int len);

int main() {
	const int len = 9;
	ListNode *p[len];
	ListNode *head = NULL;
	int i;

	init_node_list(p); //node init

	for (i = 0; i < len; i++)  //ascending insert
		ascending_insert_node(&head, p[i]);

	display(head); //display
	free_all_node(p, len); //free

	return 0;
}

void init_node_list(ListNode **p) {
	p[0] = create_node(135, 78, 55);
	p[1] = create_node(124, 65, 70);
	p[2] = create_node(147, 80, 85);
	p[3] = create_node(115, 95, 90);
	p[4] = create_node(144, 90, 80);
	p[5] = create_node(10, 90, 80);
	p[6] = create_node(4000, 90, 80);
	p[7] = create_node(343, 90, 80);
	p[8] = create_node(343, 90, 80);
}

void free_all_node(ListNode **p, int len) {
	int i;

	for (i = 0; i < len; i++) { //free
		free(p[i]);
	}

}

ListNode *create_node(int id, int eng, int math)
{
	ListNode *new_node;
	new_node = (ListNode *)malloc(sizeof(ListNode));
	new_node->data.eng = eng;
	new_node->data.math = math;
	new_node->data.id = id;

	return (new_node);
}

void insert_node(ListNode **phead, ListNode *p, ListNode *new_node)
{
	if (*phead == NULL) {
		new_node->link = NULL;
		*phead = new_node;
	}
	else if (p == NULL) {
		new_node->link = *phead;
		*phead = new_node;
	}
	else {
		new_node->link = p->link;
		p->link = new_node;
	}
}

void ascending_insert_node(ListNode **phead, ListNode *new_node) {

	ListNode *p = *phead;
	ListNode *prv = *phead; // 전 노드

	int i, cnt;

	if (*phead == NULL) {	p = NULL;	} //헤더가 NULL일 경우
	else {
		cnt = 0;

		while (p) {
			if (p->data.id > new_node->data.id) {
				break;
			}
			if (cnt > 0) //전 노드는 한 바퀴 돈 후에 하나씩 증가
				prv = prv->link;
			p = p->link;
			cnt++;
		}
		//여기까지 들어갈 자리의 전 노드를 찾음

		if (cnt == 0) // 들어갈 자리가 첫 번째 자리일 경우
			p = NULL;
		else
			p = prv;
	}

	insert_node(phead, p, new_node);
}

void display(ListNode *phead) {
	ListNode *p = phead;

	while (p) {
		printf("%d  %d  %d\n", p->data.id, p->data.eng, p->data.math);
		p = p->link;
	}
}

{% endhighlight %}

<br/><br/>
## 설명

{% highlight c %}

void insert_node(ListNode **phead, ListNode *p, ListNode *new_node)
{
	if (*phead == NULL) {
		new_node->link = NULL;
		*phead = new_node;
	}
	else if (p == NULL) {
		new_node->link = *phead;
		*phead = new_node;
	}
	else {
		new_node->link = p->link;
		p->link = new_node;
	}
}

{% endhighlight %}

* 기본 리스트의 삽입은 3가지로 나누어져 있다.
* 헤드 포인터가 NULL 일 때 (__공백 리스트 일 때__)
* p가 NULL 일 때 (__삽입 하려는 위치가 첫 번째 일 때, p는 선행 노드 이므로 p가 NULL이라는 말은 삽입하려는 위치가 첫 번째라는 말이다.__)
* 마지막으로 나머지 경우의 수이다.

<br/>
{% highlight c %}

void ascending_insert_node(ListNode **phead, ListNode *new_node) {

	ListNode *p = *phead;
	ListNode *prv = *phead; // 전 노드

	int i, cnt;

	if (*phead == NULL) {	p = NULL;	} //헤더가 NULL일 경우
	else {
		cnt = 0;

		while (p) {
			if (p->data.id > new_node->data.id) {
				break;
			}
			if (cnt > 0) //전 노드는 한 바퀴 돈 후에 하나씩 증가
				prv = prv->link;
			p = p->link;
			cnt++;
		}
		//여기까지 들어갈 자리의 전 노드를 찾음

		if (cnt == 0) // 들어갈 자리가 첫 번째 자리일 경우
			p = NULL;
		else
			p = prv;
	}

	insert_node(phead, p, new_node);
}

{% endhighlight %}

* 오름 차순 삽입의 핵심은 결국 들어 갈 위치를 찾는 문제 즉 선행 노드를 찾는게 핵심이다.
* 먼저 헤드 포인터가 NULL일 때는 일반 삽입과 같은 경우이다.
* 두 번째 경우인 첫 번째 자리에 들어갈 경우는 ```while(p)```문 안에서 첫 번째 노드보다 데이터 값이 작은 경우이다. 그렇다면 첫 번째에 들어가야 하므로 ```p = NULL```로 초기화 시켜준다.
* 마지막 경우는 ```prv```를 두번 째 ```while(p)``` 부터 돌게하여 ```prv```를 계속 이전 노드를 가리키게 한다.
* 결국 ```insert_node(phead, p, new_node);``` 는 각 해당하는 경우에 맞게 동작하게 된다.
