# CH 1. 블록변수와 블록스코프 및 함수

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

let b = 12; //Identifier 'b' has already been declared
console.log(b);

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

let c = 20; //dentifier 'c' has already been declared
console.log(c);
```

변수 c는 `var`와 `let`에 의해 2번 선언이 되어 에러가 난다. `let`은 `var`와 같은 스코프 안에 있는 변수 c를 재정의를 하지 않기 때문이다.
그럼 let으로 선언한 변수를 var로 재선언 (앞의 예제와 순서가 다르게) 해보자.
```js
let d = 10;
console.log(d); //10

var d = 10; //Identifier 'd' has already been declared
console.log(d);
```

순서를 바꿔도 같은 에러가 나는 것을 볼 수 있다. `let` 키워드의 선언으로 변수 재선언이 불가능하다.


### 1-1-3. 호이스팅과 let 키워드
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
>**let, const 변수 스코프의 특징**
```
1. 함수 안
2. 블록 안 ({})
```

조금 더 생각해보자. `let`과 같이 블록스코프에서는 호이스팅 개념이 사라졌을까?
```js
var a = 10;
if(true){
    console.log("1st : "+a); //1st : 10
    var a = 20;
    }
console.log("2nd : "+a); //2nd : 20

let b = 10;
if(true){
    console.log(b); //Uncaught ReferenceError: b is not defined(…)
    let b = 20;
    }
console.log(b);
```

위 예문을 보면 글로벌 영역, if문 모두 `let`으로 변수를 선언했다. 만일 호이스팅이 일어나지 않으면 if문 블록 안에서 console.log(b)는 글로벌 영역의 b의 값을 출력해야하는데, 출력 할 수 없다는 에러를 내뱉게된다. 이는 실제로 if 내부 블록에서 선언한 변수 b가 호이스팅이 되어 접근 시도를 했으나 값이 초기화되지 않아 발생한 에러이다. `let`과 `const` 키워드 모두 블록 스코프이기 때문에 같은 에러가 발생한다. 이를 TDZ (Temporal Dead Zone), 일시적 변수 사각지대라고 한다. 어찌보면 이러한 오류는 변수가 초기화되지 않으면 접근할 수 없으므로 자연스러운 오류라고 볼 수 있다.

### 1-1-4. 블록 스코프 let
앞의 예문에서도 충분히 let은 블록 스코프 지향 변수선언임을 알 수 있었다. 여기에 하나 더 예제를 소개하려고 한다.
```js
for (var i=0; i<5; i++){
    console.log(i);
}
console.log(i);
```

똑같은 for문의 변수 i의 선언 및 초기화를 이번엔 let으로 해보자.
```js
for (let j=0; j<5; j++){
    console.log(j);  //0, 1, 2, 3, 4
}
console.log(j); //Uncaught ReferenceError: j is not defined
```
var의 너그러움을 보고 놀랐던 타 언어 개발자 역시 let을 이용하면 기존과 같은 사고가 가능하다.
하지만 javascript를 먼저 배운 개발자의 경우는 이제 let으로 for문을 돌릴 때에는 조금 더 생각을 해야한다.

```js
let k; //
for (let j=0; j<5; j++){
    console.log(j);  //0, 1, 2, 3, 4
    k = j;
}
console.log(k);

```

### 1-1-5. const 키워드

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

### 1-1-6. 상수를 통한 객체 참조

```js
const a ={"name":"지혜"};
console.log(a.name); //지혜

a.name = "소라";
console.log(a.name); //소라

a = {}; //Assignment to constant variable.
```
