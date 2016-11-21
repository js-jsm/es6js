# Module

## Modul이란?
> 연돤된 객채, 함수, 기타, 컴포넌트를 함께 말아 넣은 컬렉션이고,
> 나머지 프로그램/라이브러리의 스코프와는 분리되어 있다.
> 외부 프로그램에 특정 변수를 익스포트 하여 모듈로 감싼 컴포넌트에 접근 가능하며
> 모듈은 하위 모듈로 나누어지므로 모듈간 계층관계가 형성된다.


## ES2015 의 Module
- ES2015 modul은 모듈마다 개별 js파일에 자바스크립트 코드로 구현
- 원하는 갯수만큼 변수를 export
- 구문이 간결하다.

## Module export
```js
export { variable };
export { variable1, variable2, variable3, ... };
export { variable as myVariable }; //치환
export { variable as myVariable, variable2 as myVariable2 }; //여러개 치환
export { variable as default }; //default를 치환
export { variable as default, variable1 as myVariable1, variable2 };
export default function() {};

//사용은 가능하나 권장되지 않는 방법(저는 and 양희경)
export { variable1, variable2 } from "./myModuleFile";
export * from "./myModuleFile";
```

## Module import
```js
import { variable } from './myModuleFile';
import { variable1, variable2, variable3, ... } from './myModuleFile';
import { myVariable as whatever } from './myModuleFile';
import { myVariable1 as whatever1, myVariable2 as whatever2 } from './myModuleFile';
import variable from './myModuleFile';
import { variable1, variable2 } from './myModuleFile';
import { variable1, variable2 as variable3 } from './myModuleFile';
import variable, { variable1, variable2 } from './myModuleFile';
import './myModuleFile'; //의존성 주입(?)
import * as variable from './myModuleFile';
import variable, * as variable1 from './myModuleFile';
```
