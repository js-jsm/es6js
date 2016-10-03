# CH 3. 다중 변수 및 인자 제어

## 3-1. Default Parameter

### 3-1-1. 파라미터 기본값 할당 Default Parameter Values

#### 3-1-1-1. 기존 방식의 문제점

기존에는 함수의 파라미터에 값이 지정되지 않았을 경우 다음과 같이 함수 내부에서 기본값을 할당하였다.

```js
function f(x, y, z){
  x = x ? x : 4;                 // (1)
  y = y || 5;                    // (2)
  if(!z) {                       // (3)
    z = 6;
  }
  console.log(x, y, z);    // 1, 5, 6
}
f(1);
```

위 방식들은 `false`로 동작하는 다른 경우(`0`, `''`, `null`, `NaN`) 등에까지 모두 기본값을 할당해버리게 되어, 다음처럼 엉뚱한 결과를 야기하게 되곤 한다.

```js
function f(x, y, z){
  x = x ? x : 4;
  y = y || 5;
  if(!z) {
    z = 6;
  }
  console.log(x, y, z);    // 4, 5, 6
}
f(0, null);
```

분명히 0과 null을 지정했음에도 불구하고 결과는 각각 4, 5가 출력된다. 따라서 `undefined`에 한해서만 기본값을 할당하기 위해서는 다음과 같이 엄밀한 처리가 필요하다.

```js
function f(x, y){
  x = x !== undefined ? x : 3;
  y = typeof x !== "undefined" ? y : 4;
  console.log(x, y);    // 0, null
}
f(0, null);
```

이처럼 ES5까지는 **값이 없을 때만 기본값을 할당**이라는 매우 기본적인 동작을 구현하기 위해 _삼항연산, typeof 연산자 등_ 꽤 많은 코드를 추가해야 했다. ES2015에서는 이런 번거롭고 오류를 유발하는 동작을, 보다 직관적이고 단순하면서 안전한 방식으로 해결할 수 있는 방법을 제시한다.


#### 3-1-1-2. Details of Default Parameter

##### 1) 기본예
```js
function f(a = 1, b = 2, c = 3, d = 4, e = 5, f = 6){
  console.log(a, b, c, d, e, f);    // 7, 0, "", false, null, 6
}
f(7, 0, "", false, null);
```

위와 같이 매개변수 각각에 기본값을 지정해줄 수 있다. 함수 내부에는 어떠한 추가적인 코드도 필요하지 않다.


##### 2) undefined를 값으로 넘기면 누락된 것으로 간주하여 기본값이 적용된다.
```js
function f(x = 1, y = 2, z = 3){
  console.log(x, y, z);    // 4, 2, 5
}
f(4, undefined, 5);
```

##### 3) 계산식을 넣을 수도 있다.

```js
function f(x = 1, y = 3 + x){
  console.log(x, y);       // 6, 9
}
f(6);
```

##### 4) 함수의 실행 결과를 대입할 수도 있다.

```js
function getDefault(){
  console.log('getDefault Called.');
  return 10;
}
function sum(x, y = getDefault()){
  console.log(x + y);
}
sum(1, 2);    // 3
sum(1);       // "getDefault Called."
              // 11
```

##### 5) 매개변수는 `let` 변수를 선언한 것과 동일한 효과를 지닌다.

따라서 나중에 선언된 매개변수는 먼저 선언된 매개변수를 자신의 기본값에 활용할 수 있는 반면, 반대의 경우는 불가능하다(**TDZ** 참고). 아래에서 자세히 살펴보겠다.

```js
function multiply(x = y * 3, y){
  console.log(x, y);
}
multiply(2, 3);             // 2, 3
multiply(undefined, 2);     // referenceError : "y" is not defined.
```

위 예제의 `multiply(undefined, 2)`를 자바스크립트 엔진이 해석하는 방식을 따라 풀어쓰면 다음과 같은 형태를 띌 것이다.

```js
{
  let x = undefined;
  x = x !== undefined ? x : y * 3;    // (*)
  let y = 2;
  console.log(x, y);
}
```

변수 `y`의 입장에서는 (\*) 구간까지가 **TDZ** 영역에 속한다. 즉 (\*)의 위치에서 변수 `y`는 접근이 불가능하다. `x`값이 `undefined`이므로 `x`에는 `y * 3`을 대입하여야 하는데, `y`는 접근이 불가능한 상태이기 때문에 `referenceError`를 띄우게 된다.
