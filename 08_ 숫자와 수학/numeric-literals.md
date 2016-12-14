# Numeric Literals
* [Binary Literal](#binary-literal)  
* [Octal Literal](#octal-literal)  
* [Hexadecimal](#hexadecimal)

## Binary Literal
수학식: 11<sub>(2)</sub>  
프로그래밍 언어: 0b11, 0B11

**in ES**
```javascript
console.log(parseInt('11', 2)); // 3
```

**in ES6**
```javascript
console.log(0b11); // 3
console.log(0B11); // 3
```

## Octal Literal
수학식: 71<sub>(8)</sub>  
프로그래밍 언어: 071

**in ES**
```javascript
console.log(071); // 57
```

**in strict mode**
```javascript
'use strict';
console.log(071); // Uncaught SyntaxError: Octal literals are not allowed in strict mode.
```
ES5의 strict mode에서는 8진수 리터럴이 적용되지 않는다.  
왜냐하면 ES5에는 8진수 문법이 존재하지 않기 때문이다.  
그럼에도 불구하고 브라우저 벤더들은 비표준 요소인 8진수 리터럴을 지원하게끔 구현하였다.  
따라서 strict mode에 따라서 8진수 리터럴의 사용 가능 여부가 달려있다.

[MDN Strict mode](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Strict_mode#Converting_mistakes_into_errors)  
> strict mode in ECMAScript 5 forbids octal syntax.
Octal syntax isn't part of ECMAScript 5,
but it's supported in all browsers by prefixing the octal number with a zero:
0644 === 420 and "\045" === "%".`

**in ES6**
```javascript
console.log(0o71); // 57
console.log(0O71); // 57
```

## Hexadecimal
수학식: FF<sub>(16)</sub>  
프로그래밍 언어: 0xFF, xFF, hFF, etc.

**in ES**
```javascript
console.log(0xff); // 255
console.log(0Xff); // 255
console.log(0xA); // 10
console.log(0XA); // 10
```

## Caution
```javascript
console.log(0b11.1); // Uncaught SyntaxError: missing ) after argument list
```

실수가 되는 게 아니라 Number.prototype.1로 접근을 하게 된다.  
10진수의 경우에는 실수 취급한다.

```javascript
Number.prototype.Aa = 'Aa';
console.log(0b11.Aa); // 'Aa'
1.Aa; // Uncaught SyntaxError: Invalid or unexpected token
```