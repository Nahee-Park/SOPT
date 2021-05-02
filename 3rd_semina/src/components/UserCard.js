import React from "react";

const UserCard = ({ data }) => {
    //맨 처음엔 userData가 빈값이므로 userData가 undefined일 땐 로딩중 출력되도록
    return (
        data && (
            <>
            <img src={data.avatar_url} />
            <p>{data.name}</p>
            <p>{data.bio}</p>
            <p>{data.followers}</p>
            <p>{data.following}</p>
            <p>{data.login}</p>
            </>
        )
    );
};

export default UserCard;
