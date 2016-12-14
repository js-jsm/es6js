# Math
* [Math object](#math-object)  
  * [Properties](#properties)  
  * [Methods](#methods)

## Math object
Math object는 전역 공간에 존재하는 객체이다.  
또한 Math 객체의 프로퍼티들과 메소드들은 상수이다.  
하지만 새로운 프로퍼티와 메소드 생성은 가능하다.
```javascript
console.log(window.Math === Math); // true
Math.E = 'asdf';
Math.qwer = 'qqqq';
console.log(Math.E); // 2.718281828459045
console.log(Math.qwer); // "qqqq"
```

### Properties
* [Math.PI](#mathpi)  
* [Math.E](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/E)    
Euler's constant and the base of natural logarithms, approximately 2.718.  
* [Math.LN2](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/LN2)    
Natural logarithm of 2, approximately 0.693.  
* [Math.LN10](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/LN10)    
Natural logarithm of 10, approximately 2.303.  
* [Math.LOG2E](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/LOG2E)    
Base 2 logarithm of E, approximately 1.443.  
* [Math.LOG10E](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/LOG10E)    
Base 10 logarithm of E, approximately 0.434.  
* [Math.SQRT1_2](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/SQRT1_2)  
Square root of 1/2; equivalently, 1 over the square root of 2, approximately 0.707.  
* [Math.SQRT2](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/SQRT2)  
Square root of 2, approximately 1.414.  

#### [Math.PI](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI)
𝛑 ≒ 3.141592653589793

##### Usage
```javascript
Object.defineProperty(Math, "GET_CIRCUMFERENCE", {
  value: radius => 2 * Math.PI * radius
});
Math.GET_CIRCUMFERENCE = "aa";
console.log(Math.GET_CIRCUMFERENCE); // "radius => 2 * Math.PI * radius"
console.log(Math.GET_CIRCUMFERENCE(1)); // 6.283185307179586
```

### Methods
많은 메소드들은 OS, JS 엔진에 의존적이다.  
브라우저 별로 반환하는 값이 다르며, 같은 JS 엔진을 쓴다 하더라도 OS 별로 다른 값을 반환한다.
> Note that a lot of the math functions have a precision that's implementation-dependent.
This means that different browsers can give a different result,
and even the same JS engine on a different OS or architecture can give different results.


* [Math.abs(x)](#mathabsx)  
* [Math.ceil(x)](#mathceilx)  
* [Math.floor(x)](#mathfloorx)  
* [Math.round(x)](#mathroundx)  
* [Math.trunc(x)](#mathtruncx-) `*`  
* [Math.fround(x)](#mathfroundx-) `*`  
* [Math.max(\[x\[, y\[, …\]\]\])](#mathmaxx-y---mathminx-y-)  
* [Math.min(\[x\[, y\[, …\]\]\])](#mathmaxx-y---mathminx-y-)  
* [Math.pow(x, y)](#mathpowx-y)  
* [Math.random()](#mathrandom)  
* [Math.sign(x)](#mathsignx-) `*`  
* [Math.acos(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/acos)  
Returns the arccosine of a number.  
* [Math.acosh(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh) `*`  
Returns the hyperbolic arccosine of a number.  
* [Math.asin(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/asin)  
Returns the arcsine of a number.  
* [Math.asinh(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/asinh) `*`  
Returns the hyperbolic arcsine of a number.  
* [Math.atan(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan)  
Returns the arctangent of a number.  
* [Math.atanh(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atanh) `*`  
Returns the hyperbolic arctangent of a number.  
* [Math.atan2(y, x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2)  
Returns the arctangent of the quotient of its arguments.  
* [Math.cbrt(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt) `*`  
Returns the cube root of a number.  
* [Math.clz32(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32) `*`  
Returns the number of leading zeroes of a 32-bit integer.  
* [Math.cos(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos)  
Returns the cosine of a number.  
* [Math.cosh(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cosh) `*`  
Returns the hyperbolic cosine of a number.  
* [Math.exp(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/exp)  
Returns Ex, where x is the argument, and E is Euler's constant (2.718…), the base of the natural logarithm.  
* [Math.expm1(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/expm1) `*`  
Returns subtracting 1 from exp(x).  
* [Math.hypot(\[x\[, y\[, …\]\]\])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot) `*`  
Returns the square root of the sum of squares of its arguments.  
* [Math.imul(x, y)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul) `*`  
Returns the result of a 32-bit integer multiplication.  
* [Math.log(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log)  
Returns the natural logarithm (loge, also ln) of a number.  
* [Math.log1p(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log1p) `*`  
Returns the natural logarithm (loge, also ln) of 1 + x for a number x.  
* [Math.log10(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log10) `*`  
Returns the base 10 logarithm of a number.  
* [Math.log2(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log2) `*`  
Returns the base 2 logarithm of a number.  
* [Math.sin(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin)  
Returns the sine of a number.  
* [Math.sinh(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sinh) `*`  
Returns the hyperbolic sine of a number.  
* [Math.sqrt(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt)  
Returns the positive square root of a number.  
* [Math.tan(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/tan)  
Returns the tangent of a number.  
* [Math.tanh(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/tanh) `*`  
Returns the hyperbolic tangent of a number.  

#### [Math.abs(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs)
Math.abs(x) = |x|
```javascript
console.log(Math.abs(-1) === Math.abs(1)); // 1 === 1
```

#### [Math.ceil(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)
무조건 소수점 첫째 자리에서 올림하여 정수를 반환.
```javascript
console.log(Math.ceil(1)); // 1
console.log(Math.ceil("1.00001")); // 2
console.log(Math.ceil(-0)); // -0
console.log(Math.ceil(-2.00001)); // -2
```

#### [Math.floor(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
무조건 소수점 첫째 자리에서 내림하여 정수를 반환.
```javascript
console.log(Math.ceil(1)); // 1
console.log(Math.ceil(1.00001)); // 1
console.log(Math.ceil(-0)); // -0
console.log(Math.ceil("-2.00001")); // -3
```

#### [Math.round(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
소수점 첫째 자리에서 반올림하여 정수를 반환.
```javascript
console.log(Math.round(1.1)); // 1
console.log(Math.round(1.5)); // 2
console.log(Math.round(-0.1)); // -0
console.log(Math.round("-0.5")); // -0
console.log(Math.round(-0.6)); // -1
```

#### [Math.trunc(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc) `*`
소수점을 제외한 정수부만을 반환.
```javascript
console.log(Math.trunc(1)); // 1
console.log(Math.trunc(1.00001)); // 1
console.log(Math.trunc(-0)); // -0
console.log(Math.trunc("-2.00001")); // -2
```

##### Polyfill
```javascript
Math.trunc = Math.trunc || function(x) {
  return x - x % 1;
}
```

#### [Math.fround(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround) `*`
가장 근사한 [Single-precision floating-point format](https://en.wikipedia.org/wiki/Single-precision_floating-point_format)을 반환.  
```javascript
console.log(0.1 + 0.2); //0.30000000000000004
console.log(Math.fround(0.1 + 0.2)); // 0.30000001192092896
```

##### Polyfill
```javascript
Math.fround = Math.fround || (function (array) {
  return function(x) {
    return array[0] = x, array[0];
  };
})(Float32Array(1));
```

#### [Math.max(\[x\[, y\[, …\]\]\])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max) & [Math.min(\[x\[, y\[, …\]\]\])](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min) 
```javascript
console.log(Math.max(0, -0)); // 0
console.log(Math.min(0, -0)); // -0
console.log(Math.max()); // -Infinity
console.log(Math.min()); // Infinity
console.log(Math.max('a', 'b')); // NaN
```

#### [Math.pow(x, y)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow)
```javascript
console.log(Math.pow(2, 3)); // 8
console.log(Math.pow(4, 0.5)); // 2, 루트 2와 같음.
console.log(Math.pow(8, 1/3)); // 2, 세제곱근과 같음.
console.log(Math.pow(8, -1/3)); // 0.5, 지수에 음수도 사용 가능.
```

#### [Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
0~1 사이의 랜덤한 실수를 반환한다.  
또한 보안에 관련된 부분에 이 메소드를 사용해서는 안된다.  
보안에 관련해서는 [window.crypto.getRandomValues()](https://developer.mozilla.org/en-US/docs/Web/API/RandomSource/getRandomValues) 메소드를 참고하자.
> Note: Math.random() does not provide cryptographically secure random numbers.
Do not use them for anything related to security.
Use the Web Crypto API instead,
and more precisely the window.crypto.getRandomValues() method.

```javascript
console.log(Math.random()); // 0.07529863184903185
```

##### Usage
```javascript
Object.defineProperty(Math, "getRandomRange", {
  value: (min, max, isInt=false) => {
    const rand = Math.random() * (max - min) + min;
    return isInt ? Number.parseInt(rand) : rand;
  }
});
console.log(Math.getRandomRange(1, 10)); // 6.98786421003396
console.log(Math.getRandomRange(1, 10, true)); // 8
```

#### [Math.sign(x)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign) `*`
매개 변수의 부호를 반환.
```javascript
console.log(Math.sign(3)); //  1
console.log(Math.sign(-3)); // -1
console.log(Math.sign('-3')); // -1
console.log(Math.sign(0)); //  0
console.log(Math.sign(-0)); // -0
console.log(Math.sign(NaN)); // NaN
console.log(Math.sign('foo')); // NaN
console.log(Math.sign()); // NaN
```

##### Polyfill
```javascript
Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
    return Number(x);
  }
  return x > 0 ? 1 : -1;
}
```