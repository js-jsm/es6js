# CH 3. 다중 변수 및 인자 제어

## 3-1. 구문

### 3-1-1. 기본 구문

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

### 3-1-2. 고급 구문

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
