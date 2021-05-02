import React from 'react';

const SearchBar = ({getData}) => {
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
    }
    return(
        <>
        <form onSubmit={submitHandler}>
            <input type="text" value={userName} onChange={ChangeHandeler} placeholder="Github ID를 입력해주세요"></input>
        </form>

        </>
    );
};

export default SearchBar;