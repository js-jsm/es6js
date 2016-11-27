#tmplate String

##목적
문자열 채워넣기.. 등 수많은 기능이 있지만 가장 큰 목표는 String을 조금더 편리하게 쓰기위함!

##새로운 표현방식
```js
context.fillText(`String tmplate`,x,y);

let normal = "Normal String";
let tmplate = `tmplate String`; // 키보드 왼쪽위 1옆에 있는 그거!
```

### 대입문
- 어떠한 자바스크립트 표현식도 가능하다
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
```


#### Tagged template

 > 태그된 템플릿은 단지 시작하는 백틱 앞에 태그(tag)를 하나 더 붙인 템플릿 문자열입니다.

일반 템플릿 문자열이 가진 한계점을 보완 할 수 있다. Tagged tmplate 자체가 문자열 필요도 없을정도로 유연하다.



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

>이렇게 태그된 템플릿을 정의하면 SaferHTML``<p>${bonk.sender} has sent you a bonk.</p>``은 "<p>ES6&lt;3er has sent you a bonk.</p>" 처럼 전개될 것입니다. 이제 당신의 코드는 Hacker Steve <script>alert('xss');</script>처럼 위험한 이름을 갖는 사용자도 안전하게 처리할 수 있습니다.




##### 다국어 지원

>템플릿 문자열에는 내장된 다국어 지원 기능이 없습니다. 하지만 태그를 이용하면 그런 기능을 추가할 수 있습니다.

```js
i18n`Hello ${name}, you have ${amount}:c(CAD) in your bank account.`
// => Hallo Bob, Sie haben 1.234,56 $CA auf Ihrem Bankkonto.
// 캐나나 달러
```

#### 템플릿 언어

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

### Tag Function
```js
function tagFunction( firstName, lastName){
  console.log(`${firstName} ${lastName}!`);
}
//아래 호출 구문
tagFunction`Hello ${firstName} ${lastName}!`
```
식 뒤에 템플릿 리터럴을 놓는 것은 함수호출을 발생 시키고, 이것은 변수 리스트(괄호 안에 컴마로 구분된 값)가 함수 호출을 발생시키는것과 유사하다. 이전의 코드는 아래의 함수 호출과 동등합니다. (실제로 이 함수는 더 많은 정보를 얻지만 이건 이후에 설명하겠다.)
```js
tagFunction(['Hello ', ' ', '!'], firstName, lastName)
```
따라서, 역 따옴표로 둘러쌓인 컨텐트 이전에 나오는 이름은 호출 될 함수(태그 함수)의 이름이다. 이 태그 함수는 두 종류의 데이터를 받는다.

- 'Hello' 와 같은 템플릿 문자열.
- firstName (${}로 구분된) 치환자. 치환자는 어떤 표현도 될 수 있다.

##### 좀 더 실용적인 예제 (질의어)
 ```js
//1
$`a.${className}[href=~'//${domain}/']`
/* 이 돔 쿼리는 css class 가 className이고, 그 타겟이 주어진 domain이 url인 모든 a 태그를 찾는다. 이 태그 함수 $는 인자들은 정확하게 이스케이프 하고, 문자열 연결 보다 더 안전한 접근을 보장한다.*/

//2
const tmpl = addrs => html`
    <table>
    ${addrs.map(addr => html`
        <tr><td>$${addr.first}</td></tr>
        <tr><td>$${addr.last}</td></tr>
    `)}
    </table>
`;
const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];
console.log(tmpl(data));
// Output:
// <table>
//
//     <tr><td>&lt;Jane&gt;</td></tr>
//     <tr><td>Bond</td></tr>
//
//     <tr><td>Lars</td></tr>
//     <tr><td>&lt;Croft&gt;</td></tr>
//
// </table>
```
