import React from 'react';

const UserCard = ({userData}) => {
    return ( //앞이 true이면 뒤는 알아서 시행 
        <>
                {userData ? (
            <>
                <img src={userData.avatar_url}/>
                <p>{userData.name}</p>
                <p>{userData.bio}</p>
                <p>{userData.followers}</p>
                <p>{userData.following}</p>
                <p>{userData.login}</p>
            </>
        ):<>로딩중...</>}
        </>
    );
};

export default UserCard;