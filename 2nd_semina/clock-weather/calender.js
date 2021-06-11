const calendarHeader = document.querySelector(".calendar-header");
const calendarWeek = document.querySelector(".calendar-week");
const calendarDate = document.querySelector(".calendar-date");

//월별 날짜수 세팅
function getMaxDate(month) {
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
}

//요일 세팅
function getStartWeek(date, week) {
  if (date > week) {
    date %= 7;
    if (date === 0) week += 1;
    else week = (week - date + 8) % 7;
  }
  return week;
}

//일 그림
function drawDate(month, date, week) {
  const maxDate = getMaxDate(month);
  const startWeek = getStartWeek(date, week);
  console.log(startWeek);
  let dateLine = document.createElement("div"); // 달력 줄
  for (let i = 1; i <= startWeek + maxDate; i++) {
    const dateEl = document.createElement("div"); // 날짜 칸

    // 달력 맨 처음의 빈 부분
    if (i <= startWeek) {
      dateLine.appendChild(dateEl);
      // 날짜 칸
    } else {
      dateEl.innerText = i - startWeek;
      // 오늘 날짜 표시
      if (i - startWeek === date) dateEl.style.color = "rgb(218, 76, 76)";
      dateLine.appendChild(dateEl);

      // 달력 줄바꿈
      if (i % 7 === 0) {
        calendarDate.appendChild(dateLine);
        dateLine = document.createElement("div");
      } else if (i === startWeek + maxDate) {
        calendarDate.appendChild(dateLine);
      }
    }
  }
}

//월 그림
function drawMonth(month) {
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
  console.log(monthList);
  console.log("month", month);
  month = monthList[month];
  console.log("new month", month);
  calendarHeader.innerText = `${month}`;
}

//요일 그림
function drawWeek() {
  const week = ["S", "M", "T", "W", "T", "F", "S"];
  week.forEach((week) => {
    const eachWeek = document.createElement("div");
    eachWeek.innerText = week;
    calendarWeek.appendChild(eachWeek);
  });
}

function drawAll() {
  const now = new Date();
  const week = now.getDay();
  const date = now.getDate();
  const month = now.getMonth();

  drawMonth(month);
  drawWeek();
  drawDate(month, date, week);
}

drawAll();
