import React from "react";
import styled from "styled-components";

const UserCardWrap = styled.div`
`;

const UserCard = ({ data }) => {
    //맨 처음엔 userData가 빈값이므로 userData가 undefined일 땐 로딩중 출력되도록
    return (
        data && (
            <UserCardWrap>
            <img src={data.avatar_url} />
            <p>Name: {data.name}</p>
            <p>Id: {data.login}</p>
            <p>Bio: {data.bio}</p>
            <div className="result-list">
                <p>Followers: {data.followers}</p>
                <p>Followings: {data.following}</p>
                <p>Repository: {data.public_repos}</p>    
            </div>
            </UserCardWrap>
        )
    );
};

export default UserCard;
