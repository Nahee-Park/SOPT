import React from 'react';
import styled from 'styled-components';
import searchIcon from '../images/search-icon.svg';

const SearchBar = ({getData,setIsSearched,setIsClosed}) => {
    const [userName, setUserName] = React.useState(null);

    //입력창에 들어오는 값 하나하나 받아들임. 그 값이 타겟값이고 그 값을  userName 으로 넘겨줌 (state변수)
    const ChangeHandeler = (event) => {
        // event.preventDefault();
        console.log("인풋창",event.target.value);
        setUserName(event.target.value);
    }

    //엔터치는 순간 그 당시의 userName값을 getData로 넘김 -> getData는 부모컴포넌트의 state값을 바꿈 
    const submitHandler = (event) => {
        event.preventDefault();
        getData(userName);
        setIsSearched(true);
        setIsClosed(false);
    }

    
    return(
        <SearchBarWrap>
            <form onSubmit={submitHandler}>
                <img src={searchIcon} />    
                <input type="text" value={userName} onChange={ChangeHandeler} placeholder="Github ID를 입력해주세요">
                </input>
            </form>
        </SearchBarWrap>
    );
};

export default SearchBar;

const SearchBarWrap = styled.div`
    position: fixed;
    form{
        width: 591px;
        height: 69px;
        border: 8px solid rgba(105, 105, 105, 0.5);
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
        border-radius: 40px;
        background: #414141;
        display: flex;
        align-items: center;
    }
    img{
        margin-left: 24px;
        z-index: 1;
    }


    input{
        margin-left: 24px;
        width: 515px;
        height: 26px;   
        background-color: transparent;
        border: none;
        outline: none;
        font-family: Noto Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 1.25rem;
        line-height: 132.5%;
        /* or 26px */

        display: flex;
        align-items: center;

        color: #F9F9F9;

        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
    input::placeholder {
        color: #F9F9F9;
    }
    input:focus {
        outline: none;
    }
`;