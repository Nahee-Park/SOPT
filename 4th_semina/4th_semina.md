# React 개발자 로드맵

# 조건부 렌더링

## 자주 쓰는 문법

- &&, 삼항연산자, switch

## list & key

- list를 렌더링 할 때에는 반드시 props에 key를 설정해야한다
- key가 있어야 배열의 변경되는 부분만 업데이트 가능하다.

## BEM 방법론

- CSS className 정하는 방법론
- .block\_\_element--modifier
- block: 재사용 가능 독립 컴포넌트
- element: 블록 구성 단위
- modifier: block, element 속성
- 가장 큰 장점은 부모컴포넌트와 scss로 사용하면 아주 좋음!

```css
card {
}
card__image {
}
card__button--success {
}
card__button--back {
}
```

- 말이 길어질 때엔 하이폰 하나 사용 ) `camel-case`

## SCSS 사용 방법

- `npm install -g node-sass` 로 설치
- `node-sass<입력파일경로(scss파일)>[출력파일경로(css파일)]`

```css
$main-color = #ffffff; // 변수 사용 가능
```

- 연산자 tkdyd rksmd
- @import 로 파일 가져오기 가능
- @extend 로 상속
- @mixin 으로 인수 받기 가능
- @include 로 앞에 선언한 mixin 사용 가능
- 중첩테그 가능, &를 통해 부모 선택 가능

## Grid Layout

1. 적용
   `display: grid `

2. 가로/ 세로 기준 나열 방법

- grid-template-columns: 1fr 2fr 3fr;
- grid-template-rows: 100px;

3. 속성값

- repeat(반복횟수, 반복값)
- minmiz(최소값, 최대값)
- repeat(auto-fit,minmax(20%,auto))

4. Grid 셀 병합

- grid-column: 2/4; //2~4까지 세로로 병합

# React Router

## 기본

- a테그 사용하면 SPA장점 없어짐
- `yarn add react-router-dom`으로 설치
- <link to="/">Go to hmome</link>
- <route path="/diary" component={Diary}>
- exact 이용하면 바로 그 곳

## BrowserRouter 이나 기본 라우터 사용하기

### 기본 라우터

- switch ) 첫번째로 매칭되는 path의 component부터 순서대로 렌더링
- Route 기본 props ) <Route>에만 사용 가능

1. history ) Param
2. match ) 주소 이미 변경, 돌아가기 가능 / history.push() tofhdns rudfh
3. location) 현재 페이지 정보, url쿼리스트링
   <BrowserRoute></BrowserRoute> 테그 안에 있는 <Route> 안의 props에서만 넘겨줄 수 있다

## 고차

- withRouter ) 고차 컴포넌트에서 history같은 props 전부 하나하나 넘겨주기 어려우므로
- useRef ) React에서 DOM 가져올 때 사용

# Figma, Postman

- Figma
- Postman
  - [Get] => url 넣으면 보여줌
  - body 클릭 후 JSON 클릭하면 JSON 파일을 전송함
  - [POST/PUT] 서버주소 + Body에 JSON data 입력 후 전송
- json-server ) JSON파일로 로컬에 연습용 서버 만들기
  src 폴더 밖에 data.json 파일을 생성한 후,
  다음과 같은 더미 데이터 넣기
  `npm install json-server --save-dev`로 설치
  `yarn add -D json-server` 가 설치 오류 더 없는듯!
  `npx json-server --watch data.json --port 4000`
  -> React 기본 port가 3000번이기 때문에 서버는 다르게 지정
