import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userDataAtom } from "../../states/atom";
import CardHeader from "../diary/CardHeader";
import CardInfo from "../diary/CardInfo";
import { createCardData } from "../../lib/api";

//diary페이지에서 보여줄 카드
//data는 diary페이지에서 사용될 데이터 저장 state
const Card = ({ data, match, history, year, month }) => {
  // 들어온 페이지에 edit 없이 "/diary/:id"가 전부이면 isReadOnly모드
  const isReadOnly = match.path === "/diary/:id" ? true : false;
  const [userData, setUserData] = useRecoilState(userDataAtom);
  //기본적인 diaryData를 저장하고, 새로운 값을 받아서 수정
  const [state, setState] = useState(data);
  const id = parseInt(match.params.id);
  const lodash = require("lodash");

  //state에 지금 들어오는, 새로 받는 애들 받음(handleChange)
  const handleChange = (event, values) => {
    const name = event.target.name;
    if (name !== "tags") {
      setState({
        ...state,
        // 계산된 속성명 ) name이 계산된 이후, 그곳에 event.target.value대입
        [name]: event.target.value,
      });
    } else {
      //tags에 한해는 values값을 그대로 대입함
      setState({
        ...state,
        [name]: values,
      });
    }
    console.log(state);
  };

  //수정 handleEdit => 어떤 데이터 불러올 지
  const handleEdit = async () => {
    const index = userData[year][month].findIndex((data) => data.id === id);
    //깊은 복사를 통해 온전히 독립적인 수정가능한 객체 생성!
    const newData = lodash.cloneDeep(userData);
    newData[year][month].splice(index, 1, state);
    const data = await createCardData(newData);
    setUserData(newData);
    history.goBack();
    history.goBack();
  };

  //삭제 handleDelete
  const handleDelete = async () => {
    // 해당 아이디 걸러내기
    const filteredList = userData[year][month].filter((data) => data.id !== id);
    const newData = lodash.cloneDeep(userData);
    newData[year][month] = filteredList;
    const data = await createCardData(newData);
    setUserData(newData);
    history.goBack();
  };

  return (
    <CardWrap>
      <CardHeader
        title={state.title}
        isReadOnly={isReadOnly}
        handleChange={handleChange}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <CardInfo
        data={state}
        isReadOnly={isReadOnly}
        handleChange={handleChange}
      />
      <textarea
        placeholder="오늘을 기록해 주세요"
        readOnly={isReadOnly}
        value={state.text}
        name="text"
        onChange={handleChange}
      />
    </CardWrap>
  );
};

export default withRouter(Card);

const CardWrap = styled.div`
  width: 785px;
  height: 600px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: beige;
  border-radius: 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  textarea {
    width: 642px;
    height: 219px;
    background-color: #efefef;
    font-size: 18px;
    resize: none;
    font-family: Roboto;
    border: none;
    padding: 14px;
    box-sizing: border-box;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #c4c4c4;
    }
  }
`;
