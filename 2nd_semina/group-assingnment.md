# 구조 분해 할당(객체 비구조화 할당)과 spread 연산자

### 🙈 Intro

> 종종 함수에 객체나 배열 전체가 아닌 일부만을 전달해야 하는 경우가 있습니다. 그런 경우 객체나 배열을 변수로 분해할 수 있게 해주는 것이 "구조 분해 할당(객체 비구조화 할당)" 입니다!

## 목차

1. [배열 분해하기](##-🐰-배열-분해하기)
2. [객체 분해하기](##-🐰-객체-분해하기)
3. [깊은 구조분해 할당](##-🐰-깊은-구조-분해-할당)
4. [함수의 매개변수에 응용하기](##-🐰-함수의-매개변수에-응용하기)

## 🐰 Why use?

1. 객체 속 프로퍼티에 자주 접근해야하는 경우 쉽고 코드 깔끔하게 접근 가능
2. 변수 값 교환 시 temp 없이 간단하게 교환 가능
3. 함수의 매개변수가 너무 많은 경우, 매개변수의 기본값이 필요한 경우

우선 분해하는 방식에 대해 알아보고 어떤 식으로 사용할 수 있는 지 보도록 하겠습니다!

## 🐰 배열 분해하기

### 1. 배열 전체 분해하기

> 배열은 기본적으로 순서가 있기 대문에 순서를 기반으로 할당됩니다.

```javascript
let name = ["rice", "Glutinous"];

//이 배열을 fistName과 lastName 변수에 각각 할당해봅시다
let = [firstName, lastName] = name;

console.log(firstName); //rice
console.log(lastName); //Glutinous
```

이렇듯 배열형의 자료를 변수로 할당할 수 있습니다.
배열형 자료 뿐만 아니라 배열형을 리턴하는 메서드와도 함께 사용할 수 있습니다.

```javascript
let [firstName, lastName] = "rice Glutinous".split(" ");
//.split('')는 괄호 안을 기준으로 분리해 배열값을 반환한다!
```

주의할 것은 값을 분해해서 할당하는 것이지, 파괴하는 것이 아니기 때문에 _분해된 대상은 수정, 파괴되지 않습니다_

### 2. 배열 일부 분해하기

```javascript
// 필요하지 않은 요소는 쉽표로 무시하기
let [firstName, , lastName] = ["rice", "yummy", "Glutinous", "favorite"];

console.log(lastName); //Glutinous
```

이 예제를 보면, 쉼표로 무시한 `"yummy"`는 분해되지 않았고, 할당될 인자가 부여되지 않은 `"favorite"`역시 할당되지 않았습니다.

### 3. 배열 나머지요소 뭉탱이로 분해하기

배열값 중 일부는 각각의 요소로, 일부는 한데모아서 저장하고 싶을 때 '...' 연산자를 이용해서 rest요소들을 가져옵니다!

```javascript
let animal = ["cat", "dog", "rabbit", "tiger", "lion", "hippo"];

//나머지는 뭉탱이로 구조분해 할당하고 싶음!
let [cute1, cute2, cute3, ...rest] = animal;

console.log(cute1); //cat
console.log(cute2); //dog
console.log(cute3); //rabbit

//rest는 남은 아이들의 배열이다!
console.log(rest[0]); //tiger
console.log(rest[1]); //lion
console.log(rest[2]); //hippo
```

_주의할 것은 `...rest`는 마지막 요소로만 쓰일 수 있다는 것이다!_

+) spread 연산자와 rest

- spread는 전체 요소를 가져올 때 쓰이고, rest는 전체 요소 중 남은 요소들을 한 번에 가져올 때 쓰입니다
- spread는 주로 합할 때, rest는 분해할 때 쓰이고, 구조분해할당과정에서 이용되는 것은 rest입니다

```javascript
//spread 예시
const numbers = [1, 2, 3, 4, 5];

const spreadNumbers = [...numbers, "다시 반복", ...numbers];
console.log(spreadNumbers); // [1, 2, 3, 4, 5, "다시 반복", 1, 2, 3, 4, 5]

//rest 예시
const [first, second, ...restNumbers] = numbers;
console.log(restNumbers); //[3,4,5]
```

### 4. 할당하고자 하는 변수가 분해하고자 하는 길이와 다를 경우

- 할당하고자 하는 변수의 개수 < 배열의 길이 : 할당변수의 개수 만큼의 인자만 배열에서 할당됩니다.
- 할당하고자 하는 변수의 개수 > 배열의 길이 : undefined가 채워집니다

_그런데 만약 undefined가 아니라 다른 값을 넣고 싶다면!? -> 기본값 설정하기_

```javascript
let name = ["Lee"];
let [
  lastName = prompt("성을 입력하세요"),
  name = prompt("이름을 입력하세요"),
] = name;

console.log(lastname); //Lee (배열에서 분해해서 가져온 값)
console.log(name); //prompt에서 받아온 기본값, 기본값 설정이 안되어있었으면 undefined였을 것!
```

## 🐰 객체 분해하기

> 객체는 배열과는 달리 순서가 없기 때문에 각 요소들을 통해 구조 분해 할당을 할 수 있습니다.  
> 주의할 것은, 배열은 요소명이 없었기 때문에 아무 이름의 변수에 할당했지만, 객체는 객체프로퍼티의 이름을 통해서 할당해야합니다.

### 1. 객체 전체 분해하기

- 기본문법

```javascript
let { var1, var2 } = { var1:..., var2:... };
```

- 객체 프로퍼티의 순서와 이름을 바꿔 할당하는 에시

```javascript
let product = {
  title: "iphone",
  width: 71.5,
  height: 146.7,
};

// 순서는 상관 없으며. {객체 프로퍼티: 목표 변수}를 통해 할당변수명을 바꿀 수 있다.
let { width: w, height: h, title } = product;
// width -> w
// height -> h
// title -> title

alert(title); // iphone
alert(w); // 71.5
alert(h); // 146.7
```

### 2. 객체 일부 분해하기

- 할당된 프로퍼티만 실제로 할당됩니다.

```javascript
let product = {
  title: "iphone",
  width: 71.5,
  height: 146.7,
};

//할당 프로퍼티만 할당된다
let { title } = product;
console.log(title); //iphone
```

### 3. 객체 나머지 요소 뭉탱이로 분해하기

- `...` 연산자를 이용해 나머지를 객체로 묶을 수 있습니다.

```javascript
let product = {
  title: "iphone",
  width: 71.5,
  height: 146.7,
};

//배열과 마찬가지로 ... 연산자를 이용해 나머지를 뭉뚱그려 저장할 수 있다.
let { title, ...size } = product;
console.log(size); //{width: 71.5, height: 146.7}
```

### 4. 객체 기본값 설정

- `=`을 통해 디폴트값을 설정할 수 있습니다.
- `=`(클론)과 `:`(할당연산자) 를 동시에 사용할 수 있습니다

```javascript
let product = { title: "iphone" };

let { width: w = 10, height: h = 20, title } = product;

console.log(title); //iphone(실제 product객체에서 가져와서 할당한 값)
consile.log(w); //10(비어있으므로 기본값이 할당된다)
consile.log(h); //20(비어있으므로 기본값이 할당된다)
```

## 🐰 깊은 구조 분해 할당

- 객체나 배열 속에 객체나 배열이 있는 경우 깊숙한 곳에 있는 변수를 꺼내올 수 있습니다.

```javascript
let deepObj = {
  userInfo: {
    name: "찹쌀선과",
    type: ["red", "green"],
    age: 22,
  },
  count: 10,
};
//한번에 구조 분해 하기
let extracted = ({
  userInfo: { name, type: color, age },
  count,
} = deepObj);

console.log(name); //찹쌀선과
console.log(color); //["red","green"]
console.log(age); //22
console.log(count); //10
```

## 🐰 함수의 매개변수에 응용하기

- 함수에선 우리가 파라미터로 넘기는 값이 undefined해도 자동으로 객체를 분해해 변수에 할당합니다.
- 구조분해할당의 문법이 함수 매개변수에선 자동적으로 이용됨을 알 수 있습니다!

```javascript
// 함수에 전달할 객체
let options = {
  title: "My menu",
  items: ["Item1", "Item2"],
};

// 똑똑한 함수는 전달받은 객체를 분해해 변수에 즉시 할당함
function showMenu({
  title = "Untitled",
  width = 200,
  height = 100,
  items = [],
}) {
  // title, items – 객체 options에서 가져옴
  // width, height – 기본값
  alert(`${title} ${width} ${height}`); // My Menu 200 100
  alert(items); // Item1, Item2
}

showMenu(options);
```

- 함수가 객체를 매개로 받을 때에는 반드시 인자가 전달된다고 가정하기 때문에 객체가 전달이 아예 안되는 상황도 고려를 해야할 때가 있습니다.
- 그런 경우 모든 인수에 기본값으로 빈객체를 대입해 에러발생 위험 없앨 수 있습니다.

```javascript
//기본적으로 빈 객체를 값으로 넣어둠
function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
  alert(`${title} ${width} ${height}`);
}

//빈 객체가 전달되어도 기본값이 잘 출력됨!
showMenu(); // Menu 100 200
```

### 🙉 Epilogue

> 객체나 배열을 변수로 연결할 수 있는 구조분해할당 !!!
> 잘 정리해서 코드를 깔끔하게 쓸 때 이용해봐야겠습니당
