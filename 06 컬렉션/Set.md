# 6-3. Set
Set이란? <br>
>`Set`객체는 어떤 형(원시 값이든 객체 참조든)이든 유일한 값을 저장할 수 있고 <br>
>중복을 허용하지 않는 순서가 보장된 값들의 집합이다.
<br>

## 6-3-1. syntax

```js
new Set([iterable]);
```

## 6-3-2. API
### 속성

`Set.length`<br>
length 속성값은 0.<br><br>
`get Set[@@species]`<br>
파생(된) 객체를 만들기 위해 사용된 생성자 함수.<br><br>
`Set.prototype`<br>
Set 생성자에 대한 프로토타입을 나타냅니다. 모든 Set 객체에 속성을 추가할 수 있습니다.<br>

**Set 인스턴스 속성**

`Set.prototype.constructor`<br>
인스턴스의 프로토타입을 만든 함수를 반환합니다. 이는 기본으로 Set 함수입니다.<br><br>
`Set.prototype.size`<br>
Set 객체 내 값의 개수를 반환합니다.

**메서드**

**`Set.prototype.add(value)`**<br>
Set 객체에 주어진 값을 갖는 새로운 요소를 추가하고 Set 객체를 반환합니다. 그리고 add 메소드 체이닝이 가능하며 <br>
같은 value를 두번 포함 시킬 수 없습니다. <br>
set 안에 이미 존재하는 값을 한번 더 추가하려고 시도하면 아무 일도 일어나지 않고 변하지 않은 Set객체를 반환합니다.<br><br>
**`Set.prototype.clear()`**
Set 객체에서 모든 요소를 제거합니다.<br>
```js
> const set = new Set();
> set.add('red')
> set.add('green')

> set.add('yellow').add('blue')

> set.size
4

> set.add('yellow')
> set.clear()
> set.size
0
```
<br>
**`Set.prototype.delete(value)`**<br>
value와 관련된 요소를 제거합니다.<br>
그리고 Set.prototype.has(value)가 이전에 반환했던 값을 반환합니다. <br>
```js
> const set = new Set();
> set.add('red')

> set.has('red')
true
> set.delete('red')
true
> set.has('red')
false
```
<br>
**`Set.prototype.has(value)`**<br>
Set 객체 내 주어진 값을 갖는 요소가 있는지를 나타내는 boolean을 반환합니다.<br><br>

```js
var mySet = new Set();

mySet.add(1);
mySet.add(5);
mySet.add("some text");
var o = {a: 1, b: 2};
mySet.add(o);

mySet.has(1); // true
mySet.has(3); // false, 3은 set에 추가되지 않았음
mySet.has(5);              // true
mySet.has(Math.sqrt(25));  // (제곱근 값인 5) true 
mySet.has("Some Text".toLowerCase()); // true
mySet.has(o); // true

mySet.size; // 4

mySet.delete(5); // (set에서 5를 제거함) true
mySet.has(5);    // (5가 제거되었음) false

mySet.size; // 3, 방금 값을 하나 제거했음
```
<br><br>
set.keys(), set.values(), set.entries() 구문은 다양한 이터레이터들을 리턴합니다.<br><br>
**`Set.prototype.keys()`**<br>
values() 함수와 같은 함수로 삽입 순으로 Set 객체 내 각 요소에 대한 값을 포함하는 새로운 Iterator 객체를 반환합니다.<br><br>
**`Set.prototype.values()`**<br>
삽입 순으로 Set 객체 내 각 요소에 대한 값을 포함하는 새로운 Iterator 객체를 반환합니다.<br><br>
**`Set.prototype[@@iterator]()`**<br>
삽입 순으로 Set 객체 내 각 요소에 대한 값을 포함하는 새로운 Iterator 객체를 반환합니다. `[Symbol.iterator]`<br><br>
**`Set.prototype.entries()`**<br>
삽입 순으로 Set 객체 내 각 값에 대한 [value, value] 배열을 포함하는 새로운 Iterator 객체를 반환합니다. <br>
이는 Map 객체와 유사한 형태이며 여기서 각 항목의 key와 value는 같은 값을 갖습니다.<br>
그래서 `entris()`메소드를 이용하여 Set을 Map객체로 변환 가능합니다.
```js
var mySet = new Set([1,"some text"]);

// set 내 항목에 대해 반복
// 순서대로 항목을 (콘솔에) 기록: 1, "some text"
for (let item of mySet) console.log(item);

// 순서대로 항목을 기록: 1, "some text"
for (let item of mySet.keys()) console.log(item);

// 순서대로 항목을 기록: 1, "some text"
for (let item of mySet.values()) console.log(item);

// 순서대로 항목을 기록: 1, "some text"
// (여기서 key와 value는 같음)
for (let [key, value] of mySet.entries()) console.log(key);


/**
* Set.prototype.entries() : Iterable<[any,any]>
*/

const set = new Set(['a', 'b', 'c']);
const map = new Map(set.entries());
// Map { 'a' => 'a', 'b' => 'b', 'c' => 'c' }
```
<br>
**`Set.prototype.forEach(callbackFn[, thisArg])`**<br>
삽입 순으로 Set 객체 내에 있는 각 값에 대해 한 번 callback을 호출합니다. thisArg는 callback을 실행할 때 this로서 사용하는 값이고 선택사항입니다.<br><br>

## 6-3-3 Array 객체와의 관계
Set은 배열과 유사하게 사용됩니다. 실제, Set과 배열은 상호 변환이 가능합니다. <br>
Set은 배열을 생성자로 받을 수 있고, 배열은 Set으로 부터 생성될 수 있습니다. <br>
그리고 배열을 Set으로 전환하고 다시 배열로 전환할 때, 배열에서 중복된 요소를 제거하는 효과를 가져옵니다.
통상, 배열을 특정요소의 집합으로 많이 사용하였으나 Set은 몇가지 이점을 제공합니다.<br>

- 중복이 허용되지 않는 경우 배열보다 Set을 사용하는것이 편리합니다.
- 배열에서는 splice를 사용해 값을 잘라내야하는 반면, Set은 요소의 값으로 삭제하는 기능을 제공합니다.
- (indexOf 메소드로 값을 확인하는것 보다 has 가 더 빠르다. 또한, NaN는 배열에서 indexOf로 찾을 수 없다.)

```js
var myArray = ["value1", "value2", "value3"];

// Array를 Set으로 변환
var mySet = new Set(myArray);

// 해체연산자를 사용하여 Set을 Array로 변환
console.log([...mySet]); // myArray와 정확히 같은 배열을 보여줌

const arr = [3, 5, 2, 2, 5, 5];
const unique = [...new Set(arr)]; // [3, 5, 2] 중복제거

```
<br>
## 6-3-4 맵핑과 필터링
### Mapping & Filtering
배열과 달리, Set에는 map()과 filter() 메서드가 없습니다. 대신 배열로 전환하고 다시 되돌려 쓰는 대체안이 있습니다.<br>
**Mapping**
```js
let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// Resulting Set: {2, 4, 6}
```
**Filtering**
```js
let set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) == 0));
// Resulting Set: {2, 4}
```
<br>
### Union, intersection, difference
Set에는 합집합(예: addAll), 교집합(예: retainAll), 차집합(예: removeAll)과 같은 연산을 수행하는 메소드가 없습니다. 대신 이 같은 한계를 우회하는 방법을 설명합니다.<br>
**합집합**
```js
const a = new Set([1,2,3]);
const b = new Set([4,3,2]);
const union = new Set([...a, ...b]);
// Resulting Set: {1,2,3,4}
```
**교집합**
```js
const a = new Set([1,2,3]);
const b = new Set([4,3,2]);
const intersection = new Set(
[...a].filter(x => b.has(x)));
// Resulting Set: {2,3}
```
**차집합**
```js
const a = new Set([1,2,3]);
const b = new Set([4,3,2]);
const difference = new Set(
[...a].filter(x => !b.has(x)));
// Resulting Set: {1}
```
