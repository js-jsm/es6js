| 재필1 | 09 배열 | Array

# 배열

## Array.from(arrayLike|iterable[, mapFunc, context]) 메소드

유사 배열 혹은 반복가능한 객체로부터 새 Array 인스턴스를 만든다.  

- arrayLike : length 프로퍼티와 인덱스 처리된 엘리먼트를 지닌 객체.  
- iterable :  매 호출시마다 한 개의 엘리먼트를 인출할 수 있는 객체.  
- mapFunc : 배열의 모든 요소를 실행할 Map함수
- this : mapFunc 실행시에 Execution Context를 지정할 수 있다.  

ES6에서 클래스 구문은 내장 클래스 및 사용자 정의 클래스의 서브 클래스화를 허용한다.
Array.from과 같은 클래스 정적 메소드는 Array가 아닌, Array의 서브 클래스를 상속받고 서브 클래스의 새 인스턴스를 만든다.

> *ES5에서는 Array.prototype.slice()를 사용했다.*  
> var arr1 = Array.prototype.slice.call(arguments); // ES5  
> const arr2 = Array.from(arguments); // ES6  

> 유사 배열 객체 : (length 속성과 인덱싱된 요소를 가진 객체)  
> 반복 가능한 객체 : (Map과 Set와 같이 객체의 요소를 얻을 수 있는 객체).


*예제*
```js

// String
Array.from("foo");
// ["f", "o", "o"]

// 화살표 함수를 이용한 mapping
Array.from([1, 2, 3], x => x + x);
// [2, 4, 6]

// 연속된 숫자배열 생성
Array.from({length: 5}, (v, k) => k);    
// [0, 1, 2, 3, 4]

// 배열과 비슷한 형태의 arguments를 배열로 변환
function f() {
  return Array.from(arguments);
}
f(1, 2, 3);
// [1, 2, 3]

// [iterable object]
// Set
var s = new Set(["foo", window]);
Array.from(s);   
// ["foo", window]

// Map
var m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m);
// [[1, 2], [2, 4], [4, 8]]  

// iterable한 값일 경우 spread operator를 사용해 배열로 변환 할 수 있다.
const arr1 = [...'abc']; // ["a", "b", "c"]
const arr2 = [...new Set().add('a').add('b')]; // ["a", "b"]
```

## Array.of(element0[, element1[, ...[, elementN]]]) 메소드

인자의 수나 유형에 관계없이 가변인자 (element0, element1,···)를 갖는 새 Array 인스턴스를 만든다.

- elementN : 배열을 생성하는 요소

배열 생성자함수 new Array()는 숫자형 값 하나만 넘길 경우 제대로 동작하지 않는 문제(정수를 넘기면 배열의 length값을 할당하고, 소수를 넘기면 오류를 발생시킴)가 있기 때문에,
배열을 생성할 때는 늘 배열 리터럴로 선언할 필요가 있다.

```js
Array.of(1);         // [1]
Array.of(1, 2, 3);   // [1, 2, 3]
Array.of(undefined); // [undefined]
```

Array의 서브클래스의 인스턴스에 값을 할당 할때 Array.of() 를 활용할 수 있다.

```js
class MyArray extends Array {
    // ...
}
console.log(MyArray.of(3, 11, 8) instanceof MyArray); // true
console.log(MyArray.of(3).length === 1); // true
```

## fill(value[, startIndex, endIndex]) 메소드

startIndex부터 endIndex까지(endIndex 포함하지 않음) 주어진 값(value)으로 배열 원소를 채운다.
startIndex, endIndex 가 없을때 배열 전체를 채운다.

 - value : 배열을 채우기 위한 값
 - startIndex : 시작 인덱스
 - endIndex : 끝 인덱스

```js
[1, 2, 3].fill(4)               // [4, 4, 4]
[1, 2, 3].fill(4, 1)            // [1, 4, 4]
[1, 2, 3].fill(4, 1, 2)         // [1, 4, 3]
[1, 2, 3].fill(4, 1, 4)         // [1, 4, 4]
[1, 2, 3].fill(4, 1, 1)         // [1, 2, 3]
[1, 2, 3].fill(4, -3, -2)       // [4, 2, 3]
[1, 2, 3].fill(4, NaN, NaN)     // [1, 2, 3]
[].fill.call({ length: 3 }, 4)  // {0: 4, 1: 4, 2: 4, length: 3}
```

## find(testingFunc[, thisArg]) 메소드

테스트 함수를 만족하는 배열 원소를 반환하며, 만족하는 값이 없을때 undefined를 반환.

- testingFunc : 배열의 각 값에 대해서 실행시킬 함수. 아래와 같은 인자를 받습니다:
    - element : 콜백함수 안에서 현재 프로세스가 될 요소.
    - index : 콜백함수 안에서 현재 프로세스가 될 요소의 인덱스.
    - array : find 함수의 대상이 되는 배열.
- thisArg : 선택적. 콜백이 호출될 때 this로 사용될 객체.

```js
let x = 12;
let arr = [11, 12, 13];
let result = arr.find( function(value, index, array){
    if( value == this ) {
        return true;
    }
}, x);
console.log(result); // 12

var inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
];

function findCherries(fruit) {
    return fruit.name === 'cherries';
}

console.log(inventory.find(findCherries)); // { name: 'cherries', quantity: 5 }

```

## findIndex(testingFunc[, thisArg]) 메소드

조건에 맞는 배열의 인텍스를 반환, 만족하는 값이 없을때 -1  반환.

- testingFunc : 배열의 각 값에 대해서 실행시킬 함수. 아래와 같은 인자를 받습니다:
    - element : 콜백함수 안에서 현재 프로세스가 될 요소.
    - index : 콜백함수 안에서 현재 프로세스가 될 요소의 인덱스.
    - array : find 함수의 대상이 되는 배열.
- thisArg : 선택적. 콜백이 호출될 때 this로 사용될 객체.

```js

let x = 12;
let arr = [11, 12, 13];
let result = arr.findIndex( function(value, index, array){
    if( value == this ) {
        return true;
    }
}, x);
console.log(result); // 1

// findIndex는 NaN을 찾을 수 있다.
const arr2 = ['a', NaN];
arr2.indexOf(NaN); // -1
arr2.findIndex(x => Number.isNaN(x)); // 1

// 새로생긴 Number.isNaN()은 NaN을 더 안전하게 판단 할 수 있다.
isNaN('abc'); // true;
Number.isNaN('abc') // false
```

## copyWithin(targetIndex[, startIndex, endIndex]) 메소드

배열값 무리를 다른 위치에 복사해 넣는다. 기존 자리의 값은 삭제 된다.
배열 내 요소 startIndex부터 endIndex 만큼의 요소들을 복사하여 targetIndex 부터 차례로 치환한다.
범위를 초과할 경우에는 가능한 영역(끝)까지만 치환한다

 - targetIndex : 복사한 원소가 들어갈 위치의 인덱스,
 - startIndex : 복사를 시작할 인덱스,
 - endIndex : 복사가 끝나는 인덱스(전 까지)

```js
[1, 2, 3, 4, 5].copyWithin(-2);
// [1, 2, 3, 1, 2]

[1, 2, 3, 4, 5].copyWithin(0, 2, 5);
// [3, 4, 5, 4, 5]

[1, 2, 3, 4, 5].copyWithin(0, 3, 4);
// [4, 2, 3, 4, 5]

[1, 2, 3, 4, 5].copyWithin(-2, -3, -1);
// [1, 2, 3, 3, 4]

// 유사배열 객체
[].copyWithin.call({length: 5, 3: 1}, 0, 3);
// {0: 1, 3: 1, length: 5}

// // 서브클래스로 만들어진 ES6 Typed Arrays
// var i32a = new Int32Array([1, 2, 3, 4, 5]);
//
// i32a.copyWithin(0, 2);
// // Int32Array [3, 4, 5, 4, 5]
//
// [].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// // Int32Array [4, 2, 3, 4, 5]
```

## entries() 메소드

배열 각 인덱스의 키/값 쌍을 가진 배열형태의 이터러블 객체를 반환

```js
var arr = ['a', 'b', 'c'];
var eArr = arr.entries();

console.log(eArr.next().value); // [0, 'a']
console.log(eArr.next().value); // [1, 'b']
console.log(eArr.next().value); // [2, 'c']

// for of 를 사용해도 동일한 결과를 얻을 수 있다.
// (http://hacks.mozilla.or.kr/2015/08/es6-in-depth-iterators-and-the-for-of-loop/)
var arr = ['a', 'b', 'c'];
var eArr = arr.entries();

for (let e of eArr) {
  console.log(e);
}

```

## keys() 메소드

각 인덱스 키를 담은 이터러블 객체를 반환

```js
var arr = ["a", "b", "c"];
var iterator = arr.keys();

console.log(iterator.next()); // { value: 0, done: false }
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// keys()는 빈 값을 무시하지 않는다.
var arr = ["a", , "c"];
var sparseKeys = Object.keys(arr);
var denseKeys = [...arr.keys()];
console.log(sparseKeys); // ['0', '2']
console.log(denseKeys);  // [0, 1, 2]
```

## values() 메소드

값을 포한한 이터러블 객체를 반환

```js

var arr = ['w', 'y', 'k', 'o', 'p'];
var eArr = arr.values();

// 이터러블 객체에 for of 사용.
for (let letter of eArr) {
  console.log(letter);
}

// next() 사용.
var arr = ['w', 'y', 'k', 'o', 'p'];
var eArr = arr.values();
console.log(eArr.next().value); // w
console.log(eArr.next().value); // y
console.log(eArr.next().value); // k
console.log(eArr.next().value); // o
console.log(eArr.next().value); // p
```

## es5 vs es6 배열 방법 차이. 변경사항..
...
