#화살표 함수

##1. 요약
1. 일반 function 식에 비해 구문이 짧다.
2. this 값을 렉시컬 바인딩한다.
3. 화살표 함수는 항상 익명함수이다.

##1. 구문
* 기본 구문
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

##2. 특징
  1. 일반 function 식에 비해 구문이 짧다.
```js
//일반 함수
  var normalFunction = function(x, y) {
      return x + y;
  }

  //화살표 함수
  var arrowFunction = (x, y) => x + y;
```
  2. this 값을 렉시컬 바인딩한다.
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
   3 화살표함수는 생성자로써 사용될 수 없다
```js
  var constructor = function(){
    console.log(this);
  };
  var o = new constructor(); // 결과값 : constructor {}

  var constructorArrowFunction = () => {console.log(this);}
  var o = new constructorArrowFunction();
  // 결과값 : Uncaught TypeError: constructorArrowFunction is not a constructor(…)
```
   4. 화살표 함수는 엄격모드("use strict")가 무시된다.
```js
  var strictFunction = function() {
    "use strict";
    console.log(this);
  }
  strictFunction(); // 결과값 : undefinde

  var strictArrowFunction = () => {
    "use strict";
    console.log(this);
  }
  strictArrowFunction(); // 결과값 : Window {...}

```
  5. call 또는 apply는 this에 아무런 영향이 없다

  6. 화살표 함수는 arguments 객체를 가지고 있지 않다
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
```
  7. yield키워드는 화살표 함수 본문에서 사용할 수 없으며 그로인해 화살표 함수는 생성기(generator)로써 사용할 수 없다
