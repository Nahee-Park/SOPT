import React from 'react';

const SearchBar = ({getData}) => {
    const [userName, setUserName] = React.useState(null);
    const ChangeHandeler = (event) => {
        // event.preventDefault();
        console.log("인풋창",event.target.value);
        setUserName(event.target.value);
    }
    const submitHandler = (event) => {
        event.preventDefault();
        getData(userName);
    }
    return(
        <form onSubmit={submitHandler}>
            <input type="text" value={userName} onChange={ChangeHandeler} placeholder="Github ID를 입력해주세요"></input>
        </form>
    );
};

export default SearchBar;