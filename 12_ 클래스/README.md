# CH 12. Class - `by 재남`

## 12-1. 객체 지향 설계 원칙에 따른 클래스 문법

Class 문법은 기존 prototype 기반의 상속을 보다 명료하게 표현한다. 비록 새로운 객체지향 상속 모델을 제공하는 것은 아니지만, 객체를 생성하고 상속을 다루는데에 훨씬 단순하고 명확한 문법을 제공한다.

### 12-1-1. Class 정의

Class는 함수의 일종으로, 함수를 함수 표현식과 함수 선언으로 정의할 수 있듯이 class 문법도 class 표현식과 class 선언 두가지 방법을 제공한다.

다만 함수선언문과 달리 클래스에 대해서는 TDZ가 존재하며, strict mode 여부와 무관하게 블록스코프의 영향을 받는다. 자세한 내용은 후술하겠다.


#### 12-1-1-1. Class 선언문

```js
class Car {
  // blah blah
}
```

#### 12-1-1-2. Class 표현식

```js
const Car = class {
  // blah blah
}
```

### 12-1-2. Class Body

#### 1) 암묵적 `Strict Mode` 강제

클래스 내용부분은 암묵적으로 strict mode가 강제된다. 즉 `'use strict'` 명령 없이도 자동적으로 strict mode로 동작한다(`module` 내용부분도 그러하다). Class가 새로운 문법인 이상 기존 문법과의 호환성을 고려할 필요가 없기 때문에 이뤄진 조치로, ES6 이후로도 자바스크립트는 sloppy mode의 허용범위를 점차 줄이는 방향으로 발전할 것이다.


#### 2) `constructor` method

`constructor` 메소드는 클래스로 인스턴스를 생성할 때 초기화 목적으로 자동 호출되는 특별한 메소드로서, 기존의 생성자함수와 동일한 역할을 한다.

```js
// ES5
function Car(name) {
  this.fuel = 0;
}
var tico = new Car();
console.log(tico.fuel);  // 0
```

```js
// ES2015
class Car {
  constructor() {
    this.fuel = 0;
  }
}
const tico = new Car();
console.log(tico.fuel);  // 0
```

`constructor`는 Class body 내에서 오직 한 번만 선언되어야 한다.

```js
class Car {
  constructor() {
    this.fuel = 0;
  }
  constructor() {
    this.distance = 0;
  }
}  // Uncaught SyntaxError: A class may only have one constructor
```

인스턴스에 상속된 `constructor`는 클래스를 가리키므로, 메소드들과 달리 인스턴스에서 직접 호출할 수 없고 반드시 `new` 명령어와 함께 호출해야 하며, 이 때의 결과는 새로운 인스턴스를 생성한 것과 같다.

```js
class Car {
  constructor() {
    this.fuel = 0;
  }
  addFuel() {
    return ++this.fuel;
  }
}
const tico = new Car();
console.log(tico.addFuel());   // 1

const matiz = new tico.constructor();
console.log(matiz.addFuel());  // 1

const ray = c1.constructor();
  // Uncaught TypeError: Class constructor P cannot be invoked without 'new'
```

constructor 메소드 내에서는 특별한 함수인 `super(arguments)`를 호출할 수 있는데, 이에 대해서는 `extends` 파트에서 자세히 다루겠다.


### 3) methods

객체의 메소드와 마찬가지로 클래스의 인스턴스에서 상속받아 호출할 수 있는 prototype 프로퍼티이다. 기존의 prototype 메소드와 마찬가지로 동작하지만, 생성자함수로는 활용할 수 없다.

```js
// ES5
function Car(name) {
  this.fuel = 0;
}
Car.prototype.addFuel = function(){
  return ++this.fuel;
}
var tico = new Car();
tico.addFuel();           // 1
Car.prototype.addFuel();  // NaN
var ray = new tico.addFuel();             // undefined
var matiz = new Car.prototype.addFuel();  // undefined
```

```js
// ES2015
class Car {
  constructor() {
    this.fuel = 0;
  }
  addFuel() {
    return ++this.fuel;
  }
}
const tico = new Car();
tico.addFuel();           // 1
Car.prototype.addFuel();  // NaN
const ray = new tico.addFuel();             // Uncaught TypeError: tico.addFuel is not a constructor
const matiz = new Car.prototype.addFuel();  // Uncaught TypeError: Car.prototype.addFuel is not a constructor
```

### 4) static methods

메소드 앞에 'static' 키워드를 선언하면 해당 메소드는 정적 메소드가 된다. 정적 메소드는 클래스 자신이 갖는 메소드이며, 인스턴스에서는 호출할 수 없다. 주로 클래스의 유틸리티성 함수를 생성하는데 사용된다.

```js
class Animal {
  constructor(legs) {
    this.legs = legs;
  }
  static getTotalLegs(...animal) {
    return animal.reduce((count, anim) => count + anim.legs, 0);
  }
}
const dog = new Animal(4);
const cat = new Animal(4);
const bird = new Animal(2);
console.log(Animal.getTotalLegs(dog, cat, bird));  // 10
dog.getTotalLegs();  // Uncaught TypeError: dog.getTotalLegs is not a function
```
