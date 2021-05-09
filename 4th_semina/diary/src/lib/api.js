import axios from 'axios';

export const getUserData = async() => {
    try{
        //data 안에 data가 있으므로 구조분해 할당
        //data에 쉽게 접근하기 위해  data.data를 리턴해줌 
        const {data} = await axios.get(`http://localhost:4000/posts`);
        return data.data;
    }
    catch(e){
        console.log("[FAIL]")
        return null;
    }
};