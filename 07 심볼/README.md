# CH 7. SYMBOL - `by 태산`

**[SYMBOL API](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Symbol)**

## 1. 7번째 원시 데이터 타입 (TYPE)

> Undefined
> Boolean
> Number
> String
> Object
> NULL

> Symbol 이 추가 되었습니다.


**[JS 원시 데이터 타입](https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures)**



```js
    const symbol1 = Symbol('Apple');

    console.log(typeof symbol1); //symbol

    console.log(typeof {}); //object
    console.log(typeof null); //object
    console.log(typeof ''); //string
    console.log(typeof 1); //number
    console.log(typeof undefined); //undefined
    console.log(typeof true); //boolean
```


## 2. 생성 및 사용방법

> 생성 및 사용방법 및 특성
> 심볼은 새로운 타입 입니다.

```js
    const symbol = Symbol();

    console.log(symbol); //Symbol()

    console.log(typeof symbol1); //symbol
```

> 심볼은 인자로 문자열을 받습니다
> 해당 문자열은 디버깅시에 용이하게 사용되며 새롭게 생성된 심볼이 어떠한 역할을 하는 심볼인지에 대해서 설명하는 역할을 합니다.
> 심볼을 보는 방법은 아래와 같습니다.

```js
    const symbol = Symbol('Apple');

    console.log(String(symbol)); //Symbol(Apple)
    console.log(symbol.toString()); //Symbol(Apple)
    console.log(symbol); //Symbol(Apple)
    console.log(String(symbol).lastIndexOf('Apple')); //7
```


## 3. 심볼은 Unique 합니다.

> 심볼은 항상 새로운 값을 리턴 합니다.
> 심볼에 전달된 파라미터값이 동일하다고 해서 해당 심볼이 같지는 않습니다.


```js
    const symbol1 = Symbol('Apple');
    const symbol2 = Symbol('Apple2');

    console.log(symbol1 == symbol2); //false


    const symbol1 = Symbol('Apple');
    const symbol2 = Symbol('Apple');

    console.log(symbol1 == symbol2); //false
```


> 심볼은 Property Key의 역할을 수행할 수 있습니다.
> 너무나 당연한 말이지만 Object의 Function의 이름으로도 역할 할 수 있습니다.

```js
    const KEY = Symbol('KEY');
        const FNC = Symbol('FNC');

        const obj = {
            [KEY]: 'key value',
            [FNC]: () => 'object inner function int'
        };

        console.log(obj.KEY);    // undefined
        console.log(obj['KEY']); // undefined

        console.log(obj[KEY]);   // key value

        console.log(obj[FNC]()); // object inner function int
```


## 4. Property Key

> 위에서 보다 시피 매번 전역 공간에 심볼을 생성하여 저장하며 객체의 키 값으로 사용하기에는 너무 번거로운 경우가 많이 발생합니다.
> 객체에서 KEY로 열거할 수 있는 경우를 살펴볼까요 ?
> 먼저 객체를 하나 만들어 줍니다.

```js
    const obj = {
       [Symbol('KEY')]: 'symbol key value',
       key: 'string key value'
    };
```

> 객체에서 key 값을 얻어오려면 기존에는 이렇게 코딩하였죠 ?

```js
    console.log(
        Object.keys(obj) // ['key']
    );

    console.log(
        Object.getOwnPropertyNames(obj) //['key']
    );
```

> 하지만 심볼형태의 key는 Object.keys, Object.getOwnPropertyNames 함수로는 가져올 수 없습니다.

```js
    console.log(
        Object.getOwnPropertySymbols(obj) // [Symbol(KEY)]
    );
```

> 그래서 Object.getOwnPropertySymbols 함수를 사용하여야 합니다
> 그러나 이 경우에도 문제는 발생하게 되요.
> 그렇죠. 반복문을 사용하기가 애매해 집니다.
> 그래서 Reflect라는 객체를 사용 합니다.
> Reflect는 비추다라는 의미를 가지고 있네요.

```js
    console.log(
        Reflect.ownKeys(obj) //["key", Symbol(KEY)]
    );

```


> Iterator 객체와 for of 의 응용

```js
    const obj = {
        arr: [1, 2, 3, 4, 5],
        [Symbol.iterator]() {
            return {
                next: () =>  this.arr[0] ? { value: this.arr.shift() } : { done: true }
            }
        }
    };

    for(const num of obj)
        console.log(num); //1, 2, 3, 4, 5
```

> 간단한 예제를 하나 만들어보았습니다.
> Symbol에는 iterator 객체를 만들어줄 수 있는데요.
> 이는 JAVA의 Iterator 처럼 동작해줍니다.
> 즉 obj를 실행해주면 Symbol.iterator를 실행시켜 주는데요.
> 해당 함수는 반드시 Object객체를 return 해 주어야 합니다.
> 또는 yeild를 사용할 수도 있는데, 이부분은 추후에 다뤄보도록 하지요 !
> iterator는 하나의 객체에 반드시 하나만 존재해야 하는데요, 여러개를 선언하더라도 추후에 적용된 iterator가 override 되게 됩니다.

```js
    const obj = {
        arr: [1, 2, 3, 4, 5],
        [Symbol.iterator]() {
            console.log('first');
            return {
                next: () =>  this.arr[0] ? { value: this.arr.shift() } : { done: true }
            }
        },

        [Symbol.iterator]() {
            console.log('second');
            return {
                next: () =>  this.arr[0] ? { value: this.arr.shift() } : { done: true }
            }
        }
    };

    for(const num of obj)
        console.log(num); //second 1, 2, 3, 4, 5


    console.log(Reflect.ownKeys(obj)); ["arr", Symbol(Symbol.iterator)]
```


## 5. 전역적인 Symbol의 사용 방법

> Symbol의 전역적인 사용 방법에 대해서 알아 보죠.
> 매번 새로운 Symbol을 사용하는게 더 훌륭해 보이겠지만, 어떨때에는 하나의 심볼을 가지고 동시에 여러군데에서 사용해야 하는 경우도 분명히 존재합니다.
> Common 한 Property등이 그렇겠지요 ?
> 전역적으로 심볼을 관리하는 방법에 대해서 알아보시죠 !
> 물론 window.mySymbol = Symbol(); 이딴거 말구요 ; ㅅ;

```js
    Symbol.for('key');
```

> 단 하나만 아시면 됩니다. Symbol.for 라는 함수죠.
> 파라미터로 넘어온 key를 기준으로 없다면 create 있다면 get해줍니다.

```js
    const mySymbol  = Symbol.for('test'); //create Symbol
    const mySymbol2 = Symbol.for('test'); //get Symbol

    console.log(
        mySymbol === mySymbol2
    );  //true
```

> 어때요 엄청 쉽지요 ??
> 하나의 기능을 더 알아볼게요 !

```js
    console.log(
        Symbol.keyFor(mySymbol)
    ); //test
```

> 이렇게 하면 해당 심볼의 key값을 가져올 수 있게 되지요 ! 엄청 간단합니다.



## 6. 개인적인 확장

> 사실 Symbol은 엄청나게 Unique 하기 때문에 많은 곳에서 응용해서 사용할 수 있습니다.
> Class의 상속객체에서도 사용할 수가 있을 테구요 Property를 외부로 노출 하고 싶지 않을때 또한 사용가능 하겠더군요.
> 하지만 그보다 더 우선 눈에 들어온 것은 바로 Enum class처럼 사용할 수 있겠다라는 것.

```java
package com.company.java8.java.study;

/**
 * Created by imcts on 2016. 11. 7..
 */
public enum EnumTest {
    KEY,
    KET_1,
    KEY_2,
    KEY_3,
    KEY_4,
    KEY_5,
    KEY_6,
    KEY_7;

    private String value;

    EnumTest() {
        // do something..
    }

    EnumTest(String value) {
        this.value = value;
    }
}


public class Main {

    public static void main(String [] args) {

        EnumTest test = EnumTest.KEY;

        switch (test) {
            case KEY_1: break;
            case KEY_2: break;
            case KEY_3: break;
            case KEY_4: break;
            case KEY_5: break;
            case KEY_6: break;
            case KEY_7: break;
            default: break;
        }
    }
}
```

> 네 자바의 Enum 입니다.
> 이걸 JS에서도 한번 구현해 보고자 합니다.


```js
    class Enum {
        constructor(keys) {
            for(const key of keys)
                this[key] = Symbol(key);
        }
    }

    const ENUMS = new Enum(['APPLE', 'BANANA', 'ORANGE']);

    switch(ENUMS.APPLE) {
        case ENUMS.APPLE:
            console.log('APPLE'); break;

        case ENUMS.BANANA:
            console.log('BANANA'); break;

        case ENUMS.ORANGE:
            console.log('ORANGE'); break;
    }
```

> 응용하기에 따라서 엄청나게 막강해질 수도 있겠다라는 생각이 드네요.
> 전역적으로 CLASS하나에 관리될 수 있는 ACTION들이 될 수 있을 듯 합니다.
> Redux에 적용해보아도 좋을 것 같다는 생각이 드네요 ! 결국은 Enum 하나만 export 되면 되니까요  !

```js
    class Enum {
        constructor(keys) {
            for(const key of keys)
                this[key] = Symbol(key);
        }
    }

    export default new Enum(['APPLE', 'BANANA', 'ORANGE']);

    //enum.js
```

> Enum Class를 정의하고

```js
import Actions from './actions';

switch(Actions.APPLE) {
    case Actions.APPLE:
        console.log('APPLE'); break;

    case Actions.BANANA:
        console.log('BANANA'); break;

    case Actions.ORANGE:
        console.log('ORANGE'); break;
}

//APPLE 출력
```

> 호출 하여 사용해 줍니다 !
> ES6 심볼 이었습니다.
