# CH 5. 객체

## 5-1. 객체(Object)의 기본정의

자바스크립트는 객체기반의 스크립트 언어이며 자바스크립트를 이루고 있는 거의 모든 것들이 객체로 존재한다.
단순한 데이터 타입(숫자, 문자열, 불리언, null, undefined)을 제외한 다른 값들은 모두 객체이다.

### 5-1-1. _ _ proto _ _ 프로퍼티

자바스크립트의 모든 객체는 자신을 생성한 객체 원형에 대한 숨겨진 연결을 갖는다. 이때 자기 자신을 생성하기 위해 사용된 객체 원형을 프로토타입이란 한다.
자바스크립트의 모든 객체는 Object 객체의 프로토타입을 기반으로 확장 되었기 때문에 이 연결의 끝은 Object 객체의 프로토타입 Object이다.

모든 객체는 속성을 상속하는 프로토타입 객체에 연결되어 있으며, 객체 리터럴로 생성되는 모든 객체는 자바스크립트의 표준 객체인 Object의 속성인 prototype(Object.prototype) 객체에 연결된다. 즉 자신이 상속한 객체를 참조하기 위해 내부에 [[prototype]] 프로퍼티를 둔다.

[[prototype]]을 직접 읽거나 수정할 수 없는 이유로 이 값을 읽으려면 Object.getPrototypeOf() 메소드를 이용하고,
동일한 [[prototype]]으로 새 객체를 생성하려면 Object.create() 메소드를 이용해야만 했다.

-

* _Object.getPrototypeOf() 메소드_ : 지정된 객체의 프로토타입(가령 내부 [[Prototype]] 속성값)을 반환

> 구문 : *Object.getPrototypeOf(obj)*
```js
Object.getPrototypeOf('foo'); // Object{}
```

> 주의 : ES5에서, obj 매개변수가 객체가 아닌 경우 TypeError 예외가 발생합니다. ES6에서, 매개변수는 Object로 강제됩니다.
```js
// es5 code
Object.getPrototypeOf("foo"); // TypeError
```
```js
// es6 code
Object.getPrototypeOf("foo"); // String.prototype
```

* _생성자 함수_ : new 키워드로 객체를 생성할 수 있는 함수, 초창기의 프로토타입 상속 방식
```js
function Proto(){}
Proto.prototype.name = 'es6js';

var obj = new Proto();

Object.getPrototypeOf(obj); // Object {name: "es6js"}
```

* _Object.create() 메소드_ : 지정된 프로토타입 객체 및 속성(property)을 갖는 새 객체를 생성

>구문 : *Object.create(proto[, propertiesObject])*
```js
var proto = {
  name:'es6js'
};
var obj = Object.create(proto);

Object.getPrototypeOf(obj); // Object {name: "es6js"}
```

-

[[prototype]]는 다루기 까다로운 프로퍼티라서 일부 브라우저는 _ _ proto _ _라는 특별한 프로퍼티를 객체에 두어 밖에서도 접근할 수 있게 하고 덕분에 한결 프로토타입을 다루기 수월해졌다. 이렇게 ES5까지 정식 표준이 아니었던 _ _ proto _ _프로퍼티는 워낙 많이 쓰이다 보니 드디어 ES6에서 표준이 되었다.

```js
// es5
var x = {x: 12};
var y = Object.create(x, {y: {value: 13}});

console.log(y.x); // 12
console.log(y.y); // 13
```

```js
// es6
let x = {x: 12, __proto__: {y: 13}};

console.log(x.x); // 12
console.log(x.y); // 13
```



- Object.getPrototypeOf() 메소드 : 지정된 객체의 프로토타입(가령 내부 [[Prototype]] 속성값)을 반환
- Object.create() 메소드 : 지정된 프로토타입 객체 및 속성(property)을 갖는 새 객체를 생성

```js
var proto = {};
var obj = Object.create(proto);
Object.getPrototypeOf(obj) === proto; // true
```

*주의 : ES5에서, obj 매개변수가 객체가 아닌 경우 TypeError 예외가 발생합니다. ES6에서, 매개변수는 Object로 강제됩니다.*

```js
// es5 code
Object.getPrototypeOf("foo"); // TypeError

// es6 code
Object.getPrototypeOf("foo"); // String.prototype
```

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf]

___

#### Object.is() 메소드

#### Object.setPrototypeOf() 메소드

#### Object.assign() 메소드

--------------



```js
// es5 code
Object.getPrototypeOf("foo"); // String

var proto = {};
var obj = Object.create(proto);
Object.getPrototypeOf(obj); // Object

// es6 code
Object.getPrototypeOf("foo"); // Object
```



### 5-1-2. Object.create() 메소드
지정된 프로토타입 객체 및 속성(property)을 갖는 새 객체를 만듭니다.

```js
var x = {x: 12};
var y = Object.create(x, {y: {value: 13}});

console.log(y.x); // 12
console.log(y.y); // 13
```
