#Templet String

##목적
>문자열 채워넣기.. 등 수많은 기능이 있지만 가장 큰 목표는 String을 조금더 편리하게 쓰기위함!

##새로운 표현방식
```js
context.fillText(`String Templet`,x,y);

let normal = "Normal String";
let templet = `Templet String`; // 키보드 왼쪽위 1옆에 있는 그거!
```

### 대입문
- 어떠한 자바스크립트 표현식도 가능하다
- 원한다면 템플릿 문자열에 템플릿을 포함시키는것도 가능.
#### 예제
```js
function authorize(user, action){
  if(!user.hasPrivilege(action)){
    throw new Error(
      `User ${user.name} is not authorize to do ${action}.`
      //에러처리 넘나 편한것..
      //결과 .. User 최봉재 is not authorize to do 면허
    )
  }
}
```

#### 템플릿 문자열안에 템플릿을 포함시키기
```js
let tem1 = `first`;
let tem2 = `second`;

tem1 + tem2;
// "firstsecond"

```


#### 여러줄도 한 번에!
```js
let multiline = `짜증나는 String처리 모두 잊고싶을때
멀티라인이다.`
```
