# CH 3. 다중 변수 및 인자 제어

## 3-3. Spread Operator 펼치기 연산자

이터러블 개체에 접두사 `...`(펼치기 연산자. 이하 SO라 함)를을 붙이면 개체 내부의 값을 하나하나 분리하여 적용한 것과 동일한 효과를 보인다.

> 보통은 '이터러블 객체'라고 칭하지만, 데이터 타입으로서의 '객체(리터럴 Object)'와의 구분을 위해 '이터러블 개체'라고 명명한다.

> 여기서 이터러블(iterable) 개체란 그 내부에 여러 원소를 지니며 개별 원소들을 순회할 수 있는 데이터를 의미한다. 자바스크립트에서는 원소들에 인덱스로 접근할 수 있는 배열이나 문자열 등이 이터러블 개체에 속한다.


### 3-3-1. 신/구 비교

```js
// ES5
var birds = ['eagle', 'pigeon'];
var mammals = ['rabbit', 'cat'];
var animals = birds.concat('whale').concat(mammals);
console.log(animals);  // ['eagle', 'pigeon', 'whale', 'rabbit', 'cat']
```

```js
// ES2015
let birds = ['eagle', 'pigeon'];
let mammals = ['rabbit', 'cat'];
let animals = [...birds, 'whale', ...mammals];
console.log(animals);  // ['eagle', 'pigeon', 'whale', 'rabbit', 'cat']
```


### 3-3-2. Details

#### 1) SO를 이용하면 배열의 각 인자를 적용한 것과 동일한 효과를 얻을 수 있다.

```js
let values = [20, 10, 30, 50, 40];
console.log(...values);  // 20 10 30 50 40

console.log(Math.max.apply([], values));   // 50
console.log(Math.max(...values));          // 50
```

원래 apply나 call 메서드의 첫 번째 매개변수는 this를 바인딩할 대상이다. 위 예에서는 그 대상을 빈 배열로 지정했으나, 사실은 values의 각 요소들 중 최대값을 얻을 수 있기만 하면 될 뿐 this의 바인딩이 필요할 이유는 전혀 없으므로 저 위치에 어떤 형태가 오더라도 아무런 상관이 없다 _(심지어 undefined를 넣어도 동작한다)_. 즉 apply나 call을 활용하는 방법은 본래의 용도와 다른 사용으로 혼란을 야기할 것임에도 불구하고 그 편리함 때문에 부득이 널리 활용되던 방식이었으나, 이제는 그럴 필요가 없게 된 것이다.


#### 2) SO와 다른 여러 인자들을 함께 사용할 수도 있다.

```js
let values = [3, 4, 5, 6, 7, 8];

let sum = function(...arg){
  let result = 0;
  for(let i = 0; i < arg.length ; i++){
    result += arg[i];
  }
  return result;
};

console.log(1, 2, ...values, 9, 10);       // 1 2 3 4 5 6 7 8 9 10
console.log(sum(1, 2, ...values, 9, 10));  // 55
```


#### 3) 문자열에 SO를 적용할 경우 빈문자열을 적용한 split 메서드를 완전히 대체한다.

```js
let str = 'Hello!';
let splitArr = str.split('');   // ["H", "e", "l", "l", "o", "!"]
let restArr = [...str];         // ["H", "e", "l", "l", "o", "!"]
```

#### 4) SO는 push, unshift, concat 등의 기능을 대체할 수 있다.

```js
let originalArray = [2, 3];
let priorArray    = [-2, -1];
let afterArray    = [6, 7];
let resultArray   = [];

originalArray.unshift(1);    // [1, 2, 3]
originalArray.push(4);       // [1, 2, 3, 4]
originalArray = [0, ...originalArray, 5]  // [0, 1, 2, 3, 4, 5]

resultArray = priorArray.concat(originalArray, afterArray);
  // [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7]
resultArray = [...priorArray, ...originalArray, ...afterArray];
  // [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7]
```

#### 5) RP는 `얕은 복사`를 수행한다.

RP를 이용한 방법은 어디까지나 '새로운 배열'을 만들어 같은 변수에 재할당하는 것이다. 따라서 기존의 배열에 내용을 추가하는 메서드들과 완전히 동일하다고 볼 수는 없다.

```js
let originalArray = [1, 2];
let copiedArray = [...originalArray];
console.log(originalArray === copiedArray);    // false

originalArray.push(3);
console.log(originalArray);   // [1, 2, 3]
console.log(copiedArray);     // [1, 2]
```

#### 6) 깊은복사는 이뤄지지 않으므로, 하위의 요소들은 여전히 참조상태를 유지한다.

```js
let originalArray = [{
  first: "Hello,",
  second: "World!"
}];
let copiedArray = [...originalArray];
console.log(originalArray[0].first);    // "Hello,"

copiedArray[0].first = "Hi,";
console.log(originalArray[0].first);    // "Hi,"
```
