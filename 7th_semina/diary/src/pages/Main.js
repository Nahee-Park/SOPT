import React, { useState, useEffect } from "react";
import Card from "../components/main/Card";
import NewCard from "../components/main/NewCard";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { userDataAtom } from "../states/atom";
import { useHistory } from "react-router-dom";

const Main = ({ year, month }) => {
  const history = useHistory();
  const userData = useRecoilValue(userDataAtom);

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
        id={userData ? userData[year][month].length + 1 : 1}
      />
    </MainWrap>
  );
};

export default Main;

const MainWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  row-gap: 25px;
  column-gap: 25px;
`;
