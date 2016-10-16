#7. SYMBOL

## 7번째 타입(type) 
1997년 javascript가 처음 표준화된 이래로 javascript의 타입은 총 6개 였습니다

- undefined
- Null
- Boolean
- Number
- String
- Object

- Symbol 이 추가 되었지요.


그래서 심볼은 완벽히 새로운 타입 입니다. 


```js
    console.log(typeof Symbol()); //symbol
```


## Symbol은 항상 새로운 값을 리턴한다. 

```js
    let symbol = Symbol();
    let symbol2 = Symbol();
    
    console.log(symbol == symbol2); //false
    
    let symbol3 = Symbol('a');
    let symbol4 = Symbol('a');
    
    console.log(symbol3 == symbol4); //false
```


## Symbol.for(); 전역으로 공유되는 심볼 객체이다.

```js 
    let a = Symbol.for('test');
    let b = Symbol.for('test');
    
    console.log(a == b); // true
```


## Symbol은 문자열이 아니기 때문에 문자열과 연산작업을 할 수 없다. 

```js
    let str = 'test'; 
    str += Symbol(); //VM730:1 Uncaught TypeError: Cannot convert a Symbol value to a string(…)
    
    let str2 = 'test';
    let symbol = Symbol('test');
    
    str2 += symbol.toString(); //testSymbol(test); 문자열을 묵시적으로 변환 가능하다. 
    str2 += String(symbol); //testSymbol(test)Symbol(test)
```

#Symbol은 object의 prototype key로 사용될 수 있다. 

```js
    let key = Symbol('my-key');
    const obj = {
      [key]: 'test'
    };
    
    console.log(obj[key]); //유일한 key로 사용가능하다. 
```

##Symbol.keyFor(); 는 for()로 생성된 키값을 반납합니다.

```js
    const sym = Symbol.for('Hello everybody!');
    Symbol.keyFor(sym)
    
    'Hello everybody!'
```