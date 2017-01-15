# CH 2. 화살표 함수

**화살표 함수의 장점**
* 일반 함수 구문에 비해 구문이 짧다
```js
//일반 함수
  var normalFunction = function(x, y) {
      return x + y;
  }

  //화살표 함수
  var arrowFunction = (x, y) => x + y;
```

* 동적 바인딩을 한다
```js
  var outFunction = function(paramFunction) {paramFunction();}

  var constructorFunction = function() {
    this.count = 0;
    outFunction(function() {
      this.count ++;
      console.log(this.count);
    });
    console.log(this.count);
  }

  constructorFunction();
  /*
  결과값
  1
  1
  constructorFunction과 익명함수의 this가 모두 window 객체를 바라보고 있으며 전역으로 count 변수가 생성
  */

  var objectVariable = new constructorFunction();
  /*
  결과값
  NaN
  0
  익명함수의 경우 this는 window 객체를 바라보고 있지만 count 변수가 없기 때문에 NaN이 출력된다
  constructorFunction의 경우 this는 객체를 바라보고 있기 때문에 객체에 count변수가 생성되며 0이 출력된다
  */

  //이러한 문제를 해결하기 위한 지금까지의 방법
  var outFunction = function(paramFunction) {paramFunction();}

  var constructorFunction = function() {
    var self = this;
    self.count = 0;
    outFunction(function() {
      self.count ++;
      console.log(self.count);
    });
    console.log(self.count);
  }

  var objectVariable = new constructorFunction();

  /*
  결과값 :
  1
  1
  */

  //화살표 함수의 경우 this는 렉시컬 바인딩을 하게 된다
  var outFunction = paramFunction => {paramFunction();}

  var constructorFunction = function() {
    this.count = 0;
    outFunction(() => {
      this.count ++;
      console.log(this.count);
    });
    console.log(this.count);
  }

  var objectVariable = new constructorFunction();

  /*
  결과값 :
  1
  1
  화살표 함수의 경우 this는 자신을 둘러싸는 문맥의 this를 참고하게 된다
  */
```
**화살표 함수 Syntax**
```js
//화살표 함수의 기본 문법
//return 값이 없을 경우
(param1, param2, ... paramN) => {statements}

var noReturn = (x, y) => {x + y};
noReturn(1, 2); // 결과값 : undefinde

//return 값이 있을 경우
(param2, param2 ... paramN) => expression
               // 다음과 동일  => {return expression;}

var haveReturn = (x, y) => x + y;
haveReturn(1, 2); // 결과값 : 3

//괄호는 매개변수가 하나뿐인 경우 선택사항
(singleParam) => { statements }
singleParma => { statements }

//매개변수가 없거나 여러개인 경우는 괄호가 필요
() => { statements }
(param1, param2 ... paramN) => { statemets }
```

* 고급 구문
```js
//객체를 반환하는 경우에는 본문(body)을 괄호 속에 넣어 표현
value => ({key : value});

var objectReturn = foodName => ({food : foodName});
objectReturn('삼겹살'); // 결과값 : Object {food : '삼겹살'}

//Rest Parameter 방식을 사용할 수 있다
(param1, param2, ...rest) => { statements }

var RPparam = (eat1, eat2, ...eats) => {console.log(eat1, eat2, eats)};
RPparam('치킨', '족발', '피자', '라면', '파스타', '곱창');
// 결과값 : 치킨 족발 ["피자", "라면", "파스타", "곱창"]

//Default Parameter 방식을 사용할 수 있다
(param1 = defaultValue1, param2 = defaultValue2, ..., paramN = defaultValueN) => {statements}

var DPparam = (eat = '값이 없어서 배고파요', sleep = '값이 없어서 졸려요') => {console.log(eat, sleep)};
DPparam('햄버거'); //결과값 : 햄버거 값이 없어서 졸려요

//Destructuring Assignment 방식을 사용할 수 있다
([param1, param2] = [value1, value2], {key : value} = {key : param1 + param2}) => {statements}

var DAparam =
(eat = '배고파요', status = eat === '배고파요' ? eat + ' 그래서 잠이 안와요' : eat + '을 먹었더니 졸려요')
=> {console.log(status)};
DAparam(); //결과값 : 배고파요 그래서 잠이 안와요
DAparam('밥'); //결과값 : 밥을 먹었더니 졸려요
```
* Syntax pitfalls
```js
// 인자선언과 본문 사이에 개행을 허용하지 않습니다.
const func1 = a // SyntaxError
=> a*2;
const func2 = a => a*2; // OK

const func3 = (x, y) // SyntaxError
=> {
    return x + y;
};
const func4 = (x, y) => { // OK
    return x + y;
};
const func5 = (x, // OK
y) => {
    return x + y;
};
...

//본문이 하나의 표현식이라면 중괄호가 필요하지 않습니다.
asyncFunc.then(x => console.log(x));
//문은 중괄호안에 넣어줘야 합니다.
asyncFunc.catch(x => { throw x });

//ES6의 규칙에 따르면 화살표 바로 다음에 오는 { 기호는 언제나 블록의 시작으로 취급합니다. 객체의 시작으로 취급하는 일은 절대 없습니다.
```

* 참고
> 1. 식 : 값을 생성
> ```js
> 3 + 4
> foo(7)
> 'abc'.length
> ```
> 2. 문 : 동작
> ```js
> while (true) { ··· }
> return 123;
> ```

**화살표 함수의 특징**
> ***this, super, arguments 및 new.target의 바인딩이 없다.***
> - this, super, arguments 및 new.target은 함수를 감싸고 있는 가까운 화살표함수가 아닌 함수의 값이다. [(Lexical, 동적) 바인딩]
>
> ***prototype 프로퍼티가 없다.***
> - 화살표 함수는 new 연산자를 사용할 수 없으므로, prototype이 필요가 없다. prototype 프로퍼티는 화살표 함수에 존재하지 않는다.
>
> ***new 연산자를 통하여 호출할 수 없다.***
> - 화살표 함수는 [[Construct]]함수를 가지고 있지 않기 때문에 생성자 함수로써 사용할 수 없다. new 연산자와 함께 화살표 함수를 사용할 경우 에러가 발생한다.
> - new 연산자는 prototype의 Constructor 함수를 호출 하지만 화살표 함수는 prototype 객체가 없기 때문에 new 연산자를 사용할 수 없다.
>
> ***this의 값을 변경할 수 없다.***
> - 함수 내부에서 this의 값을 변경할 수 없다.
> - this가 없기 때문에 엄격모드("use strict")의 영향을 받지 않으며 call 또는 apply는 this에 아무런 영향이 없다.
>
> ***arguments 객체에 접근할 수 없다.***
> - 화살표 함수는 arguments를 바인딩하지 않으므로, 이름과 Rest Parameter를 이용해야 한다.
> arguments 객체는 존재하지만 접근할 수 없다.
>
> ***중복된 이름의 파라미터를 가질 수 없다.***
>  - 화살표 함수는 엄격모드이거나 비엄격모드여도 중복된 이름의 파라미터를 가질 수 없지만, 일반 함수는 엄격모드의 경우에만 중복된 이름의 파라미터를 가질 수 없다.

**this**
```js
  var outFunction = function(paramFunction) {paramFunction();}

  var constructorFunction = function() {
    this.count = 0;
    outFunction(function() {
      this.count ++;
      console.log(this.count);
    });
    console.log(this.count);
  }

  constructorFunction();
  /*
  결과값
  1
  1
  constructorFunction과 익명함수의 this가 모두 window 객체를 바라보고 있으며 전역으로 count 변수가 생성
  */

  var objectVariable = new constructorFunction();
  /*
  결과값
  NaN
  0
  익명함수의 경우 this는 window 객체를 바라보고 있지만 count 변수가 없기 때문에 NaN이 출력된다
  constructorFunction의 경우 this는 객체를 바라보고 있기 때문에 객체에 count변수가 생성되며 0이 출력된다
  */

  //이러한 문제를 해결하기 위한 지금까지의 방법
  var outFunction = function(paramFunction) {paramFunction();}

  var constructorFunction = function() {
    var self = this;
    self.count = 0;
    outFunction(function() {
      self.count ++;
      console.log(self.count);
    });
    console.log(self.count);
  }

  var objectVariable = new constructorFunction();

  /*
  결과값 :
  1
  1
  */

  //화살표 함수의 경우 this는 렉시컬 바인딩을 하게 된다
  var outFunction = paramFunction => {paramFunction();}

  var constructorFunction = function() {
    this.count = 0;
    outFunction(() => {
      this.count ++;
      console.log(this.count);
    });
    console.log(this.count);
  }

  var objectVariable = new constructorFunction();

  /*
  결과값 :
  1
  1
  화살표 함수의 경우 this는 자신을 둘러싸는 문맥의 this를 참고하게 된다
  */
```

**arguments**
```js
  var argsFunction = function() {return arguments;}
  argsFunction(); // 결과값 : []

  var argsArrowFunction = () => arguments;
  argsArrowFunction(); // 결과값 : Uncaught ReferenceError: arguments is not defined(…)

  //화살표 함수를 통한 arguments 사용
  var outFunction() {
    var args = (i) => arguments[0] + i;
    return args(2);
  }
  outFunction(1); // 결과값 : 3;

  //화살표 함수 자체의 arguments 사용
  var argsArrowFunction = (...args) => args;
  argsArrowFunction(); // 결과값 : []

  function createArrowFunctionReturningFirstArg() {
    return () => arguments[0];
  }

  var arrowFunction = createArrowFunctionReturningFirstArg(5);

  console.log(arrowFunction());       // 5
```

**new**
```js
  var constructor = function(){
    console.log(this);
  };
  var o = new constructor(); // 결과값 : constructor {}

  var constructorArrowFunction = () => {console.log(this);}
  var o = new constructorArrowFunction();
  // 결과값 : Uncaught TypeError: constructorArrowFunction is not a constructor(…)
```

**use strict**
```js
function test(arg, arg) {console.log(arg)};
test(1, 2); // 2

"use strict";
function test(arg, arg) {console.log(arg)};
// Uncaught SyntaxError: Duplicate parameter name not allowed in this context

let test = (t, t) => {console.log(t);}
// Uncaught SyntaxError: Duplicate parameter name not allowed in this context
```

```js
// 각 강아지(puppy)가 가지고 놀 비어있는 객체 만들기
var chewToys = puppies.map(puppy => {});   // BUG!
var chewToys = puppies.map(puppy => ({})); // ok
```
혼란스럽게도 비어있는 객체 {}와 비어있는 블록 {}은 보기에 똑같습니다. ES6의 규칙에 따르면 화살표 바로 다음에 오는 { 기호는 언제나 블록의 시작으로 취급합니다. 객체의 시작으로 취급하는 일은 절대 없습니다. 그래서 puppy => {} 코드는 아무것도 하지 않고 undefined를 리턴하는 화살표 함수로 처리됩니다.
더욱 혼란스러운 것은 {key: value} 같은 객체 리터럴이 라벨을 포함한 블록과 보기에 똑같다는 점입니다. 적어도 JavaScript 엔진에게는 똑같아 보입니다. 다행인 것은 모호한 기호가 { 하나뿐이라는 점입니다. 그래서 우리는 객체 리터럴을 괄호로 묶는다는 주의사항만 기억하면 됩니다.

**Immediately Invoked Arrow Function (IIAF)**
```js
(function () { // open IIFE
    // inside IIFE
}()); // close IIFE

(() => {
    return 123
})();
```
> IIAF가 블록 본문을 가지고 있더라도 바인딩을 느슨하게하기 때문에 함수 호출이 불가능하기 때문에 괄호로 묶어야합니다.
