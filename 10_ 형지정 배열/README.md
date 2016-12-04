# CH 10. Typed Array (형지정 배열)
> - Typed Array는 Binary data(2진 데이터)를 다루기 위해 나온 API.
> - ArrayBuffer로 이진 데이터 생성 후 이 것을 매개변수로 Typed Array로 활용 가능.
> - Media File(video, audio, image), webSocket, XMLHttpRequest, canvas 등에서 사용 가능.

## 10.1 ArrayBuffer
> 일반 고정 길이 이진 데이터 버퍼를 나타내는 데 사용되는 데이터 형입니다. ArrayBuffer 콘텐츠를 직접 조작할 수는 없지만 Typed Array 또는 특정 형식으로 버퍼를 나타내는 DataView를 만들어 버퍼의 내용을 읽고 쓰기 위해 사용합니다.  
>  여기서는 Typed Array를 이용해 조작해 본다.

```js

// example

const buffer8 = new ArrayBuffer(8);
// 8 Byte의 버퍼가 만들어졌다.
```
선언된 배열의 모든 요소는 0으로 초기화됩니다. 배열 버퍼의 이러한 사용 방법은 C언어와 같이 배열의 선언시 길이를 미리 정해두고 할당하는 것과 유사합니다. 그리고 이러한 방법은 사용가능한 크기를 예측할 수 있기 때문에 컴파일러로 하여금 성능 향상을 쉽게 이루어낼 수 있도록 합니다.

![이미지](https://mdn.mozillademos.org/files/8629/typed_arrays.png)


## 10.2 유형

| 유형                  | 크기(Byte) | 설명                                |
|:----------------------|:----------:|-------------------------------------|
| `Int8Array`           | 1          | 8비트 2의 보수 형식 부호 있는 정수  |
| `Uint8Array`          | 1          | 8비트 부호 없는 정수                |
| `Uint8ClampedArray`   | 1          | 8비트 부호 없는 정수 (고정)         |
| `Int16Array`          | 2          | 16비트 2의 보수 형식 부호 있는 정수 |
| `Uint16Array`         | 2          | 16비트 부호 없는 정수               |
| `Int32Array`          | 4          | 32비트 2의 보수 형식 부호 있는 정수 |
| `Uint32Array`         | 4          | 32비트 부호 없는 정수               |
| `Float32Array`        | 4          | 32비트 IEEE 부동 소수점 수          |
| `Float64Array`        | 8          | 64비트 IEEE 부동 소수점 수          |

참고 : [데이터 양 계산기](https://search.naver.com/search.naver?sm=stb_hty&where=se&ie=utf8&query=bit)


## 10.3 buffer view 사용해보기

### Int8Array
> 8비트 2의 보수 형식 부호 있는 정수

```js
const buffer = new ArrayBuffer(10);

const i8a = new Int8Array(buffer);

console.log( i8a.BYTE_PER_ELEMENT )
```
### Uint8Array

> 8비트 부호 없는 정수  

```js
const buffer = new ArrayBuffer(10);

const u8a = new Uint8Array(buffer);

console.log( u8a.BYTE_PER_ELEMENT )
```
### Uint8ClampedArray
> 8비트 부호 없는 정수 (고정)        

```js
const buffer = new ArrayBuffer(10);

const u8ca = new Uint8ClampedArray(buffer);

console.log( u8ca.BYTE_PER_ELEMENT )
```
### Int16Array
> 16비트 2의 보수 형식 부호 있는 정수

```js
const buffer = new ArrayBuffer(10);

const i16a = new Int16Array(buffer);

console.log( i16a.BYTE_PER_ELEMENT )
```
### Uint16Array
> 16비트 부호 없는 정수              

```js
const buffer = new ArrayBuffer(10);

const u16a = new Uint16Array(buffer);

console.log( u16a.BYTE_PER_ELEMENT )
```
### Int32Array
> 32비트 2의 보수 형식 부호 있는 정수

```js
const buffer = new ArrayBuffer(10);

const i32a = new Int32Array(buffer);

console.log( i32a.BYTE_PER_ELEMENT )
```
### Uint32Array
> 32비트 부호 없는 정수              

```js
const buffer = new ArrayBuffer(10);

const u32a = new Uint32Array(buffer);

console.log( u32a.BYTE_PER_ELEMENT )
```
### Float32Array
> 32비트 IEEE 부동 소수점 수         

```js
const buffer = new ArrayBuffer(10);

const f32a = new Float32Array(buffer);

console.log( f32a.BYTE_PER_ELEMENT )
```
### Float64Array
> 64비트 IEEE 부동 소수점 수         

```js
const buffer = new ArrayBuffer(10);

const f64a = new Float64Array(buffer);

console.log( f64a.BYTE_PER_ELEMENT )
```
