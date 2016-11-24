# OverView

### [블로그에서보기](https://bcnam.github.io/bcnam.github.io/2016/11/17/2016-11-17-ES6-Iterable-and-Iterator/)

JavaScript 외에 Java 나 C# , C++를 사용해본 경험이 있다면

`iterator`, `iteration`, `iterator pattern` 같은 단어들을 들어보거나

사용 또는 구현한 경험이 있을것이다.

ES6 에서 `iteration protocols`이 추가 되었는데

protocol 는 iterable 과 iterator 를 각각 정의하고 있다.

오늘 포스팅할 주제는 `iterable` 과 `iterator` 그리고 `for..of loop` 이다.

각각의 개념들을 알아보기에 앞서 필자가 이해하고 있는 iterator 의 개념을 정리해보면 다음과 같다.

- iterator 는 사전적의미에 명사로 반복자 라는 뜻을 가지고 있다.

- iterator 는 내부 구현에 대한 이해 없이 자료의 집합체를 탐색할수 있게 해준다.

- iterator 는 한번에 하나씩 값을 탐색 한다.

모질라 문서를 통해 iterable 과 iterator 가 iteration 에 속한 규약(protocol) 이란것을 알기전에

대부분의 ES6 포스팅글에서 iterable and iterator 를 함께 쓰는이유가 궁금했다.

둘에 차이는 무엇일까?

나와같은 궁금증을 가진 사람이 질문글을 올렸었고 답변은 다음과 같다.

>
>An iterable is a data structure that wants to make its elements accessible to the public. It does so by implementing a method >whose key is Symbol.iterator. That method is a factory for iterators.
> - iterable 은 자료구조이고 `Symbol.iterator` 를 `key`로 사용해서 메서드를 구현 하면 된다. 이 메서드는 반복자들을 생산하는 메서드이다.
>
>An iterator is a pointer for traversing the elements of a data structure (think cursors in databases).
> - iterator 는 자료구조에 있는 요소를 탐색하기 위한 포인터 이다.
>

`Iterable` 에 **factory for iterators** 대한 해석이 매끄럽지 않을수 있다.

직역하자면 반복자들의 공장 인데 공장은 원료나 재료등을 가공하여 물건을 생산하는곳을 말한다.

다음 코드를 보자.
```js
let iterable = ['a', 'b', 'c'];
let iterator = iterable[Symbol.iterator]();
iterator.next(); // Object{value: "a", done: false}
iterator.next(); // Object{value: "b", done: false}
iterator.next(); // Object{value: "c", done: false}
iterator.next(); // Object{value: undefined, done: true}
```

코드에서 `iterable` 은 a,b,c 란 값을 담고 있는 배열이다.

이배열에 `key`값을 `Symbol.iterator` 로 정의 해서 `iterator` 란 변수에 담았다.

`iterator.next()` 를 통해 값을 하나씩 가져오고 있다.

다시 공장 이야기로 돌아가면 `iterable` 에 들어있는 배열에 값들은 가공될 재료이고

`iterator.next()` 를 통해 물건을 생산해내고 있다.

그래서 반복자들을 생산한다는 의역을 하게된것이다.

이글을 보시는분들중에 더 낳은 표현이 있다면 참언해 주시길 바란다.

둘에 개념을 대략적으로 살펴 봤으니 `Iterable Protocol` 부터

자세히 살펴 보고자 한다.


# Iterable Protocol
> iterable protocol은 iteration 동작을 정의하거나 사용자 정의하는것을 허용한다.
> - ex) for..of 구조에서 어떠한 value 들이 반복되는지에 관한것

`Array, Map, Set, String`은 기본적으로 `Iterable Interface`가 내장되어 있다.

```js
//Array
let iterable = [1, 2, 3];
for (let iterator of iterable) {
  console.log(iterator) //1, 2, 3
}
//Map
let iterable2 = new Map([['a','4'], ['b','5'], ['c','6']]);
for (let [key, value] of iterable2) {
  console.log(`key : ${key} value : ${value}`) // key : a value : 4 ...
}
// Set
let iterable3 = new Set([7, 8, 9]);
for (let iterator of iterable3) {
  console.log(iterator) //7, 8, 9
}
// String
let iterable4 = '789'
for (let iterator of iterable4) {
  console.log(iterator) //7, 8, 9
}
```

이와 같이 `Iterable Interface`가 내장되어 있는 데이터 소스들이 있는 반면에

**Object** 는 `iteration`*이 정의되어 있지 않다*.

**Object** 는 사용자 정의를 통해 `iteration` 을 정의 할수 있다.

```js
let obj = {
  0 : 'a',
  1 : 'b',
  2 : 'c',
  length: 3,
  [Symbol.iterator] : Array.prototype[Symbol.iterator]
}

for (let iterator of obj) {
  console.log(iterator); //a, b, c
}
```

# Iterator Protocol
---
`Iterator Protocol` 은 `Iterable Interface` 에서 **(유한,무한)** 반복 되는 값들의 순서를 만드는 표준방법을 정의한다.

 객체가 `next()` 메서드를 가지고 있고, 아래의 규칙에 따라 구현되어 있다면 그 객체는 `iterator` 이다.

- `next()` 메서드는 객체를 리턴하며 객체의 `properties` 는 다음과 같다.

  - **done** : `boolean` 타입으로 반복 작업이 끝나면 `true` 를 반환 된다.

  - **value** : 반복자에서 반환되는 값이며 모든 타입이 올수있다. done 값이 `true` 일 경우 생략 가능하다.

`Iterator Protocol` 을 기반으로 `Iterable Protocol` 에서 정의한 **obj(객체)** 를 구현해 보자.

```js
let obj = {
  0 : 'a',
  1 : 'b',
  2 : 'c',
  length: 3,
  [Symbol.iterator]() {
  let index = 0;
    return {
      next: () => {
        let value = this[index];
        let done = index >= this.length;
        index++;
        return { value, done };
      }
    }
  }
}

for (let iterator of obj) {
  console.log(iterator); //a, b, c
}
```

# for..of loop

지금까지 `Iteration Protocols` 인 `Iterable` 과 `Iterator` 를 알아 봤다.

작성된 예시코드에서 Array 또는 Map 등을 순회 할때 사용한 `for.. of` 는 ES6 에서 새로 추가된 문법이다.

자바스크립트에서 우리가 자주 접할수 있는 `for` 문법의 형태는 이렇게 생겼다.
```js
for (var index = 0; i < array.length; index++) {
  console.log(array[index]);
}
```

`ES5` 이후에는 `forEach` 메서드를 사용할수 있게 되었다.

```js
array.forEach(function(value) {
  console.log(value);
});
```

`for..in` 문법도 존재 한다 `for..in` 문법은 객체의 모든 프로퍼티를 순회한다.

그러나 이문법은 **객체의 키를 순회하는 용도로 사용** 하는것이 좋다.

이 문법의 모든 프로토타입 체인을 순회하기 때문인데 어떤 문제가 발생될수 있는지 코드를 보자.

```js
let array = [1,2,3];
//step 1
for (let index in array) {
    console.log(array[index]); //1,2,3
}
//step 2
Array.prototype.dangerously = () => {
    return 'Error is Comming';
}
//step 3
for (let index in array) {
    console.log(array[index]); //1,2,3, function () =>....
}
```

**step 1** :  아직까지 문제가 없는듯 하다.

**step 2** :  배열에 프로토타입 함수를 정의 한다.

**step 3** :  step2 에 정의한 함수까지 모두 출력된다.

이처럼 프로토 타입에 사용자 정의한 함수가 나올수 있는 문제가 있다.

그외에도 프로퍼티는 순서가 없기떄문에 어떤 순서로 반환될지 예측할수 없다.

심지어 브라우저 환경에 따라 반환되는 순서가 달라질수도 있다.

이러한 `for..in`이 가진 문제점이나 `for, forEach` 문법이 가진 단점을 보완하기 위해 나온것이 `for..of` 문법 이다.

`for..of`의 장점은 다음과 같다.

- 문법적으로 가장 간결하고 직접적이다.

- for...in이 가진 단점을 배제 한다.

- forEach 에서 지원하지 않는 **return , break, continue** 를 사용할수 있다.

`for...of` 는 배열을 순회하기 위한 구문이지만 DOM NodeList 같은 객체들을 순회하는 용도로 사용할수 있으며 문자열도 다룰수 있다

**Unicode**
```js
for (key of "☺☻☹") {
  console.log(key); //☺ ☻ ☹
}
```

**Map**
```js
let iterable = new Map([['a','1'], ['b','2'], ['c','3']]);
for (let [key, value] of iterable) {
  console.log(`key : ${key} value : ${value}`) // key : a value : 1 ...
}
```

`for...of` 는 **객체를 대상으로 동작하지 않는다**.

따라서 기존에 있던 `for..in` 문법이나 `Object.keys()` 를 사용하여 순회 하는 방식을 이용하면 된다.

## Reference

- [ MDN - iteration protocols](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols)

- [stackoverflow - iterable 과 iterator 의 차이](http://stackoverflow.com/questions/36874525/difference-between-iterator-and-iterable)

- [Exploring-ES6 - 이터러블과 이터레이터 (번역중단)](https://github.com/hwangtan/Exploring-ES6/tree/master/21%20이터러블과%20이터레이터)

- [jsrocks - iterable and iterators](http://jsrocks.org/2015/09/javascript-iterables-and-iterators/)
