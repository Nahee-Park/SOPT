import React from "react";
import Card from "../components/main/Card";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { userDataAtom } from "../states/atom";

const Main = () => {
  //userData recoil을 통해 받아옴
  const userData = useRecoilValue(userDataAtom);
  console.log(userData);
  return (
    <MainWrap>
      {userData &&
        userData.map((data, index) => {
          return <Card key={index} props={data} />;
        })}
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
