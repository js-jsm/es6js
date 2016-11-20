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

#### Tagged Templet

 > 태그된 템플릿은 단지 시작하는 백틱 앞에 태그(tag)를 하나 더 붙인 템플릿 문자열입니다.

일반 템플릿 문자열이 가진 한계점을 보완 할 수 있다. 

##### HTML 파싱
```js
var message =
  SaferHTML(templateData, bonk.sender);

  function SaferHTML(templateData) {
    var s = templateData[0];
    for (var i = 1; i < arguments.length; i++) {
      var arg = String(arguments[i]);
  
      // 대입문의 특수 문자들을 이스케이프시켜 표현합니다.
      s += arg.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");
  
      // 템플릿의 특수 문자들은 이스케이프시키지 않습니다.
      s += templateData[i];
    }
    return s;
  }
  
```
>이렇게 태그된 템플릿을 정의하면 SaferHTML`<p>${bonk.sender} has sent you a bonk.</p>`은 "<p>ES6&lt;3er has sent you a bonk.</p>" 처럼 전개될 것입니다. 이제 당신의 코드는 Hacker Steve <script>alert('xss');</script>처럼 위험한 이름을 갖는 사용자도 안전하게 처리할 수 있습니다.




##### 다국어 지원

>템플릿 문자열에는 내장된 다국어 지원 기능이 없습니다. 하지만 태그를 이용하면 그런 기능을 추가할 수 있습니다. 

```js
i18n`Hello ${name}, you have ${amount}:c(CAD) in your bank account.`
// => Hallo Bob, Sie haben 1.234,56 $CA auf Ihrem Bankkonto.
// 캐나나 달러 
```

#### 템플릿 언어

>Tagged Templet 자체가 문자열 필요도 없을정도로 유연하다. 

```js
// ES6 태그된 템플릿(tagged templates)을 기반으로 만든
// 순전히 샘플로 만들어본 템플릿 언어
var libraryHtml = hashTemplate``
  <ul>
    #for book in ${myBooks}
      <li><i>#{book.title}</i> by #{book.author}</li>
    #end
  </ul>
``;
```

#### 마크다운에서는??

```js
To display a message, write ``alert(`hello world!`)``.

///To display a message, write alert(hello world!).
```
> 이 문제는 마크다운이 지원하는 트릭을 이용하면 피할 수 있습니다. 다음처럼 코드 영역을 구분하기 위해 백틱을 여러개 쓰면 됩니다.
