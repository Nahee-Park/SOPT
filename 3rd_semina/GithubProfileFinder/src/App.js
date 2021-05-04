import React, { useState } from "react";
import SearchBar from './components/SearchBar';
import Result from './components/Result';
import styled from 'styled-components';
import {getApi} from './lib/api'; //디폴트가 아니게 export할 때는 {}로 감싸줘야함 

function App(){ 
  const [isSearched,setIsSearched] = useState(false);
  const [isClosed,setIsClosed] = useState(false);
  const [userData, setUserData] = useState({
    status: "idle",
    data: null,
  });

  const getData = async (userId) => {
    setUserData({...userData, status: "pending"});
    try{
      const data = await getApi(userId); // 서버요청 할 때 쓴 함수 - lib/api
      if (data === null) throw Error;
      setUserData({status:"resolved", data:data});
    }catch(e){
      setUserData({status:"rejected",data:null});
      console.log(e);
    }
  };

  return (
    <Container>
    {!isSearched && <SearchBar getData={getData} setIsSearched={setIsSearched} setIsClosed={setIsClosed}/>}
    {!isClosed && <Result userData={userData} setIsSearched={setIsSearched} setIsClosed={setIsClosed}/>}
    </Container>
  )
}

export default App; //다른 컴포넌트에서 사용하기 위해선 export해줘야 함 

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;


