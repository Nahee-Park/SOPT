# 이벤트 버블링과 캡처링 그리고 이벤트 위임

## 🐰 이벤트의 발생 단계

표준 DOM 이벤트에서 정의한 이벤트 흐름

1. 캡처링 단계 - 이벤트가 하위 요소로 전파
2. 타깃 단계 - 이벤트가 실제 타깃 요소에 전달
3. 버블링 단계 - 이벤트가 상위 요소로 전파

## 🐰 이벤트 캡처링

- 뜻: 이벤트가 최상위 조상에서 시작해 안래로 전파되는 단계이다! 그러나 이 단계를 이용해야하는 경우는 흔하지 않다
- 캡처링 단계의 이벤트를 잡아내기 위해선 `addEventListenr`의 `capture` 옵션을 임의로 true로 설정해야된다. (디폴트 값인 false는 이벤트 버블링을 잡아내지 못한다.)

```javascript
elem.addEventListener(..., {capture: true})
// 아니면, 아래 같이 {capture: true} 대신, true를 써줘도 됩니다.
elem.addEventListener(..., true)
```

## 🐰 이벤트 버블링

- 뜻: 한 요소에 이벤트가 발생하면 이 요소에 할당된 핸들러 동작 이후 부모 요소의 핸들러가 동작한다. 최상단 부모를 만날 때까지 동작하는데, 거의 모든 이벤트에 적용 되지만 focus와 같이 종종 버블링되지 않는 이벤트도 있다.

```html
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">
  FORM
  <div onclick="alert('div')">
    DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
```

그렇다면, 정확히 어떤 요소에서 이벤트가 발생했는지는 어떻게 알 수 있나?
`event.target` 이용!

> - event.target은 실제 이벤트가 시작된 ‘타깃’ 요소입니다. 버블링이 진행되어도 변하지 않는다.
> - this는 ‘현재’ 요소(event.currentTarget)로, 현재 실행 중인 핸들러가 할당된 요소를 참조한다.

### 🐢 이벤트 버블링 중단하기

- `event.stopPropagation()`를 이용해 중단시킬 수 있다

```html
<body onclick="alert(`버블링은 여기까지 도달하지 못합니다.`)">
  <button onclick="event.stopPropagation()">클릭해 주세요.</button>
</body>
```

오로지 button 만 실행된다

> **그러나 이벤트 버블링 중단은 거의 사용하지 않고, 사용한 핸들러마저 죽은 이벤트가 되어버리기 때문에 섣불리 사용하면 위험하다!**

### 🐢 이벤트 캡처링과 버블링

아래 코드의 실행 양상을 살펴봄으로써 이벤트 캡처링과 버블링을 이해할 수 있다.

```html
<form>
  FORM
  <div>
    DIV
    <p>P</p>
  </div>
</form>

<script>
  for (let elem of document.querySelectorAll("*")) {
    elem.addEventListener(
      "click",
      (e) => alert(`캡쳐링: ${elem.tagName}`),
      true
    );
    elem.addEventListener("click", (e) => alert(`버블링: ${elem.tagName}`));
  }
</script>
```

## 🐰 이벤트 위임

> 캡처링과 버블링을 활용해 강력한 이벤트 핸들 방식인 이벤트 위임을 사용할 수 있다!

- 뜻: 하위 요소에 각각 이벤트를 붙이지 않고 상위 요소에서 하위 요소의 이벤트들을 제어하는 방식

- 사용방법
  1. 컨테이너에 하나의 핸들러를 할당합니다.
  2. 핸들러의 event.target을 사용해 이벤트가 발생한 요소가 어디인지 알아냅니다.
  3. 원하는 요소에서 이벤트가 발생했다고 확인되면 이벤트를 핸들링합니다.

```html
<h1>오늘의 할 일</h1>
<ul class="itemList">
  <li>
    <input type="checkbox" id="item1" />
    <label for="item1">솝트 조별과제</label>
  </li>
  <li>
    <input type="checkbox" id="item2" />
    <label for="item2">솝트 세미나</label>
  </li>
</ul>
```

```javascript
let inputs = document.querySelectorAll("input");
inputs.forEach(function (input) {
  input.addEventListener("click", function (event) {
    alert("clicked");
  });
});
```

input테그를 클릭했을 때 'clicked'창이 뜨게 하려면 기존 방식대로는 하나하나 다 이벤트핸들러를 할당해야 한다.

```javascript
ar itemList = document.querySelector('.itemList');
itemList.addEventListener('click', function(event) {
	alert('clicked');
});
```

### 🐢 React에서의 이벤트 위임

- React v17.0는 자체 이벤트 시스템을 갖기 때문에 이미 리액트가 관리하기 시작하는 div에서 이벤트를 잡아 자체적으로 처리한다
- 이미 성능상의 이득을 보는 방식으로 동작하므로 이벤트 위임을 통한 성능상의 이익은 없다
