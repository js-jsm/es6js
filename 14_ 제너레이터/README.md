## OverView

ES6 에서 추가된 `Generator` 는 `function*` 키워드로 사용할수 있다.

보기엔 그냥 함수 같지만 일반 함수와는 전혀 다른 특성을 가지고 있다.

함수는 `return` 키워드를 통해 1회 값을 반환할수 있지만

`Generator` 는 `yield` 키워드를 통해 여러번 값을 반환할수 있다.

`Generator` 를 생성해서 실행하면 함수가 즉시 실행되지 않으며 `iterator object` 를 반환한다.

예상대로  `Generator` 는 지난 포스팅에서 살펴본 **iterator**  와 깊은 연관이 있다.

본격적으로 `Generator` 에 대해서 알아보도록 하자.

## Generator

`Array, String, Map` 등.. `iterable interface` 를 내장한 경우도 있지만

`Object` 같은경우는 직접 구현해야 하는 번거로움이 있다.

다음 코드는 지난시간에 살펴본바 있는 객체에서 `iterable interface` 를 구현한 코드이다.

```js
const someObj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length : 3,
    [Symbol.iterator]() {
      let index = 0;
      return {
        next : () => {
          let value = this[index];
          let done = index >= this.length;
          index++;
          return { value, done };
        }
    };
  }
};
```
코드를 봤을땐 큰 어려움이 없어 보인다.

하지만 실질적으로 `iterator interface` 를 구현하는것은 어느정도 수고 스러운 면이 있다.

이런 수고 스러운? `iterable interface` 구현을 `Generator` 를 통해 쉽게 할수 있다.

```js
const someObj = {
    0: 'a',
    1: 'b',
    2: 'c',
    length : 3,
    [Symbol.iterator]: function* () {
       for (let i = 0; i < this.length; i++) {
          yield this[i];
       }
     }
  }
```
예시 코드를 통해 알수 있듯이 `Generator` 는 `function*` 과 `yield` 로 이루어져 있다.

각각의 특성에 대해서 조금더 자세히 살펴보고자 한다.

코드를 통해 하나씩 특징을 살펴보고 결과를 예측해보자.

### 1. **Generator 는 함수를 즉시 실행하지 않는다.**

```js
const welcomeToHell = function* () {
  console.log('i am callback start point');
}
welcomeToHell();
```
해당 함수를 실행했지만 콘솔로그가 출력되지 않는것을 확인할수 있다.

앞서 살펴본 특징 처럼 함수형태의 `Generator`가 실행되었다고 해서 내부 코드가 작동하는것이

아님을 알수 있다.

실행함수에 콘솔로그로 감싸주면 **Generator Object** 를 반환 하는결과를 볼수 있다.

그럼 내부에 있는 콘솔을 출력하려면 어떻게 해야 할까?

`welcomeToHell().next()` 를 실행 하면 콘솔로그가 출력되고

`Object {value: undefined, done: true}` 가 출력되는것을 확인할수 있다.

`yield` 또는 `return` 키워드가 없기 때문에 value 값이 undefined 가 출력된것을 볼수있다.

### 2. **yield 를 통해 Generator에 값을 넘길수 있다.**

```js
const generator = function* () {
   let a = yield 'hello';
   console.log(a);
   let b = yield 'i am';
   console.log(b);
}
const gen = generator();
console.log(gen.next());
console.log(gen.next());
```

`yield` 에 의해서 `{value: 'hello', done:false}` 형식으로 `hello, i am`이 출력될것이다.

그럼 `Generator` 내부에 정의된 `console.log(a)와 (b)`는 어떤 값을 출력하게 될까?

모두 **undefined** 를 출력하게 된다.

변수는 yield 를 참조하고 있지만 yield 는 generator에 있는 `next()` 함수를 통해 값을 반환 했기 때문에

null이 아닌 어떠한 자료형도 갖고있지않은 **undefined** 를 출력하게 되는것이다.

여기서 흥미로운점은 흐름중간에 `Generator`로 값을 전달할수 있는데 `next()` 를 통해 전달할수 있다.

코드를 다음과 같이 일부 수정해보자.

```js
const gen = generator();
console.log(gen.next('world'));
console.log(gen.next('generator'));
```
다시 예제를 확인해보면 `hello, world, i am, generator` 가 출력되는것을 확인해볼수 있다.

즉 변수가 yield 로부터 값을 전달받은것인데 이것이 가능한 이유는 `generator` 는 `next()` 가 실행될때까지

함수 실행을 일시정지하기 때문이다.

### 3. **yield 는 여러개의 반환값 또는 Generator도 반환할수 있다.**

```js
function* multiple() {
   yield* ['right','wrong','bad','good'];
}

function* generatorOne() {
  yield 'C';
  yield 'D';
}

function* generatorTwo() {
  yield 'A';
  yield 'B';
  yield* generatorOne();
}
```
`yield*` 키워드를 통해 배열에 있는 값들과 다른 `Generator` 안에 `yield` 를 처리 하는것을 확인해

볼수 있다. `yield*` 키워드는 `Generator` 안에서 `return` 값과도 연관이 있다.

### 4. **Generator 에서 return 키워드**

```js
 function* returnVal() {
   yield 1;
   yield 2;
   return 3;
 }
 //test1
 function* dif_returnVal() {
   yield 1;
   return 2;
   yield 3;
 }
 const testValue = returnVal();
 //test2
 console.log(testValue.next());
 console.log(testValue.next());
 console.log(testValue.next());
 //test3
 for (let key of testValue) {
   console.log(key);
 }
```

`Generator` 에서 `return`의 특성을 알아보자. 첫번째 정의된 `returnVal()` 은 `1,2,3` 을

출력한다. 그러나 **test1** 에서 `dif_returnVal()` 은 `return 2` 이후에 정의된  `yield 3`을 출력하지 않는다.

`Generator`에서 return 은 `Generator` 를 종료 시키는 역할을 하는것 같다.

**test2** 에서는 `returnVal()` 을 출력했을때 .next() 를 통해 1,2,3 을 출력한다.

return 3이 마지막에 있기 때문에 출력한것으로 보여진다.

**test3** 에서 `returnVal()` 을 `for..of` 로 `loop` 을 돌면 `1,2` 만 출력되는것을 알수 있다.

return 과 yield 를 엄격하게 구분하는것을 알수 있다.

그럼 `for..of` `loop` 에서 어떻게 `Generator`에 있는 리턴값을 가져올수 있을까?

`yield*` 를 통해 값을 가져올수있다. 다음과 같이 코드를 작성하면 `1,2,3` 모두 출력되는것을 확인 할수 있다.

```js
function* generatorOne() {
  yield 1;
  yield 2;
  return 3;
}

function* generatorTwo() {
  let returnValue = yield* generatorOne();
  yield returnValue;
}

for (let key of generatorTwo()) {
   console.log(key);
}
```
### 5. **yield 는 generator 범위를 벗어나면 쓸수없다.**

```js
function* rootGenerator() {
  [1,2,3,4,5].map(function(item) {
    yield item + 1;
  })
}
```
위에 코드처럼 범위(scope) 를 벗어나면 `yield` 를 사용할수 없다.

이밖에도 `Generator` 는 `Thread` 가 아니다 라는점을 강조하는 특징이 있는데

이는 유니티나 C# 에서 사용 하는 `Coroutine` 과 유사한 개념이며 해당 영상에서는

Promise framework 중에 하나인 `bluebird` 를 이용해 `Generator` 활용을 보여주고 있다.

## Promise with Generator
---
>Generator... HMMM... BUT WHAT'S THE POINT?

Generator 가 가진 특징들에 대해서 알아봤지만 도무지 이것을 사용함으로써 얻는 이득이 무엇인가

의문이 들수도 있을것이다.

기존 Promise 문법과 Promise 에서 Corutine 을 사용 했을경우 코드를 비교하면서 알아보고자 한다.

다음은 Express 기반에 서버 사이드에서 디비값을 호출하는 예제이다.

참고로 Reference  `ES6 Generators and asynchronous javascript`  에 있는 예제소스를

조금수정해서 예제를 만들었다. 해당 예제가 이해가지 않는 다면 링크에 있는 예제를 참고해주기 바란다.


```js
//기존 Promise 방식
Router.post('api/ratings',(req,res) => {
  models.ratings.findAll({
    where: {
      user_rating_id: req.decoded.userId
    }
  })
  .then((ratings) => { //순위결과
    models.images.findAll({
      where: {
        user_id: req.decoded.userId
      }
    })
    .then((images) => { //이미지 결과
      let profilePicture;
      if(!images.length) {
        profilePicture = '/placeholder.png'
      }
      else {
        profilePicture = images[0].dataValues.path
      }
      res.json({ //응답
        username: req.decoded.username,
        votes: ratings.length,
        profilePicture: profilePicture
      })
    })
  })
});
```
이걸 Promise.coroutine 방식으로 바꿔보자

```js
Router.post('api/ratings',(req,res) => {
  function getRatings() {
    return models.ratings.findAll({
      where: {
        user_rating_id: req.decoded.userId
      }
    });
  }

  function getImages() {
    return models.images.findAll({
      where: {
        user_id: req.decoded.userId
      }
    });
  }

  function getProfilePicture(images) {
    let profilePicture;
    if(!images.length) {
      return profilePicture = '/placeholder.png'
    }
    else {
      return profilePicture = images[0].dataValues.path
    }
  }

  Promise.coroutine(function*() {
    let ratings = yield getRatings();
    let images = yield getImages();
    let profilePicture = getProfilePicture(images);
    res.json({ //응답
        username: req.decoded.username,
        votes: ratings.length,
        profilePicture: profilePicture
      })
    });
});
```
코드의 단순성과 가독성이 늘어나는것을 볼수 있다.

## Conclusion

NodeJS 개발을 시작한 사람이라면 누구나 경험할수있었던 `callback hell` 이를 개선 하고자

나온것이 `Promise` 그리고 여기서 확장된 보다 낳은 방법이 `Generator` 를 이용한

`Promise.coroutine` 인것같다는 생각이 든다. 

`Generator` 는 `Thread` 가 아니라는것과 `Coroutine` 개념등에 대해서 증명할 예제 코드등

정리할것이 조금더 있을것 같다. 

추가 정리 내용은 따로 포스팅할 계획이다.

## Reference

- [MDN - function* ](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/function*)

- [HACKS - generator](http://hacks.mozilla.or.kr/2015/08/es6-in-depth-generators/)

- [서광열의 코딩스쿨 - 코루틴 이해하기](http://hacks.mozilla.or.kr/2015/08/es6-in-depth-generators/)

- [ES6 Generators and asynchronous javascript](https://alexperry.io/javascript/2015/09/17/es6-generators-and-asynchronous-javascript.html)
