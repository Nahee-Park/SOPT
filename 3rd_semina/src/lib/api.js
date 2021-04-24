import axios from "axios";

//이름 받아서 데이터 받음 
//async가 붙으면 항상 promise가 호출됨.
//await는 async 안에 있으며, 비동기 처리를 하는 메서드 앞에 붙인다
export const getApi = async(name) => {
    const {data} = await axios.get("https://api.github.com/users/"+name);
    console.log(data);
    return data;
};

