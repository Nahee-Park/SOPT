const openButton = document.getElementById("mainbtn");
const modal = document.querySelector(".modal");
const closeBtn =modal.querySelector("button");
const openModal = () =>{
    modal.classList.remove("hidden");
}
const closeModal = () => {
    modal.classList.add("hidden");
}
closeBtn.addEventListener("click",closeModal);
openButton.addEventListener("click",openModal);