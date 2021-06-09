import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Card from "../components/diary/Card";
import { userDataAtom } from "../states/atom";

const Diary = ({ year, month, match }) => {
  const id = match.params.id;
  //recoil atom에 저장되어있는 데이터 불러옴
  const data = useRecoilValue(userDataAtom);

  if (!data) return <h1>no data</h1>;
  const diaryData = data[year][month].find((el) => el.id === parseInt(id));

  return <Card data={diaryData} year={year} month={month} />;
};

export default withRouter(Diary);
