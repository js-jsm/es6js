
### 1. Reflection의 정의
ES6의 Reflection을 알아보기 전에 먼저 자바의 Reflection의 개념에 대해서 알아보겠습니다.  
**Reflection**이란 사전적으로 **'거울에 비친 그림자, 반사'**등의 의미로 사용 되는 단어 입니다.  
조금만 생각해 보자면, Reflection은 사전적 의미를 그대로 따른다고 볼 수 있습니다.  

Reflection은 객체의 형태를 모르고, 메모리만 알고 있더라도 그 형태를 알아낼 수 있게 해주는 프로그래밍 기법이라고 볼 수 있습니다.  
만약 객체의 메모리만 알고 있고, 그 메모리의 주체의 형태를 모른다고 가정해 볼까요.

```java
class Test {
    private String value;
     
    public String getValue() {
        return this.value;
    }
}

public class TestMain {
    public static void test(Object o) {
        o.getValue(); //Compile Error
    }
    
    public static void main(String [] args) {
        test(new Test());   
    }
}

```

위의 경우에는 컴파일 에러가 발생하게 됩니다.  
Object class에는 getValue() 메소드가 존재하지 않기 때문이죠.  
<br>

```java
class A {
    private String name;
    private String gender;

    public A() {}

    public A(String name) {
        this.name = name;
    }

    public A(String name, String gender) {
        this.name = name;
        this.gender = gender;
    }

    public void testMethod() {
        System.out.println("The Test Method");
    }

    public static String print(String str) {
        System.out.println(str);
        return str;
    }
}
```

그렇다면 이번에는 A라는 class를 정의해보고 알아보도록 하겠습니다.  

```java
public class Relection {

    public static void main(String[] args) throws Throwable{

        //class 정보를 가져옵니다.
        Class cls = A.class;


        //생성자의 정보를 확인합니다.
        for(Constructor constructor : cls.getDeclaredConstructors()) {

            System.out.println(constructor.getName() + " : constructor name");

            for(Parameter param : constructor.getParameters())
                System.out.println(param + " : param");

            for(Class type: constructor.getParameterTypes())
                System.out.println(type + " : type");
        }


        System.out.println("------------------------------------------------------");


        //선언된 필드를 확인 합니다.
        for(Field field : cls.getDeclaredFields()) {
            System.out.println(field.getName() + " : name");
            System.out.println(field.getType() + " : type");
            System.out.println(field.getDeclaringClass() + " : class");
        }


        System.out.println("------------------------------------------------------");

        //method를 실행 합니다.
        for(Method method : cls.getMethods()) {
            System.out.println(method.getName() + " : name");

            if(method.getName().equals("print")) {
                method.invoke(cls.newInstance(), "print to the " + method.getName());
            }
        }
    }
}
```

```text
com.company.java8.java.java8.mains.A : constructor name
java.lang.String arg0 : param
java.lang.String arg1 : param
class java.lang.String : type
class java.lang.String : type
com.company.java8.java.java8.mains.A : constructor name
java.lang.String arg0 : param
class java.lang.String : type
com.company.java8.java.java8.mains.A : constructor name
------------------------------------------------------
name : name
class java.lang.String : type
class com.company.java8.java.java8.mains.A : class
gender : name
class java.lang.String : type
class com.company.java8.java.java8.mains.A : class
------------------------------------------------------
print : name
print to the print
testMethod : name
wait : name
wait : name
wait : name
equals : name
toString : name
hashCode : name
getClass : name
notify : name
notifyAll : name
```

보다시피, 우리는 객체를 참조하여 해당 객체의 클래스 정보를 모두 가져와서 확인할 수 있을 수 있다는것을 확인하였습니다.  
어떻게 이런일이 가능할지에 대해서 잠시 알아볼까요.  
우선은 컴파일과 인터프리터 과정에 대해서 살짝 이해할 필요가 있습니다.  
<br>
우리는 자바로 프로그래밍 코드를 작성하게 되는데, 그 결과로는 항상 **ClassName.java** 파일이 생성되게 됩니다.  
**.java** 파일을 사용하여 **compile**과정을 거치게 되면, JVM이 읽어들일 수 있는 기계어인, 바이트 코드로 변환시키게 되어 **ClassName.class** 파일을 생성하게 됩니다.  
그러면 **java.exe** 프로그램이 JVM을 기동시키면서 인터프리터 방식으로 해당 기계어를 한라인씩 읽어들여 OS에 맞는 기계어로 컴파일해주게 되고 그 코드를 사용하여 Application을 실행하게 됩니다.  
매번 코드가 실행될 때마다 말이죠.  
<br>
즉, 코드상에서는 모든 객체가 상속받고 있는 Object의 형태로 메소드의 매개변수를 전달받을 수 있게 된다는 이야기도 됩니다. 매번 **.class**의 바이트 코드를 읽어들여 OS에 맞는 기계어로 매번 다시 컴파일 하고 실행시키기 때문이죠.  
<br>
모든 객체가 상속받고 있는 Object의 형태로 메소드의 매개변수를 전달받을 수 있다는 것은 그 어떤 것도 전달받을 수 있게 됨과 동시에, 그 어떤것이 넘어오는지 모를 수도 있다는 이야기이기도 하지요.  
그래서 객체의 주소값을 가지고 해당 객체의 형태를 알아낼 필요가 있을 때가 있습니다.  
그리고 이 방식을 **Reflection** 이라고 하는거지요.  

그럼 어떻게 런타임중의 객체의 메모리만으로 해당 정보를 알아낼 수 있느냐에 대한 고민 또한 해볼 필요가 있게 됩니다.  
자바의 클래스 파일들은 앞서 말씀드렸다 시피 **.class**파일로 컴파일되어 static 영역에 존재하게 되는데요.  
이 이야기는 객체의 이름을 알 수 있다면 static 영역에 존재하는 언제든 클래스의 구조를 얻어낼 수 있다는 이야기이기도 합니다.  

그렇다면, 상식적으로 내가 프로그래밍을 하고 있는데 메소드에 전달되어질 매개변수의 형을 모를 때가 있을까요 ?? 의외로 많이 존재하며 알게 모르게 많이 사용되고 있다고 합니다.  

대표적으로 IDE의 자동완성기능이나 스프링의 BeanFactory, 또는 Annotaion등에서 사용되어 집니다.  
부착되어질 클래스가 어느 클래스인지는 모르지만, 일단 작성 하고 런타임에서 확인하여 적용시키는 것이죠.  

또한 이 Reflection의 기능과 REST API를 적용시키면 Spring One Controller도 구현할 수 있게 됩니다.  


### 2. ES6 - Reflect
자 그렇다면 ES6의 객체 리플렉션 (객체 프로퍼티를 들여다보고 조작하는 등의 프로그래밍)에 대해서 알아보겠습니다. 
```javascript
const r = new Reflect(); //Reflect is not a constructor
Reflect(); // Reflect is not a function
```
Reflect는 함수 객체가 아니므로 호출할 수 없고 new 연산자를 이용하여 생성할 수도 없습니다.  


#### Reflect.apply
**Object.prototype.apply**와 동일한 기능을 합니다. 
매개변수는 총 3가지를 전달하게 되는데, **(fnc, bindObject, [params])** 순으로 전달 됩니다.
 
```javascript
function fnc(a, b) {
  console.log(a, b, this.test); 
}

Reflect.apply(fnc, {test: 3}, [1, 2]); // 1, 2, 3

fnc.apply({test: 3}, [1, 2]); //1, 2, 3 
```


#### Reflect.constructor
new 연산자를 사용하여 객체를 생성하는것과 동일한 효과를 냅니다.  
```javascript
function Test(a, b) {
    this.a = a;
    this.b = b;
    this.f = function() {
        console.log(this.a, this.b, this.c);
    }
}

function Test2() {
    this.c = 30;
}

Test2.prototype.c = 50;

var data = Reflect.construct(Test, [1, 2], Test2);


console.log(data.f()); //1, 2, 50

Test2.prototype.c = 3;

console.log(data.f()); //1, 2, 3
```
new 와 동일하게 prototype 체이닝을 상속합니다. 매개변수로 전달되는 인자는 총 3가지이며
1. 첫번째 인자는 타깃 생성자가 됩니다.  
2. 두번째 인자는 첫번째 생성자의 매개변수입니다.  
3. 세번째 인자는 타깃 생성자의 prototype으로 사용할 생성자 입니다.  

```javascript
class Test1 {
  constructor(a, b) {
    this.a = a;
    this.b = b;
    this.f = () => console.log(this.a, this.b, this.test());
  }
}

class Test2 {
   constructor() {
     console.log('init');
	 this.c = 30;
   }
   
   test() {
     console.log('test method');
     return 30;
   }
}


var data = Reflect.construct(Test1, [1, 2], Test2); //1, 2, 30
```

두번째로 전달된 객체는 prototype으로서의 기능만 수행하기 때문에 constructor는 실행되지 않습니다.  

