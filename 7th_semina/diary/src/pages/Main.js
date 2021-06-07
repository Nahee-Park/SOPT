import React, { useState, useEffect } from "react";
import Card from "../components/main/Card";
import NewCard from "../components/main/NewCard";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { userDataAtom } from "../states/atom";
import { useHistory } from "react-router-dom";

const Main = ({ year, month }) => {
  const history = useHistory();
  //Card에서는 userData 사용, NewCard에서는 userData set->recoil atom에 대한 get, set 둘 다 필요
  const userData = useRecoilValue(userDataAtom);

  console.log(userData);

  return (
    <MainWrap>
      {userData &&
        userData[year][month].map((data, index) => {
          return (
            <Card
              key={index}
              props={data}
              //클릭하면 diary페이지로 넘어감
              onClickFunc={() => history.push(`/diary/${data.id}`)}
            />
          );
        })}
      <NewCard
        year={year}
        month={month}
        //id값은 데이터의 길이로
        id={userData ? userData.length + 1 : 1}
      />
    </MainWrap>
  );
};

export default Main;

const MainWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  row-gap: 25px;
  column-gap: 25px;
  /* 카드 row 5개 미만일 때 왼쪽 정렬 */
  justify-content: start;
  /* 카드 최소 너비보다 vw 줄어들 때 반응형으로 제어 */
  @media (max-width: 1175px) {
    grid-template-columns: repeat(4, auto);
  }
  @media (max-width: 930px) {
    grid-template-columns: repeat(3, auto);
  }
  @media (max-width: 685px) {
    grid-template-columns: repeat(2, auto);
  }
  @media (max-width: 440px) {
    grid-template-columns: repeat(2, auto);
  }
`;
