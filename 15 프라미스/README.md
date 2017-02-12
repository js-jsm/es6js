# CH 15. Promise - `by 재남`


## 15-1. 개요

서버통신, 시간지연 등 비동기 연산이 필요한 경우, 이를 콜백이 아닌 동기연산처럼 처리할 수 있게끔 해주는 명령어이다.

```js
const executer = (resolve, reject) => { ... };

new Promise(executer)
```

executer는 resolve, reject를 파라미터로 갖는 함수이며, `new Promise(executer)` 구문에 의해 즉시 실행된다.
이 함수 내에서 어떤 연산 이후 결과값을 반환하거나(resolve), `resolve()` 또는 `reject()` 함수를 호출하면 이는 곧 `thenable` 객체가 된다.
`thenable` 객체는 `then(onFulfilled, onRejected)` 또는 `catch(onRejected)` 메소드를 체이닝으로 연결할 수 있다.

예제를 통해 살펴보자.

```js
const promiseTest = param => new Promise((resolve, reject) => {
	setTimeout(() => {
		if (param) {
			resolve("해결 완료");
		} else {
			reject(Error("실패!!"));
		}
	}, 1000);
});

const testRun = param => promiseTest(param)
  .then(text => { console.log(text); })
  .catch(error => { console.error(error); });

// testRun(true);
// testRun(false);
```

`promiseTest` 함수는 param을 받아 executer가 즉시 실행된 상태의 [새로운 프라미스 객체]를 반환한다.
param에 `true`를 넘길 경우에는 1초 뒤 `resolve(...)`가 호출되고,
`false`를 넘길 경우에는 1초 뒤 `reject(...)`가 호출된다.

`resolve()`가 호출된 `thenable` 객체는 메소드 체이닝을 통해 `then(onFullfilled)`를 실행시키며,
`reject()`가 호출된 `thenable` 객체는 메소드 체이닝을 통해 `catch(onRejected)`를 실행시킨다.
즉 `then`, `catch`는 thenable 객체의 상태에 따라 실행되거나 무시된다.


## 15-2. 상태

Promise 객체의 상태는 다음 세가지 중 하나이다.
- 대기중(pending): 초기 상태, 이행 또는 거부되지 않은 상태.
- 처리됨(settled): 연산이 수행된 상태.
  + 이행됨(fulfilled): 연산이 성공리에 완료된 상태.
  + 거부됨(rejected): 연산이 실패한 상태.

위의 예제의 경우 executer가 실행된 이후 1초가 지나기 전까지의 상태는 `pending`상태이며,
이 때까지의 프라미스 객체는 `thenable`하지 않다. 1초가 경과된 시점에서 `settled` 상태,
그 중에서도 `fulfilled` 혹은 `rejected` 상태가 결정되며, 이에 따라 `then` 또는 `catch` 메소드가 실행된다.


## 15-3. 프라미스 체이닝

여러개의 asynchronous한 함수를 순차 호출하기 위해서, 기존에는 callback함수를 활용해왔다. promise에서도 이와 비슷한 방식으로 구현할 수 있다.

```js
const promiseFunc = param => new Promise((resolve, reject) => {
	if (param) resolve(param + 1);
	else reject(Error("실패!!"));
});
promiseFunc(1)
.then(result1 => {
	// result1 사용
	promiseFunc(result1)
	.then(result2 => {
		promiseFunc(result2)
		.then(result3 => {
			...
		});
	});
});
```

그런데 프라미스의 `then` 메소드는 언제나 프라미스를 반환한다. 심지어 return이 없을 경우에는 undefined가 담긴 프라미스를 반환한다. 이를 이용하면 위와 같이 depth가 무한정 깊어지는 _콜백지옥_ 형태를 피하고 flat한 구문을 유지할 수 있다.

```js
const promiseFunc = param => new Promise((resolve, reject) => {
	if (param) resolve(param + 1);
	else reject(Error("실패!!"));
});

promiseFunc(1)                    // promiseFunc 호출 [1]
.then(result1 => {
	// result1 사용
	return promiseFunc(result1);   // promiseFunc 호출 [2]
})
.then(result2 => {
	// result2 사용
	return promiseFunc(result2);   // promiseFunc 호출 [3]
})
.then(result3 => {
	// result3 사용
})
.catch(err => {
	// promiseFunc[1], promiseFunc[2], promiseFunc[3]중 어딘가에서 발생한 에러 핸들링
});
```

`P` 프라미스에 then메소드를 호출한 결과를 새로운 프라미스 `Q`라 하자.

```
P.then(onFulfilled, onRejected);
```

여기서 `Q`는 `onFulfilled` 혹은 `onRejected` 메소드에서 반환(return)된 값이 있을 경우 해당 값으로 resolve 된다.
한편 `onFulfilled` 혹은 `onRejected`에서 예외를 던질 경우에는 reject 된다.
