import React from "react";

function Hello({sopt}){
    const [count, setCount] = React.useState(0);

    React.useEffect(()=>{
        document.title=`you clicked ${count} times`;
    },[]); //첫번째 인자 함수 넣고, 그 다음 deps를 비워둠 ) 렌더링 될 때마다 실행됨  // 그 다음 deps를 [] 하면 한 번 시행되고 끝남 


    // function useState(initialValue){
    //     let count = initialValue;
    //     function getCount(){
    //         return _count; //count호출하면 값만 반환
    //     }
    //     function setCount(newValue){
    //         _count = newValue; //값 수정 
    //     }
    // }
    
    return(
        <>
            <p>you clicked {count} times</p>
            <button onClick={()=>{
                setCount(count++);
            }}>
            Click
            </button>
            {/* <h1>Hello {sopt}!</h1> */}
        </>
    )
}

export default Hello; 

