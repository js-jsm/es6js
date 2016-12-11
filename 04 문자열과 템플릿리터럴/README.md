# CH 7. Template String - `by 태산`


##1. javascript 의 문자열의 사용

```js
    var str = 'string';
```

자바스크립트에서 String 을 사용하는 방법입니다.  
너무도 당연하고 너무도 간단하지요 ?  
자바스크립트는 자료형이 없는 언어이기때문이죠.  
하지만 문자열을 가지고 virtual dom을 구성하려 한다면 이야기는 조금 복잡해 질 지도 모르겠습니다.  
<br>
그 이야기를 하기 전에 먼저 자바스크립트에서 문자열을 사용해왔었던 방법들을 한번 살펴볼까요.
<br>
<br>

```js
    var str = '저는 총 ';
    
    for(var i = 0; i < 10; i++) {
       if(i === 0) 
         str += i + '부터';
       else 
         str += i == 9 ? i + ' ' : i + ', '
    }
    
    str += '까지 셀 줄 압니다';
    
    //"저는 총 0부터1, 2, 3, 4, 5, 6, 7, 8, 9 까지 셀 줄 압니다"
```

간단한 예제를 한번 준비해보았습니다.  
아마 지금도 많이 치고 있고, 앞으로도 수도 없이 작성해야 하는 코드 종류 중에 하나이겠지요.  
우리는 문자열을 합치기 위해서 수 없이 많은 += 연산자를 사용합니다.  
물론 '\n' 까지 포함해야 한다고 하면, 경우의 수는 더 많이 늘어나겠지요 ?   

그래서 템플릿 리터럴이 등장하게 되었습니다.  



#### - SYNTAX

```js
    const name = `dolen`;
    
    const lineStr = `
        string text1 
        string text2
    `;
    
    const replaceStr = `my nick name is ${name}`;
    
    const funcStr = someFnc `my nick name is ${name}`;
```

사용 방법은 무척이나 간단합니다.  
back-tic key (키보드 숫자 1키 좌측에 위치)를 사용하여 시작하며 마찬가지 닫아줌으로서 종료됩니다.  
재미있는 점은, 별도의 += 연산자 없이 문자열 내부에 어떠한 값들을 위치시킬 수 있다는 점이 되겠네요.  
여기에 들어갈 수 있는 값들은 자바스크립트에서 지원하는 그 어떤 값들도 가능합니다.  
<br>
<br>

#### - Multi Line 

```js
    let multiStrOrigin = 'string ';
    multiStrOrigin += '\n';
    multiStrOrigin += 'new line';
    
    
    
    const multiStrNew = `
        string
        new line
    `;
    
```

ES6의 템플릿 리터럴은 라인 개행을 자동으로 진행해 줍니다.  
그렇다면 \n이 들어있지 않은채로 새로운 방식으로 그냥 보여주기만 그렇게 보여주는 것인가 ?  

```js
    const multiStrNew = `
        string
        new line
    `;
    
    multiStrNew.indexOf('\n')
    0
    multiStrNew.lastIndexOf('\n')
    32
```

그렇지 않고 \n을 치환하여 준다는 사실을 알 수 있습니다.  :) 



#### - Expression interpolation (삽입 표현식)

```js
    const a = 5;
    const b = 10;
    
    let str = 'a is ' + a + ' and b is ' + b;
```
       
기존 자바스크립트로 할 수 있는 표현 방식 입니다.  
이를 타개하기 위해서 ES6에서는 이런 식의 삽입 표현식이 도입되었습니다.  

```js
    const a = 5;
    const b = 10;
    
    const str = `a is ${ a } and b is ${ b }`;
```
 
굉장히 심플해졌죠 ? :)



#### -  Tagged template literals

template literals 의 더욱 발전된 한 형태는 tagged template literals 입니다.  
function를 사용하여 template literals 의 출력을 변형하는데 그를 이용할 수 있습니다.  


```js
    function tag(strings, ...values) {
      console.log(strings[0]); // "Hello "
      console.log(strings[1]); // " world "
      console.log(strings[2]); // ""
      console.log(values[0]);  // 15
      console.log(values[1]);  // 50
    
      return "return string";
    }
    
    tag`Hello ${ a + b } world ${ a * b }`;
    //return string 
```

이처럼 tag함수는 문자열로 이루어진 배열과, ${ expressions }로 이루어진 값들로 구성되게 됩니다.  
문자열은 반드시 strings + 1의 길이로 이루어져있습니다. 마지막에는 반드시 빈 공백 문자열이 들어옵니다.  


```js
    const name = '닉네임:dolen';
    const age  = 30;
    
    const template = (strings, ...values) => {
        let r = strings[0];
        
        for(let i = 0, len = values.length; i < len; i++) 
            r += `${ encodeURIComponent(values[i]) }${ strings[i + 1] }`;
        
        
        return r;
    };
    
    const params = template `/register?name=${ name }&age=${ age }`;
    
    //  /register?name=%EB%8B%89%EB%84%A4%EC%9E%84%3Adolen&age=30
```

함수를 사용하여 문자열의 결과값을 반환할 수 있기 때문에, 잘만 사용한다면 정말 template 의 형태로 응용할 수 있어 보입니다. :)


<br>
<br>
<br>

#### - DOM (Document Object Model) Controller

```js
    const list = [
        {
            name: 'name1',
            age:  30,
            grade: 1
        }, 
        
        {
            name: 'name2',
            age:  30,
            grade: 2
        },
        
        {
            name: 'name3',
            age:  30,
            grade: 1
        }
    ];
```

기본적인 mock data list를 하나 선언해두고, DOM에 대한 이야기를 이어나가보겠습니다.  
수많은 서버 렌더링으로 그려지는 웹사이트들이 많이 존재하고 있습니다.  
하지만 지금은 Async 방식의 Request에 HTML String이 아닌, JSON 데이터가 response되고,   
그 결과를 client에서 rendering 하는 방식도 많이 구현되어 있습니다.  
이럴 경우에 client는 어떤 방식의 rendering을 취하게 될까요 ??  

```js
    
    let result = '<div>';
    
    
    for(let i of list) {
        
        result += '<div>';
        
        if(i.grade === 1) {
            
            result += '사장';
        
        } else {
            
            result += '사원';
            
        }
        
        result += '<span>' + i.name + '</span>';
        result += '<span>' + i.age + '</span>';
        
        result += '</div>';
    }
    
    result += '</div>';
    
    document.body.append(result);
```

이런식으로 표현하게 될 겁니다. 

하지만 이것만으로 문제가 해결되진 않죠.  
왜냐면 우리에겐 각종 attribute가 존재하고 있으니까요.  

```js
    
    let result = '<div class="wrap">';
    
    
    for(let i of list) {
        
        result += '<div class="employee">';
        
        if(i.grade === 1) {
            
            result += '사장';
        
        } else {
            
            result += '사원';
            
        }
        
        result += '<span class="name">' + i.name + '</span>';
        result += '<span class="age">' + i.age + '</span>';
        
        result += '</div>';
    }
    
    result += '</div>';
    
    document.body.append(result);
```

단순히 css class를 추가하였습니다.  
복잡도는 그렇게 증가하지 않았지요 ?  
하지만, 경우에 따라서 css class가 추가되거나 삭제되어야 한다면 ?  
아마 위 코드는 더욱 더 복잡해질 겁니다.  
단순히 클래스를 추가 하기 위해 너무 많은 작업이 들어가는거죠.  

한때는 위 방식이 너무 힘이 들고 번거로워서, 다른 방법을 모색하기도 했었습니다.  

```js
    const template = '<div class="employee>{{name}} / {{age}}</div>';
    
    const data = {
        name: 'name1',
        age:  30
    };
    
    let result = template;
    
    for(const i in data)
        result = result.replace(new RegExp('{{' + i + '}}', 'g'), data[i]);
```

이런식으로 문자열을 replace하는거죠 !  
하지만 그보다는 ES6의 Template Literal을 이용하는 편이 더 좋아 보입니다.  
<br>
<br>



```js
    
    let result = '';
                
    for(let i of list) 
        result += `
            <div class="employee ${i.grade === 1 ? 'owner' : 'normal'}">
                <span class="position">${i.grade === 1 ? '사장' : '사원'}</span>
                <span class="name">${ i.name }</span>
                <span class="age">${ i.age }</span>
            </div>
        `;
    
    document.body.append(`<div class="wrap">${ result }</div>`);
```

Template Literal 이었습니다. :)
##1. javascript 의 문자열의 사용

```js
    var str = 'string';
```

자바스크립트에서 String 을 사용하는 방법입니다.  
너무도 당연하고 너무도 간단하지요 ?  
자바스크립트는 자료형이 없는 언어이기때문이죠.  
하지만 문자열을 가지고 virtual dom을 구성하려 한다면 이야기는 조금 복잡해 질 지도 모르겠습니다.  
<br>
그 이야기를 하기 전에 먼저 자바스크립트에서 문자열을 사용해왔었던 방법들을 한번 살펴볼까요.
<br>
<br>

```js
    var str = '저는 총 ';
    
    for(var i = 0; i < 10; i++) {
       if(i === 0) 
         str += i + '부터';
       else 
         str += i == 9 ? i + ' ' : i + ', '
    }
    
    str += '까지 셀 줄 압니다';
    
    //"저는 총 0부터1, 2, 3, 4, 5, 6, 7, 8, 9 까지 셀 줄 압니다"
```

간단한 예제를 한번 준비해보았습니다.  
아마 지금도 많이 치고 있고, 앞으로도 수도 없이 작성해야 하는 코드 종류 중에 하나이겠지요.  
우리는 문자열을 합치기 위해서 수 없이 많은 += 연산자를 사용합니다.  
물론 '\n' 까지 포함해야 한다고 하면, 경우의 수는 더 많이 늘어나겠지요 ?   

그래서 템플릿 리터럴이 등장하게 되었습니다.  



#### - SYNTAX

```js
    const name = `dolen`;
    
    const lineStr = `
        string text1 
        string text2
    `;
    
    const replaceStr = `my nick name is ${name}`;
    
    const funcStr = someFnc `my nick name is ${name}`;
```

사용 방법은 무척이나 간단합니다.  
back-tic key (키보드 숫자 1키 좌측에 위치)를 사용하여 시작하며 마찬가지 닫아줌으로서 종료됩니다.  
재미있는 점은, 별도의 += 연산자 없이 문자열 내부에 어떠한 값들을 위치시킬 수 있다는 점이 되겠네요.  
여기에 들어갈 수 있는 값들은 자바스크립트에서 지원하는 그 어떤 값들도 가능합니다.  
<br>
<br>

#### - Multi Line 

```js
    let multiStrOrigin = 'string ';
    multiStrOrigin += '\n';
    multiStrOrigin += 'new line';
    
    
    
    const multiStrNew = `
        string
        new line
    `;
    
    multiStrNew.indexOf('\n')
    0
    multiStrNew.lastIndexOf('\n')
    32
```

ES6의 템플릿 리터럴은 라인 개행을 자동으로 진행해 줍니다.  
그렇다면 \n이 들어있지 않은채로 새로운 방식으로 그냥 보여주기만 그렇게 보여주는 것인가 ?  

```js
    const multiStrNew = `
        string
        new line
    `;
    
    multiStrNew.indexOf('\n')
    0
    multiStrNew.lastIndexOf('\n')
    32
```

그렇지 않고 \n을 치환하여 준다는 사실을 알 수 있습니다.  :) 



#### - Expression interpolation (삽입 표현식)

```js
    const a = 5;
    const b = 10;
    
    let str = 'a is ' + a + ' and b is ' + b;
```
       
기존 자바스크립트로 할 수 있는 표현 방식 입니다.  
이를 타개하기 위해서 ES6에서는 이런 식의 삽입 표현식이 도입되었습니다.  

```js
    const a = 5;
    const b = 10;
    
    const str = `a is ${ a } and b is ${ b }`;
```
 
굉장히 심플해졌죠 ? :)



#### -  Tagged template literals

template literals 의 더욱 발전된 한 형태는 tagged template literals 입니다.  
function를 사용하여 template literals 의 출력을 변형하는데 그를 이용할 수 있습니다.  


```js
    function tag(strings, ...values) {
      console.log(strings[0]); // "Hello "
      console.log(strings[1]); // " world "
      console.log(strings[2]); // ""
      console.log(values[0]);  // 15
      console.log(values[1]);  // 50
    
      return "return string";
    }
    
    tag`Hello ${ a + b } world ${ a * b }`;
    //return string 
```

이처럼 tag함수는 문자열로 이루어진 배열과, ${ expressions }로 이루어진 값들로 구성되게 됩니다.  
문자열은 반드시 strings + 1의 길이로 이루어져있습니다. 마지막에는 반드시 빈 공백 문자열이 들어옵니다.  


```js
    const name = '닉네임:dolen';
    const age  = 30;
    
    const template = (strings, ...values) => {
        let r = strings[0];
        
        for(let i = 0, len = values.length; i < len; i++) 
            r += `${ encodeURIComponent(values[i]) }${ strings[i + 1] }`;
        
        
        return r;
    };
    
    const params = template `/register?name=${ name }&age=${ age }`;
    
    //  /register?name=%EB%8B%89%EB%84%A4%EC%9E%84%3Adolen&age=30
```

함수를 사용하여 문자열의 결과값을 반환할 수 있기 때문에, 잘만 사용한다면 정말 template 의 형태로 응용할 수 있어 보입니다. :)


<br>
<br>
<br>

#### - DOM (Document Object Model) Controller

```js
    const list = [
        {
            name: 'name1',
            age:  30,
            grade: 1
        }, 
        
        {
            name: 'name2',
            age:  30,
            grade: 2
        },
        
        {
            name: 'name3',
            age:  30,
            grade: 1
        }
    ];
```

기본적인 mock data list를 하나 선언해두고, DOM에 대한 이야기를 이어나가보겠습니다.  
수많은 서버 렌더링으로 그려지는 웹사이트들이 많이 존재하고 있습니다.  
하지만 지금은 Async 방식의 Request에 HTML String이 아닌, JSON 데이터가 response되고,   
그 결과를 client에서 rendering 하는 방식도 많이 구현되어 있습니다.  
이럴 경우에 client는 어떤 방식의 rendering을 취하게 될까요 ??  

```js
    
    let result = '<div>';
    
    
    for(let i of list) {
        
        result += '<div>';
        
        if(i.grade === 1) {
            
            result += '사장';
        
        } else {
            
            result += '사원';
            
        }
        
        result += '<span>' + i.name + '</span>';
        result += '<span>' + i.age + '</span>';
        
        result += '</div>';
    }
    
    result += '</div>';
    
    document.body.append(result);
```

이런식으로 표현하게 될 겁니다. 

하지만 이것만으로 문제가 해결되진 않죠.  
왜냐면 우리에겐 각종 attribute가 존재하고 있으니까요.  

```js
    
    let result = '<div class="wrap">';
    
    
    for(let i of list) {
        
        result += '<div class="employee">';
        
        if(i.grade === 1) {
            
            result += '사장';
        
        } else {
            
            result += '사원';
            
        }
        
        result += '<span class="name">' + i.name + '</span>';
        result += '<span class="age">' + i.age + '</span>';
        
        result += '</div>';
    }
    
    result += '</div>';
    
    document.body.append(result);
```

단순히 css class를 추가하였습니다.  
복잡도는 그렇게 증가하지 않았지요 ?  
하지만, 경우에 따라서 css class가 추가되거나 삭제되어야 한다면 ?  
아마 위 코드는 더욱 더 복잡해질 겁니다.  
단순히 클래스를 추가 하기 위해 너무 많은 작업이 들어가는거죠.  

한때는 위 방식이 너무 힘이 들고 번거로워서, 다른 방법을 모색하기도 했었습니다.  

```js
    const template = '<div class="employee>{{name}} / {{age}}</div>';
    
    const data = {
        name: 'name1',
        age:  30
    };
    
    let result = template;
    
    for(const i in data)
        result = result.replace(new RegExp('{{' + i + '}}', 'g'), data[i]);
```

이런식으로 문자열을 replace하는거죠 !  
하지만 그보다는 ES6의 Template Literal을 이용하는 편이 더 좋아 보입니다.  
<br>
<br>



```js
    
    let result = '';
                
    for(let i of list) 
        result += `
            <div class="employee ${i.grade === 1 ? 'owner' : 'normal'}">
                <span class="position">${i.grade === 1 ? '사장' : '사원'}</span>
                <span class="name">${ i.name }</span>
                <span class="age">${ i.age }</span>
            </div>
        `;
    
    document.body.append(`<div class="wrap">${ result }</div>`);
```

Template Literal 이었습니다. :)