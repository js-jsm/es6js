CH 06 콜렉션
============
#6-1. Map
>Map 객체는 key/value를 모아놓은 콜렉션으로 키/값의 타입은 제약이 없다.<br>
>삽입한 순서대로 정렬되며 맵 객체는 Map 생성자로 만든다.

##6-1-1. 기본 동작들
* new Map()을 이용해서 map을 생성
* map.set(key,value)는 map 에 지정한 키에 지정한 값을 추가합니다.<br> 
이미 키가 존재한다면 해당 키에 값을 업데이트하고, 존재하지 않는다면 새로운 엔트리를 생성한다.(obj[key] = value)<br> 이 메소드는 this를 리턴하므로, 메소드 체이닝이 가능하다.
* map.get(key)를 사용해서 해당 key와 연관된(associated) value 를 리턴합니다.<br> 만약 그런 엔트리가 존재하지 않을 경우 undefined 를 리턴합니다 (obj[key] 구문처럼).
* map.has(key)를 사용해서 해당 key가 map에 있는지 확인
* map.delete(key)를 사용해서 엔트리를 삭제합니다. (delete obj[key] 구문처럼)
* map.clear()는 map 안의 모든 엔트리들을 제거합니다.
* map.size를 사용하여 map에 있는 엔트리 수를 확인
* map.keys()와 map.value()는 각각 map의 모든 key와 value를 반환
* map[ Symbol.iterator ]() 구문은 map 안의 엔트리들을 순회할 수 있는 이터레이터를 리턴합니다.<br> 해당 이터레이터는 엔트리 항목 각각을 [key, value] 배열로 표현합니다.
* forEach() 메소드나 for..of loop 를 사용하여 map의 엔트리를 순회



####데이터 세팅

```js
let map = new Map();
map.set(new Date(), function today () {});
map.set(() => 'key', { pony: 'foo' });
map.set(Symbol('items'), [1, 2]);
```

[['key', 'value'], ['key', 'value']] 형태의 collection이나 iterable protocol은<br>
 Map의 생성자를 통해서 쉽게 map으로 변형할 수 있다.

```js
let map = new Map([
  [new Date(), function today () {}],
  [() => 'key', { pony: 'foo' }],
  [Symbol('items'), [1, 2]]
]);
```

Map의 생성자는 내부적으로 아래와 같이 동작한다. forEach를 이용해서 key/value쌍을 하나씩 map에 할당해주고 있다

```js
let items = [
  [new Date(), function today () {}],
  [() => 'key', { pony: 'foo' }],
  [Symbol('items'), [1, 2]]
]
let map = new Map();
items.forEach(([key, value]) => map.set(key, value));
```

#### 키
어떤 값이든 키가 될 수 있다.

```js
const map = new Map();

const KEY1 = {};
map.set(KEY1, 'hello');
console.log(map.get(KEY1));     // hello

const KEY2 = {};
map.set(KEY2, 'world');
console.log(map.get(KEY2));     // world
```

```js
new Map().get('asfddfsasadf')
//undefined
```


동일한 key에 값을 넣으면 이전의 값을 덮어쓰게 된다.

```js
let map = new Map()
map.set('a', 'a')
map.set('a', 'b')
map.set('a', 'c')
console.log([...map])
// <- [['a', 'c']]
```


ES6 Map에서 NaN은 corner-case가 된다. key로 사용될 때는 동일하게 인식된다.

```js
console.log(NaN === NaN)
// <- false
let map = new Map()
map.set(NaN, 'foo')
map.set(NaN, 'bar')
console.log([...map])
// <- [[NaN, 'bar']]

map.set(NaN, 123);
map.get(NaN);           // 123
```

```js
let map = new Map([[NaN, 1], [Symbol(), 2], ['foo', 'bar']])
console.log(map.has(NaN))
// <- true, NaN은 key로 사용 가능하다
console.log(map.has(Symbol()))
// <- false, Symbol 값은 항상 다르기 때문에 key로는 사용 할 수 없고, value로만 사용해야 한다.
console.log(map.has('foo'))
// <- true
console.log(map.has('bar'))
// <- false
```

####단일 엔트리에 대한 제어

```js
  const map = new Map();
  map.set('foo', 123);
  map.get('foo');         // 123
  map.has('foo');         // true
  map.delete('foo');      // true
  map.has('foo');         // false
```

####맵의 사이즈 결정 및 맵의 내용 제거

```js
const map = new Map();
map.set('foo', true);
map.set('bar', false);
map.size                // 2
map.clear();
map.size                // 0
```

####spread operator도 사용할 수 있다.

```js
let map = new Map();
map.set('p', 'o');
map.set('n', 'y');
map.set('f', 'o');
map.set('o', '!');
console.log([...map]);
// <- [['p', 'o'], ['n', 'y'], ['f', 'o'], ['o', '!']]
```

####for of 루프를 사용하여 map을 순회

```js
let map = new Map();
map.set('p', 'o');
map.set('n', 'y');
map.set('f', 'o');
map.set('o', '!');
for (let [key, value] of map) {
  console.log(key, value)
}
```
