import React from 'react';
import UserCard from './UserCard';
import styled from 'styled-components';


const Result = ({userData,setIsSearched}) => {
    const {status,data} = userData; //구조분해할당해서 userData를 변수에 나눠받음
    const ResultStyle = styled.div`
    .status{
        font-family: Noto Sans;
        font-style: normal;
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 132.5%;
        /* or 26px */
        color: #DBDBDB;
        padding-top: 12rem;
    }
    `;
    switch(status){
        case "pending":
            setIsSearched(false);
            return <ResultStyle>
                <div className="pending status">Loading...</div>;
            </ResultStyle>
        case "resolved":
            setIsSearched(true);
            return <ResultStyle>
                <UserCard className="resolved status" data={data} />
            </ResultStyle>
        case "rejected":
            setIsSearched(false);
            return (
                <ResultStyle>
                    <div className="rejected status">User Not Found</div>
                </ResultStyle>
            );
        case "idle":
            default:
                return <div></div>;
    }
};

export default Result;