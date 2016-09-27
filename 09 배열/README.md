| 재필1 | 09 배열 | Array

# 배열

ES6에는 전역 배열 객체/인스턴스에 새로운 프로퍼티가 있어서 배열을 다루기 쉬워 졌다.

## Array.from(arrayLike|iterable[, mapFunc, context]) 메소드

유사 배열 혹은 반복가능한 객체로부터 새 Array 인스턴스를 만든다.  

ES6에서 클래스 구문은 내장 클래스 및 사용자 정의 클래스의 서브 클래스화를 허용한다.
결과적으로 Array.from과 같은 클래스 정적 메소드는 Array가 아닌, Array의 서브 클래스를 상속받고 서브 클래스의 새 인스턴스를 만든다.

- arrayLike : length 프로퍼티와 인덱스 처리된 엘리먼트를 지닌 객체.  
- iterable :  매 호출시마다 한 개의 엘리먼트를 인출할 수 있는 객체.  
- mapFunc : 배열의 모든 요소를 실행할 Map함수
- this : mapFunc 실행시에 Execution Context를 지정할 수 있다.  

> 유사 배열 객체 : (length 속성과 인덱싱된 요소를 가진 객체)  
> 반복 가능한 객체 : (Map과 Set와 같이 객체의 요소를 얻을 수 있는 객체).


*예제*
```js
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

// String
Array.from("foo");
// ["f", "o", "o"]

// 화살표 함수를 이용한 mapping
Array.from([1, 2, 3], x => x + x);
// [2, 4, 6]

// 연속된 숫자배열 생성
Array.from({length: 5}, (v, k) => k);    
// [0, 1, 2, 3, 4]
```

## Array.of(values...) 메소드

## fill(value, startIndex, endIndex) 메소드

## find(testingFunc, this) 메소드

## findIndex(testingFunc, this) 메소드

## copyWithin(targetIndex, startIndex, endIndex) 메소드

## entries(), keys(), and values() 메소드

# 해체 할당

## 배열 해체 할당

## 중첩 배열 해체

## 파라미터 배열 해체 할당

## 나머지 연산자를 사용한 배열 해체 할당

# 콜렉션

## 배열버퍼

## 형지정배열? 타입화배열?
