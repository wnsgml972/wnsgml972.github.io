---
layout: post
title: "Kotlin Test DeepDive"
subtitle: ""
category: Kotlin
tags: kotlin mockk junit5 spring kluent test
date: 2021-05-30
author: KimJunHee
finished: true
---


<br/>

## TL;DR;

`Kotlin` 테스트의 Assertion을 쉽게 도와주는 `Kluent`를 소개합니다.

`UnitTest(Mock Test)`와 `Integration Test`를 기준으로 나누어 설명합니다.

Common하게 쓰이는 `Service Layer`의 `UnitTest`를 실제 Github Repo 예제를 통해 학습합니다.



<br/><br/>

## Kluent

[MarkusAmshove/Kluent](https://github.com/MarkusAmshove/Kluent)

`Kluent` 는 Kotlin을 위해 특별히 작성된 `"Fluent Assertions"`라이브러리입니다.

Kotlin 의 Infix-Notations 및 Extension Functions 를 사용하여 **JUnit-Assertions에 대한 유창한 래퍼를 제공합니다.**


### Example

```kotlin
// 자기 자신 assertion
mapper.shouldNotBeNull()
context.getBeansOfType(OpenAPI::class.java).shouldNotBeNull()
context.getBeansOfType(MeterFilter::class.java).shouldNotBeEmpty()

// 비교 assertion, `Using backticks`
"hello" `should be equal to` "hello"
"hello" `should not be equal to` "world"
actual.shouldNotBeNull() shouldBeEqualTo expected
```



<br/><br/>

## Integration Test

IT Test는 `WebTestClient`를 이용합니다.

[Coffee-Street/strada](https://github.com/Coffee-Street/strada/tree/master/api/src/test/kotlin/com/wnsgml972/strada)

### Config

`WebTestClient`를 설정합니다.

```kotlin
@ActiveProfiles("test")
@SpringBootTest(classes = [TestApplication::class], webEnvironment = WebEnvironment.RANDOM_PORT)
class IntegrationTest

@SpringBootApplication
class TestApplication
```

### Example

다음과 같이 api를 직접 호출하여 결과값을 Assertion하며 테스트를 진행할 수 있습니다.

`ConsmeWith`를 통해 `Kluent`로 Body값을 Assertion하여 테스트를 진행할 수 있습니다.

```kotlin
@Test
fun `account controller get token`() {
    val accessTokenRequest = AccessTokenRequest("010-1234-1234")

    client.post()
        .uri(AccountController.ACCOUNT_BASE_URL)
        .contentType(MediaType.APPLICATION_JSON)
        .bodyValue(accessTokenRequest)
        .exchange()
        .expectStatus().is2xxSuccessful
        .expectBody<AccessTokenResponse>()
}

@Test
fun `health check`() {
    client.get()
        .uri(HealthCheckController.HEALTH_BASE_URL)
        .exchange()
        .expectStatus().is2xxSuccessful
}

@Test
fun `get ping auth fail, forbidden`() {
    client.get()
        .uri(IndexController.INDEX_BASE_URL)
        .exchange()
        .expectStatus().isForbidden
}

@Test
fun `get ping auth success`() {
    val accessToken = authHelper.getAccessToken()

    client.get()
        .uri(IndexController.INDEX_BASE_URL)
        .header("Authorization", "Bearer $accessToken")
        .exchange()
        .expectStatus().is2xxSuccessful
        .expectBody<String>()
        .consumeWith { result ->
            result.responseBody shouldBeEqualTo "PONG"
            logger.debug { "result=${result.responseBody}" }
        }
}
```



<br/><br/>

## UnitTest (Mock Test)

[MockK](https://mockk.io/)

### Mockking은 왜할까?

- mockking에 대한 여러 사용처가 있지만, 여기서는 `Service Layer` 테스트하는 것을 주로 설명합니다.
- 테스트 할 시, 통합적인 환경을 테스트하고 싶은 것이 아닌, 특정 부분만 테스트 하고 싶을 경우가 있습니다.
- 보통 `Service Layer`가 그에 해당하며, 해당 부분을 제외한 것을 mockking 하여 Service만 테스트하기 위해 사용합니다.
- 다른 모든 부분을 mockking 하였으니 테스트 자체도 매우 가볍고, CI 또한 구성하기 매우 쉽습니다.
- 아래에서는 사용 방법을 설명합니다.


<br/>

### Mock DSL Basic

- 기본적인 사용법입니다.
- corutine(suspending) 함수의 경우 co를 prefix로 붙여진 함수를 사용합니다.

```kotlin
// 객체 생성
val car = mockk()

// 리턴 값 정의
every { car.drive(Direction.NORTH) } returns Outcome.OK
coEvery { car.drive(Direction.NORTH) } returns Outcome.OK

// 검증
verify { car.drive(Direction.NORTH) }
coVerify { car.drive(Direction.NORTH) }

// 호출 확인
// 모든 호출이 verify...구성에 의해 확인되었는지 검증할 수 있습니다.
confirmVerified(car)
```


<br/>

### Mock 객체 주입

**아래와 같이 `mock` 객체를 생성합니다.**

- junit5를 기준으로 설명합니다.
- mockiing 후 추가적으로 객체의 행위를 정의해줘야 합니다.

```kotlin
@BeforeEach
fun initialize() {
	addressBook = mockk()
}
```

**아래 처럼 `relaxed mock` 을 사용할 수 있습니다.**

- relaxed mock는 모든 함수에 대해 간단한 값을 반환하는 모의 객체입니다.
- 이를 통해 **각 경우에 대한 동작 지정을 건너 뛰고** 필요한 것을 스텁 할 수 있습니다.

```kotlin
@BeforeEach
fun initialize() {
	addressBook = mockk(relaxed = true)
}
```

아래 처럼 mocking을 해제할 수 있습니다.

```kotlin
@AfterEach
fun finalize() {
	unmockkAll()
    // or unmockkObject(MockObj)
}
```


<br/>

### Mock 행위 정의

**함수 리턴 값 정의**

- returns는 컴파일되는 시점의 값을 단 한번만 인식하여 그대로 행하게 됩니다.

```kotlin
every { name } returns "John"
```

**함수 행위 정의**

- justRun 또한 컴파일되는 시점의 값을 단 한번만 인식하여 그대로 행하게 됩니다.

```kotlin
// Unit을 반환합니다.
justRun { obj.sum(any(), 3) }
```

**함수 전체 정의**

- answers를 이용하면 런타임 시 해당 함수를 호출하게 합니다.

```kotlin
every {
    name.makeNickname()
} answers {
    name + "aaaa"
	name
}
```

**Varargs**

- 확장 된 variable 처리가 가능합니다.

```kotlin
every { obj.manyMany(5, 6, *anyVararg()) } returns 4

println(obj.manyMany(5, 6, 1, 7)) // 4
println(obj.manyMany(5, 6, 2, 3, 7)) // 4
println(obj.manyMany(5, 6, 4, 5, 6, 7)) // 4
```

**Hierarchical Mocking**

- 객체 mocking 후 바로 행위를 정의할 수 있습니다.

```kotlin
@BeforeEach
fun initialize() {
	addressBook = mockk() {
    every { contacts } returns listOf(
        mockk {
            every { name } returns "John"
            every { telephone } returns "123-456-789"
            every { address.city } returns "New-York"
            every { address.zip } returns "123-45"
        },
        mockk {
            every { name } returns "Alex"
            every { telephone } returns "789-456-123"
            every { address } returns mockk {
                every { city } returns "Wroclaw"
                every { zip } returns "543-21"
            }
        }
    )
}
```


<br/>

### Mock Assertion

**함수 호출 카운트 확인**

- atLeast, atMost또는 exactly매개 변수를 사용하여 호출 수를 확인할 수 있습니다 .

```kotlin
// all pass
verify(atLeast = 3) { car.accelerate(allAny()) }
verify(atMost  = 2) { car.accelerate(fromSpeed = 10, toSpeed = or(20, 30)) }
verify(exactly = 1) { car.accelerate(fromSpeed = 10, toSpeed = 20) }
verify(exactly = 0) { car.accelerate(fromSpeed = 30, toSpeed = 10) } // means no calls were performed

confirmVerified(car)
```

**함수 호출 순서 확인**

- `verifySequence`: 호출이 지정된 순서로 발생했는지 확인합니다.

```kotlin
verifySequence {
    obj.sum(1, 2)
    obj.sum(1, 3)
    obj.sum(2, 2)
}

confirmVerified(obj)
```

**시간 초과 확인**

- 동시 작업을 확인하려면 다음을 사용할 수 있습니다 `timeout = xxx`

```kotlin
mockk {
    every { sum(1, 2) } returns 4

    Thread {
        Thread.sleep(2000)
        sum(1, 2)
    }.start()

    verify(timeout = 3000) { sum(1, 2) }
}
```



<br/>

### Common Example

**Repository Mocking**

[Apply Mocking UnitTest by wnsgml972 · Pull Request #55 · Coffee-Street/strada](https://github.com/Coffee-Street/strada/pull/55)

- **데이터 소스**를 Mocking 합니다.
- 데이터베이스의 행위를 **인메모리** 상에서 동작할 수 있게 `MutableMap`을 이용해 **행위를 정의**합니다.
- Mocking된 함수의 호출 카운트를 검증하여 Service Logic이 정확하게 동작하는 것을 검증합니다.

```kotlin
class AccountServiceTest : AbstractWebTest() {

    lateinit var sut: UserService

    lateinit var userRepository: UserRepository
    private val userMap = mutableMapOf<String, User>()
    private var capturedId = ""

    @BeforeEach
    fun initialize() {
        // clear test environment
        userMap.clear()
        unmockkAll()

        // set mock test
        userRepository = mockk()
        every {
            userRepository.findById(any())
        } answers {
            Optional.of(userMap[capturedId] ?: throw NotFoundException())
        }

        every {
            userRepository.save(any())
        } answers {
            userMap[capturedId] = User.of(capturedId, true)
            userMap[capturedId] ?: throw NotFoundException()
        }

        every {
            userRepository.findAll()
        } answers {
            userMap.values.toList()
        }

        // set unit test service
        sut = UserService(userRepository)
    }

    @Test
    fun `sign up & get user`() {
        // given: 유저가 아이디를 입력합니다
        capturedId = "010-1234-5678"

        // when: 가입 후 유저를 가져옵니다.
        val user1 = sut.signUp(capturedId)
        val user2 = sut.findById(capturedId)
        val totalUserCount = sut.findAll().size

        // then: 검증합니다
        user1 `should be equal to` user2
        totalUserCount `should be equal to` (1)

        verify(exactly = 1) { userRepository.save(any()) }
        verify(exactly = 1) { userRepository.findById(any()) }
        verify(exactly = 1) { userRepository.findAll() }
        confirmVerified(userRepository)
    }
}
```
