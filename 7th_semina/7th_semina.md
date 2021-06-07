# Raec UI 라이브러리

- Ant Design ) `yarn add antd`
  - 코드 눌러서 복붙
- Material UL ) `yarn add @material-ui/core`
  - icon 설치 방식 조금 다름
  - 커스텀 가능

# CORS 에러

- Same-Origin Policy ) 웹 브라우저 보안을 위해 프로토콜, 도메인, 포트가 동일한 서버로만 요청을 주고받을 수 있는 정책
- CORS )도메인이나 포트가 달라도 서버에 자원을 요청할 수 있는 매커니즘
- CORS 오류 ) 서버에서 Access-Control-Allow-Origin 헤더를 수정해야 함

# 리덕스

- 에측 가능, 중앙화된, 디버깅이 쉬운, 유연한
- why use? 거쳐야 하는 컴포넌트가 많아지면 상태 전달 비효율 -> store이용
- 구성 )

  1. store

  - 하나의 저장소, 객체 트리에 저장
  - 상태 업데이트 되면 관련 뷰 다시 그려짐
  - 상태 트리는 불변 상태를 가져야 함
  - 메소드
    getState(), dispatch(), subscribe()와 같은 내장 메소드가 있다
    getState(): store에 등록된 상태 정보를 불러온다
    dispatch(): action을 발생시킨다
    subscribe(): 인자로 특정 함수를 전달하면, action이 발생할 때마다 해당 함수를 호출한다

  2. action

  - 상태 변경 설명 객체 ("어떻게 변경을 하겠다"는 내용을 담고 있음->그걸 type필드에 넣기)
  - type 필드는 필수, 그 외는 개발자가 정할 수 있음
  - type는 상수로

  3. reducer

  - state 업데이트를 어떻게 할 지 작성한 순수한 함수
  - 인자로 기존의 state(상태)와 action을 받아옴

  ```javascript
  const initialState = {
      name: '',
  }

  function reducer(state=initialState,action){
      switch(action,type){
        const SET_NAME:
            return{
                ...state,
                name: action.string
            };
        default:
            return state;
      }
  }
  ```

  4. store 내장 함수
