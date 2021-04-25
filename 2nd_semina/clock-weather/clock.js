const analogHour = document.querySelector('.hour');
const analogMin = document.querySelector('.min');
const analogSec = document.querySelector('.sec');
const digitalTime = document.querySelector('.digital-time');
const digitalButton = document.querySelector('.digital-button');
const header = document.querySelector('.header');
let mode = true;
//1. Date객체 받고
//2. sec, min, hour 불러와서 각 시간단위별로 몇 도씩 transform: rotate 해야되는 지 지정 
//3. 해당 함수 1초단위로 불러움 
function getDate(){
    const now = new Date();
    const seconds = now.getSeconds(); //호출한 당시의 딱 초 
    const secondsDegrees = ((seconds/60)*360)+90;
    analogSec.style.transform=`rotate(${secondsDegrees}deg)`
    
    const mins = now.getMinutes(); //호출한 당시의 딱 분
    const minsDegrees=((mins/60)*360)+90;
    analogMin.style.transform=`rotate(${minsDegrees}deg)`

    let hour = now.getHours();//호출한 당시의 딱 시간(디폴트는 24h 기준);
    const hourDegrees=((hour/12)*360)+90;
    analogHour.style.transform=`rotate(${hourDegrees}deg)`

    const year = now.getFullYear();
    const day = now.getDate();
    let month = now.getMonth();
    const monthList = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    month = monthList[month];
    return {year,month,day,hour,mins, seconds};
}


function drawDate(){
    const{year,month,day,mins,seconds} = getDate();
    let{hour}=getDate();

    if(!mode){ //모드에 따라 불러오는 시간이 다름 
        if (hour === 0) hour = 12;
        if (hour >= 13) hour -= 12;
        digitalTime.innerHTML = `${ hour<10 ? `0${ hour}` : hour}:${mins<10? `0${mins}` : mins}:${seconds<10? `0${seconds}` : seconds}`;
    }else{
        digitalTime.innerHTML = `${ hour<10 ? `0${ hour}` : hour}:${mins<10? `0${mins}` : mins}:${seconds<10? `0${seconds}` : seconds}`;
    }
    header.innerHTML =`Today is <span>${day} ${month}</span>, ${year}`;
}

function changeTwelvehours(event){ //시간 모드를 설정
    let{hour} = getDate();
    //클릭하면 상태를 바꿈 
    if(mode===true){
        mode = false;
        if (hour >= 0 && hour <= 11) { 
            digitalButton.innerText = "AM";
        } else { 
            digitalButton.innerText = "PM";
        }


    }else{
        mode=true;
        digitalButton.innerText="24H";
    }
}




const init = () => {
    setInterval(drawDate,1000);
    digitalButton.addEventListener("click",changeTwelvehours);
}

init();