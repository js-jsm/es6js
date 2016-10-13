# CH 3. 다중 변수 및 인자 제어

## 3-4. Destructuring Assignment 해체 할당

해체할당은 객체나 배열의 값들을 전부 해체하여 필요로 하는 값들만 축출, 새로운 변수에 할당하는 표현식이다. ES6에 새롭게 추가된 기능들 중에서도 가장 활용도가 높은 기능 중 하나이다.

### 3-4-1. 배열 해체 할당

명칭은 '배열' 해체할당이지만, 이터러블하기만 하면 어떤 객체이든 동일한 방법으로 해체할 수 있다.

#### 1) 기본 사용법

ES5 이하에서는 배열에 할당되어 있던 값들을 추출하여 새로운 변수에 할당하기 위해서는 다음과 같이 했었다.

```js
var arr = [ 5, 6, 7 ];
var a = arr[0];
var b = arr[1];
var c = arr[2];
```

ES6에서는 위의 세 줄을 단 한 줄로 표현할 수 있다.

```js
const arr = [ 5, 6, 7 ];
const [ a, b, c ] = arr;
```

위 구문은 우변의 arr을 해체하여 좌변의 같은 인덱스값을 가진 변수에 각각 할당한다. 즉 `const a = 5, b = 6, c = 7` 이 되는 것이다.


#### 2) 발췌 할당

필요한 인스턴스만 발췌하여 할당할 수도 있다. 인덱스가 매칭된다는 사실을 염두에 두고 다음 예제들을 살펴보자.

```js
const [ a ,  , b ] = [ 1, 2, 3 ];    // a = 1, b = 3
const [ a, b ] = [ 1, 2, 3 ];        // a = 1, b = 2
const [ a, b, c, d ] = [ 1, 2, 3 ];  // a = 1, b = 2, c = 3, d = undefined
```


#### 3) rest parameter와의 연동

좌변 내에 rest parameter를 조합하면 간단한 mapping도 가능하다.

```js
const [ a, ...b ] = [ 1, 2, 3, 4 ];     // a = 1, b = [ 2, 3, 4 ]
const [ , , ...a ] = [ 1, 2, 3, 4, 5];  // a = [ 3, 4, 5]
```


#### 4) default parameter와의 연동

좌변 내에 default parameter를 조합할 경우에는 어떻게 되는지 살펴보자.

```js
const [a = 10] = [undefined];             // a = 10
const [a, b = a * 2] = [5, undefined];    // a = 5, b = 10
const [a = b, b] = [undefined, 10];       // ReferenceError: b is not defined
```


#### 5) 다차원 배열의 해체할당

다차원 배열 역시 좌변의 형태를 우변과 동일하게 맞춰놓으면 해체할당이 가능하다.

```js
const [a, [b, [ , c], ], d] = [1, [2, [3, 4], 5], 6];
  // a = 1, b = 2, c = 4, d = 6
```

#### 6) 서로 바꾸기

기존에는 변수끼리 값을 교환하기 위해서는 임시변수가 하나 더 필요했다.

```js
var a = 1, b = 2;
var c = a;
a = b;
b = c;
console.log(a, b);    // 2 1
```

해체할당을 이용하면 임시변수 과정을 생략하고 즉시 교환할 수 있다.

```js
let [a, b] = [1, 2];
[b, a] = [a, b];
console.log(a, b);   // 2 1
```


### 3-4-2. 객체 해체 할당

객체의 경우 프로퍼티를 지정하여 새로 지정할 변수를 할당하는 식으로 해체할당이 이루어진다. 그외의 동작은 배열과 동일하나, 초반에는 `:`의 좌우측에 어떤 값이 와야 하는지가 헷갈리기 쉬우므로 주의를 요한다. 일단 예제를 살펴보자.

ES5 까지는 각 프로퍼티 값들을 새로운 변수들에 할당하기 위해 다음과 같은 방법을 써야 했다.

```js
var iu = {
    name : '아이유',
    age : 23,
    gender : 'female'
};
var n = iu.name,
    a = iu.age,
    g = iu.gender;
```

ES6에서는 이를 다음과 같이 한 줄에 적용할 수 있다.

```js
const { name: n, age: a, gender: g } = iu;  // n = '아이유', a = 23, g = 'female'
```

프로퍼티 키를 그대로 변수로 추출할 경우에는 더욱 간단해진다.

```js
const { name, age, gender } = iu;  // name = '아이유', age = 23, gender = 'female'
```


#### 1) `{ [할당할 프로퍼티명] : [새로 선언할 변수명] }`

#### 2) 변수명을 생략할 경우 프로퍼티명과 동일한 이름의 변수가 생성된다.

#### 3) 프로퍼티를 지정하지 않은 경우는 할당 없이 건너뛴다.

즉, 관심있는 프로퍼티만 언급하면 언급한 프로퍼티들에 대해서만 변수가 생성되며 나머지는 무시된다.

```js
const { name, gender } = iu;    // name = '아이유', gender = 'female'
```

#### 4) default parameter와의 연동

```js
const phone = {
    name : 'iphone',
    color : undefined
};

const {
    name : n,
    version : v = '3gs',
    color : co = 'silver'
} = phone;    // n = 'iphone', v = '3gs', co = 'silver'

const {
    name,
    version = '6s',
    color = 'white'
} = phone;    // name = 'iphone', version = '6s', color = 'white'
```

#### 5) 중첩 객체의 해체할당

중첩객체도 원본객체와 동일한 구조로 표현하면 간단히 해체 및 할당을 할 수 있다.
주의할 점은, 하위 객체를 해체할 경우 그 상위의 프로퍼티는 값이 할당되지 않는다는 점이다.
따라서 다음 예의 'albums' 변수는 선언되지도, 값이 할당되지도 않았다.

```js
const iu = {
  name : '아이유',
  albums: {
    'regular' : ['Growing up', 'Last Fantasy', 'Modern Times'],
    'irregular': {
        'Real' : 2013,
        '꽃갈피' : 2015,
        'CHAT_SHIRE' : 2016
    }
  }
};

const {
  name,
  albums : {
    regular,
    irregular: {
        '꽃갈피' : flower
    }
  }
} = iu;

console.log(name, regular, flower);
  // '아이유'  ['Growing up', 'Last Fantasy', 'Modern Times']  2015

console.log(albums);    // ReferenceError: albums is not defined
```


### 3-4-3. 사용예

#### 1) 서버에서 넘겨받은 json 데이터에서 원하는 데이터들만 바로 추출

```js
const deliveryProduct = {
  orderedDate: '2016-04-15',
  estimatedDate: '2016-04-17',
  status: '배송중',
  items: [
    {name: '사과', price: 1000, quantity: 3},
    {name: '배', price: 1500, quantity: 4}
  ]
};

const {
    estimatedDate: esti,
    status,
    items: [...products]
} = deliveryProduct;

console.log(esti, status);    // 2016-04-17 배송중
products.forEach(({name, price, quantity}) => {
    console.log(name, price * quantity);
})
// 사과 3000
// 배 6000
```

위 예제는 임의의 mock데이터를 구성하여 바로 해체할당하였지만, ajax 호출 등으로 서버와 연동하여 전송받은 데이터의 경우에도 위와 같은 형식으로 손쉽게 원하는 데이터만 추출할 수 있을 것이다.

#### 2) 객체를 리턴하는 함수의 결과값 활용

```js
const getUrlParts = (url) =>
  /^(https?):\/\/(abc\.com)(\/es6\/([a-z0-9-\-.,]+))$/.exec(url);
const parts = getUrlParts('http://abc.com/es6/7-1.destructuring');
const [ , protocol, host, , title] = parts;
console.log(protocol, host, title);  // http  abc.com   7-1.destructuring
```

#### 3) 함수 내부에서의 활용

```js
const getArea = (info) => {
  const {width, height} = info;
  return width * height;
};
console.log(getArea({width: 10, height: 50}));    // 500
```

#### 4) 함수의 매개변수 정의 과정에서 해체할당

```js
const getArea = ({width, height}) => width * height;
console.log(getArea({width: 10, height: 50}));    // 500

const getRange = ({min=1, max=10}) => Math.abs(max - min);
console.log(getRange({}));         // 9
console.log(getRange({max: 20}));  // 19
console.log(getRange({min: 3}));   // 7
```
