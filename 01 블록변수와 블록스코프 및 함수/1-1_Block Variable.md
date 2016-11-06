#CH 1. 블록변수와 블록스코프 및 함수

## 1-1. 블록변수

### 1-1-1. 기존 변수 var의 문제점 : 함수 스코프 지향 변수
ES6 이전의 javascript `var` 변수가 함수 안에 선언 되었을 경우에는 함수 내부 어디에서도 접근이 가능하다.
이는 문(`statement`) 내부에서도 선언된 변수 역시 마찬가지다.
```js
var a = 1; //전역변수로 어디든 접근 가능, global scope

function f(){
	var b = 2;
	console.log(a); //1

	if(true){
		var c = 3;
		console.log(b); //2
	}
	console.log(c); //3 , if문 안에서 선언된 변수임에도 값 접근 가능함
}

f();
```

위와 같이 변수 c는 `if`문 안에 있음에도 불구하고 함수 f내 어디에서도 변수 c에 접근이 가능하다. 이는 `var` 변수의 스코프가 함수 블럭이기 때문이다. 그래서 `if`문 (`Statement`) 안의 별도의 지역변수를 선언하여 그 해당 블록 안에서만 블록 스코프처럼 보여지도록 사용을 권장해왔다.
 이렇게 javascript의 변수가 다른 이유는 C 기반의 언어들과 달리 변수의 설계가 함수 스코프 지향으로 설계 되었기 때문이다. 하지만 ES6 부터는 키워드 `let`으로 블록 스코프(`lexical scopes`) 지향으로 사용이 가능하다.

### 1-1-2. 기존 변수 var의 문제점 : 변수의 재선언
`var`로 선언된 변수와 `let` 으로 선언된 변수의 차이를 보자.
```js
/* var 변수의 재선언 */
var a = 10;
console.log(a); //10

var a = 12;
console.log(a); //12

/* let 변수의 재선언 */
let b = 10;
console.log(b);

let b = 12;
console.log(b);
//Identifier 'b' has already been declared
```
`var`로 선언한 변수를 재선언 시에는 오류가 없으나, `let`으로 선언된 변수의 경우에는 이미 변수 b를 선언했기 때문에 오류가 발생한다. `let`으로 선언한 변수의 값을 바꾸어보자.
```js
let b = 10;
console.log(b); //10

b = 12;
console.log(b); //12
```

그럼 var로 선언한 변수를 let으로 재선언을 해보면?
```js
var c = 10;
console.log(c); //10

let c = 20;
console.log(c); //dentifier 'c' has already been declared
```
변수 c는 `var`와 `let`에 의해 2번 선언이 되어 에러가 난다. `let`은 `var`와 같은 스코프 안에 있는 변수 c를 재정의를 하지 않기 때문이다.


### 1-1-3. 호이스팅
`var` 변수의 가장 큰 특징은 함수 스코프 지향이라는 점이다. 이로 인해 javascript를 학습 할 때에는 늘 '호이스팅'의 개념을 이해했어야만 했다.

**호이스팅이란?**
`Hoisting`은 '끌어올리다'라는 사전적 의미와 같이 함수 내 어느 위치에서 변수를 선언하더라도 선언된 위치와 관계없이 함수의 최상단으로 변수가 선언되는 것을 뜻한다. 이러한 특징은 함수 스코프 지향의 변수 선언과도 연관이 있다.

```js
function getColor(condition) {
    if (condition) {
        var value = "blue";
        // other code
        return value;
    } else {
        return null;
    }
}
```

변수 `var`로 선언된 value는 실제로는 hoisting 되어 아래와 같다.
```js
function getColor(condition) {
    var value;
    if (condition) {
        value = "blue";
        // other code
        return value;
    } else {
        return null;
    }
}
```

그럼 `let`으로 선언한 변수는?
```js
function getColor(condition) {
    if (condition) {
        let value = "blue";
        // other code
        return value;
    } else {
        // value doesn't exist here
        return null;
    }
    // value doesn't exist here
}
```

이를 통해 알 수 있는 점은 `let`으로 선언한 변수의 스코프 특징을 알 수 있다.
```
1. 함수 안
2. 블록 안 ({})
```

### 1-1-4. const 키워드

```
수학에서 상수란 그 값이 변하지 않는 불변량으로, 변수의 반대말이다. 물리 상수와는 달리, 수학 상수는 물리적 측정과는 상관없이 정의된다.
```
ES6 이전

```js
var const_pi = 3.14;
var r = 2;
console.log(const_pi * r * r);
```

const의 등장
```js
const pi = 3.14;
var r = 2;
console.log(pi * r * r);
pi = 5; //Assignment to constant variable.
```

### 1-1-5. 상수를 통한 객체 참조

```js
const a ={"name":"지혜"};
console.log(a.name); //지혜

a.name = "소라";
console.log(a.name); //소라

a = {}; //Assignment to constant variable.
```
