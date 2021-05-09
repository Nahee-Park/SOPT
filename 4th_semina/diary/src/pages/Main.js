import React from 'react';
import Card from '../components/main/Card'
import styled from 'styled-components'; 
import {useRecoilValue} from 'recoil';
import {userDataAtom} from '../states/atom';

const Main = () => {
        //userData recoil을 통해 받아옴
        const userData = useRecoilValue(userDataAtom);
        console.log(userData);
    return (
        <MainWrap>
            {userData&&
            userData.map((data,index)=>{
                return <Card key={index} props={data} />
            })}
        </MainWrap> 
    );
};

export default Main;

const MainWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  row-gap: 25px;
`;