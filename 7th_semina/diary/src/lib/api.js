import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  // 요청 1초까지만 기다리고 타임아웃!
  timeout: 1000,
});
export const getUserData = async () => {
  try {
    //data 안에 data가 있으므로 구조분해 할당
    //data에 쉽게 접근하기 위해  data.data를 리턴해줌
    const { data } = await instance.get(`/posts`);
    console.log("[SUCCESS]Get card data");
    return data.data;
  } catch (e) {
    console.log("[FAIL]Get card data");
    return null;
  }
};

export const createCardData = async (userData) => {
  try {
    const { data } = await instance.post("/posts", {
      data: userData,
    });
    console.log("[SUCCESS] POST card data");
    return data.data;
  } catch (e) {
    console.log("[FAIL] POST card data");
    return null;
  }
};
