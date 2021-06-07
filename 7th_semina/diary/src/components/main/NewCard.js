import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { createCardData } from "../../lib/api";
import { userDataAtom } from "../../states/atom";

const getDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1 + "";
  const day = now.getDate() + "";
  const monthF = month.length < 2 ? 0 + month : month;
  const dayF = day.length < 2 ? 0 + day : day;
  return parseInt(year + monthF + dayF);
};

//새로운 카드 생성하는 창
const NewCard = ({ id, year, month }) => {
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const createCard = async () => {
    const cardForm = {
      date: getDate(),
      id: id,
      title: "",
      image: "",
      weather: "",
      tags: [],
      summary: "",
      text: "",
    };
    // newData는 궁극적으로 post할 데이터를 담을 state임!
    const newData = {
      ...userData,
      [year]: {
        ...userData[year],
        [month]: [...userData[year][month], cardForm],
      },
    };
    const data = await createCardData(newData);
    data[year] && setUserData(newData);
  };

  return (
    <NewCardWrap>
      <div className="card" onClick={createCard}>
        <div className="card__text">+ 추가해 주세요</div>
      </div>
    </NewCardWrap>
  );
};

export default NewCard;

const NewCardWrap = styled.div`
  .card {
    box-sizing: border-box;
    width: 220px;
    height: 257px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &__text {
      font-size: 20px;
      color: #cea0e3;
    }
    &:hover {
      cursor: pointer;
    }
  }
`;
