import React from 'react';
//Router 아닌 요소에서 Location 받아오기 위해서 withRouter 가져옴
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Title= ({location}) => {
  //location.pathname은 pathname을 가져옴 -> / 이면 이번달 이길 저장, 아니면 오늘의 일기 저장 
    const title = location.pathname === "/" ? "이번 달 일기" : "오늘의 일기";
    return (
    <TitleWrap>
        <div className="title">{title}</div>
    </TitleWrap>
    );
};

export default withRouter(Title);

const TitleWrap = styled.div`
  .title {
    width: 1200px;
    height: 92px;
    font-size: 36px;
    font-weight: bold;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;