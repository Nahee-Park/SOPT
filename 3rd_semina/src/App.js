import React, { useState,useEffect } from "react";
import SearchBar from './components/SearchBar';
import UserCard from './components/UserCard';
import {getApi} from './lib/api'; //디폴트가 아니게 export할 때는 {}로 감싸줘야함 

function App(){ 
  const [userData, setUserData] = useState(null);

  const getData = async (userId) => {
    const data = await getApi(userId); // 서버요청 할 때 쓴 함수 - lib/api
    setUserData(data);
  };

  useEffect(()=>{
    getData();
  },[]);

  return (
    <>
    <SearchBar getData={getData}/>
    <UserCard userData={userData}/>
    </>
  )
}

export default App; //다른 컴포넌트에서 사용하기 위해선 export해줘야 함 


