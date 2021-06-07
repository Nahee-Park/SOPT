const calenderHeader = document.querySelector(".calender-header");
const calenderWeek = document.querySelector(".calender-week");
const calenderDate = document.querySelector(".calender-date");
const now = new Date();
const week=now.getDay(); //0
const date=now.getDate(); //25
const month = now.getMonth(); 

console.log(now.getDate()); //25
console.log(now.getDay()); //0
console.log(month); //3


function drawMonth(month){
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
    calenderHeader.innerHTML = `${monthList[month]}`;
}

function drawWeek(){
    const week = ["S", "M", "T", "W", "T", "F", "S"];
    week.forEack((day)=>{
        const eachDay = document.createElement("div")
        eachDay.innerText = day;
        calenderWeek.appendChild(eachDay);
    })
}

function getMaxDate(month){
    switch (month + 1) {
        case 2:
            return 28;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        default:
            return 31;
    }
};

function drawDate(month, date, week){
    
}



function drawAll(){
    drawMonth(month);
    drayweek();
    draydate(date);
}

drawAll();

