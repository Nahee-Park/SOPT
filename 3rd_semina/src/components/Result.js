import React from 'react';
import UserCard from './UserCard';

const Result = ({userData}) => {
    const {status,data} = userData; //구조분해할당해서 userData를 변수에 나눠받음
    switch(status){
        case "pending":
            return <div style={{ color: "black", fontSize: "24px" }}>Loading...</div>;
        case "resolved":
            return <UserCard data={data} />;
        case "rejected":
            return (
                <div style={{ color: "black", fontSize: "24px" }}>User Not Found</div>
            );
        case "idle":
            default:
                return <div></div>;
    }
};

export default Result;