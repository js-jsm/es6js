# CH 5. 객체

자바스크립트는 객체기반의 스크립트 언어이며 자바스크립트를 이루고 있는 거의 모든 것들이 객체로 존재한다.
단순한 데이터 타입(숫자, 문자열, 불리언, null, undefined)을 제외한 다른 값들은 모두 객체이다.

## 5-1. _ _ proto _ _ 프로퍼티

자바스크립트의 모든 객체는 자신을 생성한 객체 원형에 대한 숨겨진 연결을 갖는다. 이때 자기 자신을 생성하기 위해 사용된 객체 원형을 프로토타입이란 한다.
자바스크립트의 모든 객체는 Object 객체의 프로토타입을 기반으로 확장 되었기 때문에 이 연결의 끝은 Object 객체의 프로토타입 Object이다.

모든 객체는 속성을 상속하는 프로토타입 객체에 연결되어 있으며, 객체 리터럴로 생성되는 모든 객체는 자바스크립트의 표준 객체인 Object의 속성인 prototype(Object.prototype) 객체에 연결된다. 즉 자신이 상속한 객체를 참조하기 위해 내부에 [[prototype]] 프로퍼티를 둔다.

[[prototype]]을 직접 읽거나 수정할 수 없는 이유로 이 값을 읽으려면 Object.getPrototypeOf() 메소드를 이용하고,
동일한 [[prototype]]으로 새 객체를 생성하려면 Object.create() 메소드를 이용해야만 했다.


-

* _Object.getPrototypeOf() 메소드_ : 지정된 객체의 프로토타입(가령 내부 [[Prototype]] 속성값)을 반환

> 구문 : *Object.getPrototypeOf(obj)*

```js
var proto = {};
Object.getPrototypeOf(proto); // Object

var proto = 3;
Object.getPrototypeOf(proto); // Number
```

> 주의 : ES5에서, obj 매개변수가 객체가 아닌 경우 TypeError 예외가 발생합니다. ES6에서, 매개변수는 Object로 강제됩니다.

```js
// ES5 code
Object.getPrototypeOf("foo"); // TypeError
```

```js
// ES6 code
Object.getPrototypeOf("foo"); // String.prototype
```

* _생성자 함수_ : new 키워드로 객체를 생성할 수 있는 함수, 초창기의 프로토타입 상속 방식

> 구문 : *new constructor[([arguments])]*

```js
function Proto(){}
Proto.prototype.name = 'es6js';

var obj = new Proto();

Object.getPrototypeOf(obj); // Object {name: "es6js"}
```

* _Object.create() 메소드_ : 지정된 프로토타입 객체 및 속성(property)을 갖는 새 객체를 생성

> 구문 : *Object.create(proto[, propertiesObject])*

```js
var proto = {
  name:'es6js'
};
var obj = Object.create(proto);

Object.getPrototypeOf(obj); // Object {name: "es6js"}
```

-


[[prototype]]는 다루기 까다로운 프로퍼티라서 일부 브라우저는 _ _ proto _ _라는 특별한 프로퍼티를 객체에 두어 밖에서도 접근할 수 있게 하고 덕분에 한결 프로토타입을 다루기 수월해졌다. 현재 대부분의 브라우저가 지원하고 있고 속성의 존재와 정확한 동작, 그리고 웹 브라우저 호환성을 확보하기 위해 레거시 기능으로 ECMAScript 6에서 표준화되었다.

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

_ _ proto _ _속성은 오브젝트 설정 오브젝트 리터럴 정의에 사용될 수 [[Prototype]]대안이다.

```js
var shape = {};

function Circle(){
  name : 'es6js'
}
circle = new Circle();

// Set the object prototype
shape.__proto__ = circle;

// Get the object prototype
console.log(shape.__proto__ === circle); // true
```

## 5-1-1. _ _ proto _ _getter 함수, _ _ proto _ _setter 함수

_ _ proto _ _속성은 getter 및 setter 함수로 이루어진 Object.prototype에 쉽게 접근할 수 있는 속성이다. 

_ _ proto _ _getter 함수는 객체의 내부 [[Prototype]]의 가치를 외부에 노출되며,
_ _ proto _ _setter 함수는 객체의 [[Prototype]]를 변경할 수 있다.

이전에 Object.isExtensible() 메소드로 객체가 확장 가능한지(객체에 새 속성을 추가할 수 있는지 여부)를 확인해야 한다. 
확장 가능하지 않을 경우에는 TypeError가 발생된다.


-

* _Object.isExtensible() 메소드_ : 객체가 확장 가능한지(객체에 새 속성을 추가할 수 있는지 여부)를 결정

> 구문 : *Object.isExtensible(obj)*

```js
var empty = {};
Object.isExtensible(empty); // === true
```

> 주의 : ES6에서는 비객체 인수는 보통 객체처럼 다뤄지며, false를 반환한다.

```js
// ES5 code
Object.isExtensible(1); // TypeError
```

```js
// ES5 code
Object.isExtensible(1); // false
```

-



결국 Object.prototype을 참조하여 _ _ proto _ _으로 접근하여 속성을 찾는다. 그러나 Object.prototype 참조만 하고 접근을 한 뒤에는 속성을 찾을 수 없다.
Object.prototype이 참조되기 전에 몇 가지 다른 _ _ proto _ _가 속성을 찾아낸 후, 그 속성은 Object.prototype 위에서 찾아낸 속성을 숨긴다.

```js
var noProto = Object.create(null);

console.log(typeof noProto.__proto__); // undefined
console.log(Object.getPrototypeOf(noProto)); // null

noProto.__proto__ = 17;

console.log(noProto.__proto__); // 17
console.log(Object.getPrototypeOf(noProto)); // null
```

### _ _ proto _ _와 prototype이 같은 지 테스트

```js
// 생성자로 사용할 함수 선언
function Employee(){}

// 새로운 인스턴스 생성
var fred = new Employee();

fred.__proto__ === Employee.prototype; // true

fred.__proto__; // Object{} //constructor: function Employee()
```

```js
// 새로운 함수 선언
function Cow(){}

// Cow 함수의 프로토타입을 할당하여 변경
fred.__proto__ = Cow.prototype;

fred.__proto__; // Object{} //constructor: function Cow()
```

```js
fred.__proto__ === Employee.prototype; // false
fred.__proto__ === Cow.prototype; // true
```

fred 인스턴스는 Employee를 상속하고 있는 상태에서 다른 개체 fred._ _ proto _ _를 할당하여 변경하게 되면,
fred는 Employee.prototype 대신 Cow.prototype를 상속하게 되며, Employee.prototype에서 원래 상속 된 속성을 잃게 된다.
