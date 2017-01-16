# CH 3. 다중 변수 및 인자 제어

## 3-2. Rest Parameter `...`

### 3-2-1. 기존 방식 - arguments

기존에는 매개변수의 개수를 제한하지 않고 입력받은 매개변수에 따라 유동적으로 동작하는 함수를 구현하기 위해 `arguments`라고 하는 배열과 유사한 형태의 객체(유사배열객체)를 활용해왔다.

```js
const foo = (a, b) => {
  a = 1;
  arguments[0] = 2;
  console.log(a, arguments[0]);
}
foo(10, 20);
```

그런데 위 예제에서 arguments[0]에는 어떤 값이 들어올까? a값은 바뀌었을까? 이에 대해서는 arguments의 성질을 정확히 '암기'하고 있지 않은 이상 자신있게 답하기 어려울 것이다.

또한 arguments는 배열이 아니기 때문에, 배열 고유의 기능을 이용하기 위해서는 다음과 같이 `call`, `apply` 등을 차용하는 편법을 이용해야 했다.

```js
const foo = () => {
  console.log(Array.prototype.slice.call(arguments, 3));        // [4, 5]
  console.log(Array.prototype.slice.apply(arguments, [1, 4]));  // [2, 3, 4]
}
foo(1, 2, 3, 4, 5);
```


### 3-2-2. Rest Parameter 나머지 파라미터

이러한 불명확성을 제거하기 위해 ES6는 많은 부분에서 변화가 이뤄졌으며, `나머지 파라미터 rest parameter`(이하 `RP`라 함)가 그 중 하나이다.

나머지 파라미터는 파라미터 앞에 `...`라는 접두어를 붙이면 동작한다. 해당 파라미터에는 함수 호출시 넘겨받은 인자들 중 앞서 지정한 파라미터들을 제외한 `나머지 파라미터들`이 담긴 배열이 할당된다.

```js
const f = (x, y, ...rest) => {
  console.log(rest);       // [true, null, undefined, 10]
}
f(1, 2, true, null, undefined, 10);
```

### 3-2-3. Details

#### 1) RP는 파라미터의 가장 마지막에 오직 한 번만 지정할 수 있다.

파라미터에 여러개의 RP를 할당한다면 각각의 RP마다 몇 개의 파라미터를 할당하여야 할지 알 수 없을 것이다. 또한 RP가 중간에 위치하는 것을 허용할 경우 자바스크립트 엔진이 처리해야 할 일은 그만큼 늘어날 수밖에 없는데, 과연 그럴 만한 가치가 있을지 의문이다.

```js
const fa = (x, ...a, ...b) => {
  console.log(x, a, b);
}
fa(1, 2, 3, 4, 5, 6);  // a와 b에 각각 몇 개의 파라미터를 할당할까?
```

```js
const fb = (x, ...a, y) => {
  console.log(x, a, y);
  // Uncaught SyntaxError: Rest parameter must be last formal parameter
}
fb(1, 2, 3, 4, 5, 6);

// 이런 기능은 다음처럼 간단한 명령으로 충분히 구현 가능하다.
const fc = (x, ...a) => {
  const y = a.pop();
  console.log(x, a, y);  // error
}
fc(1, 2, 3, 4, 5, 6);
```


#### 2) 객체의 setter에서는 RP를 사용할 수 없다.

setter는 반드시 하나의 매개변수만을 사용할 수 있도록 되어있기 때문에 RP는 허용되지 않는다.
(getter에는 어떠한 파라미터도 사용할 수 없으므로 당연히 RP도 사용 불가)

```js
let person = {
  set personInfo(...val){
    // unknown SyntaxError: Setter function argument must not be a rest parameter
    this.name = val[0];
    this.age  = val[1];
  }
};
```

#### 3) 파라미터에 RP만 적용하면 `arguments`를 대체할 수 있다.

```js
function argsAlternate(...args){
  console.log(args.length, arguments.length);    // 4, 4
  console.log(args[0], arguments[0]);            // 1, 1
  console.log(args[args.length - 1], arguments[arguments.length - 1]);    // 4, 4
  args[1] = 10;
  arguments[1] = 20;
  console.log(args[1], arguments[1]);            // 10, 20
};
argsAlternate(1, 2, 3, 4);
```
