const analogHour = document.querySelector('.hour');
const analogMin = document.querySelector('.min');
const analogSec = document.querySelector('.sec');
//1. Date객체 받고
//2. sec, min, hour 불러와서 각 시간단위별로 몇 도씩 transform: rotate 해야되는 지 지정 
//3. 해당 함수 1초단위로 불러움 
function setDate(){
    const now = new Date();
    const seconds = now.getSeconds(); //호출한 당시의 딱 초 
    const secondsDegrees = ((seconds/60)*360)+90;
    analogSec.style.transform=`rotate(${secondsDegrees}deg)`
    
    const mins = now.getMinutes(); //호출한 당시의 딱 분
    const minsDegrees=((mins/60)*360)+90;
    analogMin.style.transform=`rotate(${minsDegrees}deg)`

    const hour = now.getHours();//호출한 당시의 딱 시간(디폴트는 24h 기준);
    const hourDegrees=((hour/12)*360)+90;
    analogHour.style.transform=`rotate(${hourDegrees}deg)`

    console.log(`${hour}:${mins}:${seconds}`);
}
setInterval(setDate,1000);