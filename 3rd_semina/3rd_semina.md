# React 이해하기

# Why use?

## SPA 등장

1.  SPA 등장 -> JS 유지 보구 위한 라이브러리, 프레임워크 중요성 대두 ) index.html 하나로 모든 것을 해결한다!
2.  기존엔 MPA여서 -> html, css, js 모두 로딩해야함 but 이젠 일부만 렌더링
3.  장단점이 있음 -> 단점 ) 초기 구동속도 느림, 검색 엔진 최적화가 여러운데 SSR로 해결 가능

# 기본 문법

## 시작 방법

1. 프로젝트를 만들고 싶은 파일에 `npx create-react-app 리액트만들파일명` 를 실행하면 리액트만들파일명 디렉터리가 생기고 그 안에 리엑트 프로젝트가 생성된다.
2. 쓸데없는 파일들 지우고, `index.html` `index.js` 만 남겨둔 이후 정리한다.
3. `cd 프로젝트 있는 파일`
4. `yarn start `를 통해 실행한다.

+) `npm install axios --save` axios 사용할 땐 이거 꼭 설치해준다!

## 핵심 특징

### 1. Component

- UI 구성하는 개별 뷰 단위 ) 적절하게 쪼개서 재사용성 높이기
- 컴포넌트 조합새 새로운 컴포턴트 만들거나, 복잡한 웹 페이지 사용 가능
- 클래스형 / 함수형 두 종류가 있음 ) 클래스형은 잘 사용하지 않는다

### 2. Virtual Dom

- DOM 요소 변경되면 원래 Render Tree가 만들어짐 -> 바뀔 때마다 새로운 렌더 트리
- Virtual Dom은 변경부분만 탐지해서 Dom에 적용 ) 연산 최소화, 성능 개선

### 3. One-way Data Flow ) React

- input 값이 바로 value로 저장되지 않음. 무조건 event를 거쳐야 변수에 반영된다. (onChange)

  +) Two-way Data Flow ) vue -> 사용자가 입력한 값이 바로 value에 저장

### 4. JSX

- JS를 확장해서 React요소 생성하는 문법 ) html과 js를 결합한 형태.

## 핵심 문법

### 1. Props & State

> React에서 다루는 데이터 종류!

- Props : 정적 데이터 -> 부모컴포넌트에서 자식 컴포넌트로 데이터 넘겨줌.  
  넘겨줄 땐 자식변수명={부모변수명}  
  받을 땐 props 또는 {자식변수명}

- State : 동적데이터 -> useState 이용!

  -> 기본적으로 React는 one-way data flow 이기 때문에 자식 컴포넌트에서 역으로 부모 엘리먼트를 한 번에 바꿀 수 없다 ) 그래서 props를 통해 받은 것을 이용하여 부모 엘리먼트를 바꾼다 or 리덕스를 이용한다(너무 자식요소가 꼬리에 꼬리를 물고 많아질 경우)

### 2. Hook

> 함수형 컴포넌트를 이용할 수 있게 해주는 아이들!

- `useState` : state를 관리할 수 있게 해준다

```javascript
import React, { useState } from "react";
function App() {
  //이름규칙, 두번째 인자로 들어오는 함수명은 첫번째 인자에 set을 붙인 카멜표기법형태로 쓴다
  const [data, setData] = useState(0); //구조분해할당
}
```

- `useEffect` : lifeCycle에 따라서 특정 시점에 특정 행동 할 수 있게 해준다

```javascript
import React, { useEffect } from "react";
function App() {
  useEffect(() => {
    getData(); //실행할 함수
  }, []); //[]는 렌더할 때 한 번 실행한다는 뜻
}
```

# 깃허브 프로필 파인더 만들기

## 1. 부모 컴포넌트

- App.js

```javascript
//useState, useEffect 라는 기본 내장 객체를 불러옴
import React, { useState, useEffect } from "react";
//자식 컴포넌트와 사용할 api를 불러옴
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import { getApi } from "./lib/api"; //디폴트가 아니게 export할 때는 {}로 감싸줘야함

function App() {
  //useState함수에서 구조분해할당을 통해 state와 state를 제어하는 함수를 가져온다 (userData가 state이고 이 state의 변경사항을 제어하는 것이 setUserData이다)
  const [userData, setUserData] = useState(null);

  //userId를 받아서 Api를 가져오는 함수를 만든다. 이때 가져온 data를 state에 넘긴다. 함수를 정의는 해두었지만 아직 실행하진 않은 상태이다.
  const getData = async (userId) => {
    const data = await getApi(userId); // 서버요청 할 때 쓴 함수 - lib/api
    setUserData(data);
  };

  // useEffect(함수,[]);는 기본적으로 LifeCycle에 따라 특정 시점에 함수를 실행시킨다. 함수 실행시킬 조건이 []에 들어가고, 실행될 함수가 첫번재 인자로 들어간다 -> 만약 두번째 인자를 비워두면 맨처음에 렌더 되었을 때, 재렌더링 될 때, 소멸 될 때 모든 시점에 함수가 실행된다.
  useEffect(() => {
    getData();
  }, []);

  //자식컴포넌트들을 실행시킨다
  //getData가 자식으로 넘어갈 이름이고 {getData}가 부모에서 내려보내는 이름이다. 자식에게 갈 이름과 부모에서 내려가는 요소 이름이 같을 필요는 없지만 헷갈리지 않게 하기 위해 주로 같게 쓴다.
  return (
    <>
      <SearchBar getData={getData} />
      <UserCard userData={userData} />
    </>
  );
}

export default App; //다른 컴포넌트에서 사용하기 위해선 export해줘야 함
```

- `return` 뒤엔 무조건 실제로 구현될 아이들만 옴 ) 최상위 요소 하나 뿐이어야되는데 div 낭비하지 않기 위해서 `<> </>`를 주로 사용한다.
- `const [userData, setUserData] = useState(null); `를 통해서 state와 state를 제어할 함수를 데리고 온다
- `useEffect(()=>{실행할 함수},그 시점);` 를 통해서 lifeCycle에 따라 어떤 행동을 할 지 제어한다

## 2. 자식 컴포넌트

- SearchBar.js

```javascript
import React from "react";

//우선 app.js로부터 받은 {getData}를 인자로 받음. 주의할 것이 무조건 중괄호 쳐줘야함.
const SearchBar = ({ getData }) => {
  //여기서도 우선 state를 세팅하고 제어할 함수를 구조분해할당해줌.
  const [userName, setUserName] = React.useState(null);

  //모든 변수가 할당될 때엔 이벤트를 거쳐 할당되므로 onChange 내용물이 변경되면 이벤트가 실행 -> 그 이벤트 타겟값이 입력값이다 ->  그 값을 userName으로 넘겨줌
  const ChangeHandler = (event) => {
    event.preventDefault();
    setUserName(event.target.value);
  };

  //엔터 친 순간 시행되는 시행되는 이벤트를 제어하는 함수인데, 엔터치는 순간 그 당시의 userName값을 getData()에 인자로 넘긴다 -> 이때 부모컴포넌트의 함수로 넘어가며 부모컴포넌트의 userData가 바뀐다!
  const submitHandler = (event) => {
    event.preventDefault();
    getData(userName);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        value={userName}
        onChange={ChangeHandler}
        placeholder="Github ID를 입력해주세요"
      ></input>
    </form>
  );
};

export default SearchBar;
```

- UserCard.js

```javascript
import React from "react";

const UserCard = ({ userData }) => {
  return (
    //맨 처음엔 userData가 빈값이므로 userData가 undefined일 땐 로딩중 출력되도록
    <>
      {userData ? (
        <>
          <img src={userData.avatar_url} />
          <p>{userData.name}</p>
          <p>{userData.bio}</p>
          <p>{userData.followers}</p>
          <p>{userData.following}</p>
          <p>{userData.login}</p>
        </>
      ) : (
        <>로딩중...</>
      )}
    </>
  );
};

export default UserCard;
```

- api.js

```javascript
import axios from "axios";
//axios는 promise API를 활용하는 HTTP 비동기 통신 라이브러리 -> get) Url에 존재하는 자원에 요청 / post) 생성파일을 서버에다가 업로드 / delete) DB에 저장된 내용 삭제 / PUT) 디비에 저장되어 있는 내용 갱신

//async가 붙으면 항상 promise가 호출됨.
//await는 async 안에 있으며, 비동기 처리를 하는 메서드 앞에 붙인다
//name으로 받는 것은 깃허브 아이디
export const getApi = async (name) => {
  //axios.get을 이용해 url에 존제하는 자원을 요청
  try {
    const { data } = await axios.get("https://api.github.com/users/" + name);
    console.log("[SUCCESS] GET user data", data);
    return data;
  } catch (e) {
    console.log("[FAIL] GET user data", e);
    return null;
  }
};
```
