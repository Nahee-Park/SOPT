import React from "react";
import MenuIcon from "../../assets/menu.svg";
import ProfileIcon from "../../assets/profile.svg";
import styled from "styled-components";
//Router 아닌 요소에서 history 받아오기 위해서
import { withRouter } from "react-router-dom";

//Router로 제어된 컴포넌트는 history객체를 props로 전달받는다
//hisroey 객체에는 앞뒤로 이돋할 수 있는 goBack() goForward(), 다른 페이지 로 이동할 수 있는 histry.push("이동하고자 하는 페이지") 등의 메소드가 있다
const MainHeader = ({ history }) => {
  return (
    <MainHeaderWrap>
      <div className="header">
        <img className="header__menu" src={MenuIcon} alt="" />
        <div className="header__title" onClick={() => history.push("/")}>
          Diary App
        </div>
        <img className="header__profile" src={ProfileIcon} alt="" />
      </div>
      <div className="header__hr"></div>
    </MainHeaderWrap>
  );
};

export default withRouter(MainHeader);

const MainHeaderWrap = styled.div`
  /* element 간 간격이 동일하게 줄어들도록 */
  @media (max-width: 1200px) {
    width: 100vw;
  }
  .header {
    width: 1200px;
    /* element 간 간격이 동일하게 줄어들도록 */
    @media (max-width: 1200px) {
      width: 100vw;
    }
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 91px;

    &__title {
      font-size: 36px;
      font-weight: bold;
      font-style: italic;
      color: #cea0e3;
      &:hover {
        cursor: pointer;
      }
    }

    &__profile {
      margin-right: 10px;
    }

    &__hr {
      /* element 간 간격이 동일하게 줄어들도록 */
      @media (max-width: 1200px) {
        width: 100vw;
      }
      width: 1200px;
      height: 13px;
      background: linear-gradient(90deg, white, #cea0e3);
    }
  }
`;
