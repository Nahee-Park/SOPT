import React, {useEffect} from "react";
import closeIcon from '../images/closeIcon.svg';
import githubIcon from '../images/githubIcon.svg';
import stroke from '../images/stroke.svg';
import styled from 'styled-components';

// const MAX_REOPOSITORY = 10;

const UserCard = ({children, data, cleanReposData, setIsClosed, setIsSearched}) => {
    const ClickHandeler = (event) =>{
        setIsClosed(true);
        setIsSearched(false);
    }
    // const cleanReposData=[];
    // const MAX_REOPOSITORY = 10;
    // useEffect(()=>{
    //     console.log(userReposData);
    //     if(userReposData!==null ){
    //         if(userReposData.length>MAX_REOPOSITORY){
    //             cleanReposData = userReposData.slice(-MAX_REOPOSITORY)
    //         } else {cleanReposData = userReposData;}
    //     }
    // },[userReposData]);
    // console.log(cleanReposData);

    //10개 넘으면 잘라야 하므로 새롭게 배열 생성 
    // userReposData.length>MAX_REOPOSITORY?cleanReposData = userReposData.slice(-MAX_REOPOSITORY) : cleanReposData = userReposData;
    // console.log(cleanReposData);

    return (
        data ? (
            <>
                <UserCardWrap>
                    <div className="UserCardContainer">
                        <div className="card-first">
                            <img className="user-image" src={data.avatar_url} alt="profil image" />
                            <div className="card-basic-info">
                                <div className="basic icon-name">
                                    <img src={githubIcon} className="githubIcon"/> 
                                    <div className="user-login">{data.login}</div>
                                </div>                          
                                {/* <div className="basic user-name">{data.name}</div> */}
                                <div className="basic user-bio">{data.bio}</div>
                            </div>
                            <div className="user-link-container" onclick="location.href='{data.html_url}';">
                                <a
                                    className="user_link"
                                    href={data.html_url}
                                    alt=""
                                    target="_blank"
                                    rel="noreferrer"
                                    >
                                        Go to Profile
                                </a>
                            </div>
                            <img onClick={ClickHandeler} src={closeIcon} className="closeIcon" setIsClosed={setIsClosed}/> 
                        </div>
                        <div className="card-second">
                            <div className="user user-followers">
                                <div className="user-followers-name name">Follower</div>
                                <div className="user-followers-data data">{data.followers}</div>
                            </div>
                            <div className="user user-following">
                                <div className="user-following-name name">Following</div>
                                <div className="user-following-data data">{data.following}</div>
                            </div>
                            <div className="user user-repos">
                                <div className="user-repos-name name">Repos</div>
                                <div className="user-repos-data data">{data.public_repos}</div>
                            </div>
                            <img src={stroke} className="stroke"/> 
                        </div> 
                    </div>
                </UserCardWrap>
                <UserRepository>
                    {cleanReposData&&cleanReposData.map((eachRepos)=>
                        <a
                        className="reposName"
                        href={eachRepos.html_url}
                        alt=""
                        target="_blank"
                        rel="noreferrer"
                        >
                            {eachRepos.name}
                        </a>
                    )}
                </UserRepository>
            </>
        ) : (
            <NothingCardWrap>
                <img onClick={ClickHandeler} src={closeIcon} className="closeIcon" setIsClosed={setIsClosed}/> 
                <div className="childrenContainer">
                    <div className="children">{children}</div>
                </div>
            </NothingCardWrap>
        )
    );
};

export default UserCard;

const UserRepository = styled.div`
    width: 715px;
    display: flex;
    flex-wrap: wrap;
    .reposName{
        left: 0%;
        right: 0%;
        top: 0%;
        bottom: 0%;
        background: #363636;
        border-radius: 20px;
        font-family: Noto Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 132.5%;
        /* identical to box height, or 24px */
/* 
        display: flex;
        align-items: center; */

        color: #DBDBDB;
    }
`;

const NothingCardWrap = styled.div`
        width: 591px;
        height: 265px;
        background: #414141;
        border: 8px solid rgba(105, 105, 105, 0.5);
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
        border-radius: 40px;
        animation-name: movingCard;
        animation-duration: 1s;

        @keyframes movingCard{
            from {
                transform: translateY(-10%);
                opacity: 0;
            } to {
                transform: translateY(0);
                opacity: 1;
            }   
        }

        .childrenContainer{
            width: 591px;
            height: 265px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .children{
            font-family: Noto Sans;
            font-style: normal;
            font-weight: 500;
            font-size: 2rem;
            line-height: 132.5%;
            /* or 26px */
            color: #DBDBDB;
            transition: 1s;
        }
        .closeIcon{
            position: fixed;
            width: 18px;
            height: 18px;
            color: #2F2F2F;
            margin-left:547px;
            margin-top: 21px;
            cursor: pointer;
        }   
        
`;

const UserCardWrap = styled.div`
    .UserCardContainer{
        width: 591px;
        height: 265px;
        background: #414141;
        border: 8px solid rgba(105, 105, 105, 0.5);
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
        border-radius: 40px;
        animation-name: movingCard;
        animation-duration: 1s;
    }

    @keyframes movingCard{
        from {
            transform: translateY(-10%);
            opacity: 0;
        } to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    .card-first{
        display: flex;
        /* align-items: center; */
    }
    .card-basic-info{
        position: relative;
        height: 70px;
        width: 521px;
    }
    .basic{
        position: absolute;
    }
    .icon-name{
        display: flex;
    }
    .githubIcon{
        padding-top: 42px;
        margin-left: 20px;
        padding-right: 8px;
    }
    .user-login{
        padding-top: 36px;
    }
    /* .user-name{} */
    .user-bio{
        padding-left: 23px;
        padding-top: 73px;
        font-family: Noto Sans;
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 132.5%;
        color: #DBDBDB;
    }
    .user-image {
        box-sizing: border-box;
        width: 70px;
        height: 70px;
        border-radius: 100px;
        margin-left: 47px;
        margin-top: 35px;
        filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.25));
    }
    .githubIcon {
        width: 24px;
        height: 24px;
    }
    .user-login{
        font-family: Noto Sans;
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        color: #DBDBDB;
    }
    .closeIcon{
        width: 18px;
        height: 18px;
        color: #2F2F2F;
        margin-right:26px;
        margin-top: 21px;
        cursor: pointer;
    }
    .user-link-container{
        cursor: pointer;
        position: absolute;
        margin-left: 377px;
        margin-top: 35px;
        width: 135px;
        height: 38px;
        background: #555555;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        /* padding: 6px 19px 8px 20px; */
    }
    a{
        font-family: Noto Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 132.5%;
        /* identical to box height, or 24px */
        color: #DBDBDB;
        text-decoration: none;
    }
    .user-link-container:hover{
        background-color: #DBDBDB;
        a{
            color: #555555;
        }
    }
    .card-second{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 497px;
        height: 97px;
        background: #2F2F2F;
        border-radius: 20px;
        margin-left: 47px;
        margin-top: 28px;
    }
    .name{
        font-family: Noto Sans;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 132.5%;
        /* or 26px */

        display: flex;
        align-items: center;
        margin-bottom: 22px;
        color: #DBDBDB;
    }
    .data{
        font-family: Noto Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 132.5%;
        /* identical to box height, or 24px */
        /* padding-left: 18px; */
        display: flex;
        align-items: center;

        color: #DBDBDB;
    }
    .stroke{
        position: absolute;
    }
    .user{
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;
