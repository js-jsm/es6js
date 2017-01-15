# 새로운 정규표현식 특징

## 개요

**y flag ( /y(sticky) flag )**

* 매체된 문자열의 인덱스를 lastIndex에 설정
* lastIndex 위치부터 매치 수행
* default : 0

```js
    const regTest = /cd/y
    let result = regTest.test('abcdef');
    console.log(result); // false

    regTest.lastIndex = 2;
    result = regTest.test('abcdef');
    console.log(result); // true
```

**u flag ( /u(unicode) flag )**

* 매치 대상을 유니코드로 인식

```js
    let result = /\u{1F4A9}/u.test('💩');
    console.log(result)    //true  
```
**The new data property flags**

* 새 데이터 속성 플래그를 사용하면 소스에서 이미 ES5의 패턴에 액세스 할 수있는 것처럼 일반 표현식의 플래그에 액세스 할 수 있습니다.

```js
    /abc/gi.source // ES5 'abc'
    /abc/gi.flags // ES6 'gi'
```

* 생성자 RegExp ()를 사용하여 정규 표현식의 복사본을 만들 수 있습니다.

```js
    new RegExp(/abc/ig).flags // 'gi'
    new RegExp(/abc/ig, 'i').flags // change flags 'i'
```
## y flag ( /y(sticky) flag )

Flags   | Start matching  | Anchored to   | Result if match | No match  | re.lastIndex
:---:   |:---:            |:---:          |:---:            |:---:      |:---:
exec()  |                 |               |                 |           |
  –     | 0               | –             | Match object    | null      | unchanged
 /g     | re.lastIndex    | –             | Match object    | null      | index after match
 /y     | re.lastIndex    | re.lastIndex  | Match object    | null      | index after match
 /gy    | re.lastIndex    | re.lastIndex  | Match object    | null      | index after match
test()  |                 |               |                 |           |
 (Any)  | (like exec())   | (like exec()) | true            | false     | (like exec())

> 문자열 메소드에서 str은 메소드가 호출되는 문자열이고, r은 정규 표현식 매개 변수입니다.

 Flags    | Start matching            | Anchored to       | Result if match     | No match  | r.lastIndex
 :---:    |:---:                      |:---:              |:---:                |:---:      |:---: 
search()  |                           |                   |                     |           |
 –, /g    | 0                         | –                 | Index of match      | -1        | unchanged
 /y, /gy  | 0                         | 0                 | Index of match      | -1        | unchanged
match() – | 0                         | –                 | Match object        | null      | unchanged
 /y       | r.lastIndex               | r.lastIndex       | Match object        | null      | index after match
 /g       | After prev. match (loop)  | –                 | Array with matches  | null      | 0
 /gy      | After prev. match (loop)  | After prev. match | Array with matches  | null      | 0
split()   |                           |                   |                     |           |
–, /g     | After prev. match (loop)  | – | Array with strings between matches  | [str]     | unchanged
 /y, /gy  | After prev. match (loop)  | After prev. match | Arr. w/ empty strings between matches | [str] | unchanged
replace() |                           |                   |                      |            |
 –        | 0                         | –                 | First match replaced | No repl.   | unchanged
 /y       | 0                         | 0                 | First match replaced | No repl.   | unchanged
 /g       | After prev. match (loop)  | –                 | All matches replaced | No repl.   | unchanged
 /gy      | After prev. match (loop)  | After prev. match | All matches replaced | No repl.   | unchanged

### RegExp.prototype.exec(str)
**default**
```js
const REGEX = /a/;

REGEX.lastIndex = 7; // ignored
const match = REGEX.exec('xaxa');
console.log(match.index); // 1
console.log(REGEX.lastIndex); // 7 (unchanged)
```

**/g**
```js
const REGEX = /a/g;

REGEX.lastIndex = 2;
const match = REGEX.exec('xaxa');
console.log(match.index); // 3
console.log(REGEX.lastIndex); // 4 (updated)

// No match at index 4 or later
console.log(REGEX.exec('xaxa')); // null
```

**/y or /gy**
```js
const REGEX = /a/y;

// No match at index 2
REGEX.lastIndex = 2;
console.log(REGEX.exec('xaxa')); // null

// Match at index 3
REGEX.lastIndex = 3;
const match = REGEX.exec('xaxa');
console.log(match.index); // 3
console.log(REGEX.lastIndex); // 4
```
### RegExp.prototype.test(str)
**exec() 와 기본동작은 같으며 리턴값이 다르다**
```js
const REGEX = /a/y;

REGEX.lastIndex = 2;
console.log(REGEX.test('xaxa')); // false

REGEX.lastIndex = 3;
console.log(REGEX.test('xaxa')); // true
console.log(REGEX.lastIndex); // 4
```
### String.prototype.search(regex)
**default or /g**
```js
const REGEX = /a/;

REGEX.lastIndex = 2; // ignored
console.log('xaxa'.search(REGEX)); // 1
```

**/y**
```js
const REGEX = /a/y;

REGEX.lastIndex = 1; // ignored
console.log('xaxa'.search(REGEX)); // -1 (no match)
```

### String.prototype.match(regex)
**default and not /g**
```js
const REGEX = /a/;

REGEX.lastIndex = 7; // ignored
console.log('xaxa'.match(REGEX).index); // 1
console.log(REGEX.lastIndex); // 7 (unchanged)
```
**/y and not /g**
```js
const REGEX = /a/y;

REGEX.lastIndex = 2;
console.log('xaxa'.match(REGEX)); // null

REGEX.lastIndex = 3;
console.log('xaxa'.match(REGEX).index); // 3
console.log(REGEX.lastIndex); // 4
```

**/g**
```js
const REGEX = /a|b/g;
REGEX.lastIndex = 7;
console.log('xaxb'.match(REGEX)); // ['a', 'b']
console.log(REGEX.lastIndex); // 0
```

**/gy**
```js
const REGEX = /a|b/gy;

REGEX.lastIndex = 0; // ignored
console.log('xab'.match(REGEX)); // null
REGEX.lastIndex = 1; // ignored
console.log('xab'.match(REGEX)); // null

console.log('ab'.match(REGEX)); // ['a', 'b']
console.log('axb'.match(REGEX)); // ['a']
```
### String.prototype.split(separator, limit)
```js
'x##'.split(/#/y) // no match [ 'x##' ]
'##x'.split(/#/y) // 2 matches [ '', '', 'x' ]
'#x#'.split(/#/y) // 1 match [ '', 'x#' ]
'##'.split(/#/y) // 2 matches [ '', '', '' ]
'##'.split(/(#)/y) // [ '', '#', '', '#', '' ]
```
### String.prototype.replace(search, replacement)
**default**
```js
const REGEX = /a/;

// One match
console.log('xaxa'.replace(REGEX, '-')); // 'x-xa'
```

**/y**
```js
const REGEX = /a/y;

// Anchored to beginning of string, no match
REGEX.lastIndex = 1; // ignored
console.log('xaxa'.replace(REGEX, '-')); // 'xaxa'
console.log(REGEX.lastIndex); // 1 (unchanged)

// One match
console.log('axa'.replace(REGEX, '-')); // '-xa'
```

**/g**
```js
const REGEX = /a/g;

// Multiple matches
console.log('xaxa'.replace(REGEX, '-')); // 'x-x-'
```

**/gy**
```js
const REGEX = /a/gy;

// Multiple matches
console.log('aaxa'.replace(REGEX, '-')); // '--xa'
```
