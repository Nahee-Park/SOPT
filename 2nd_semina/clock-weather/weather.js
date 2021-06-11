const weatherTemp = document.querySelector(".weather-temperature");
const weatherStatus = document.querySelector(".weather-status");
const weatherFirst = document.querySelector(".weather-first");
const weatherOthers = document.querySelector(".weather-others");
const body = document.querySelector("body");

const API_KEY = "150ea3fb9fa521e207d6c1c7626a7f1e";
//API) 다른 웹사이트로부터 데이터 가져올 수 있고, 머신들끼리 소통 가능.

function drawIcon(id) {
  const skycons = new Skycons({ color: "white", resizeClear: true });
  //<canvas id="weather-icon"></canvas>
  skycons.add("weather-icon", Skycons.CLOUDY);

  const code = parseInt(id / 100); // id 번호에 따라 날씨가 분류됨
  const hour = new Date().getHours();

  console.log("code가 어딩", code);
  console.log("skycons", skycons);
  switch (code) {
    case 2:
      skycons.set("weather-icon", Skycons.WIND);
      break;
    case 3:
    case 5:
      skycons.set("weather-icon", Skycons.RAIN);
      break;
    case 6:
      skycons.set("weather-icon", Skycons.SNOW);
      break;
    case 7:
      skycons.set("weather-icon", Skycons.FOG);
      break;
    case 8:
      switch (id) {
        case 800:
          if (hour >= 6 && hour <= 17)
            skycons.set("weather-icon", Skycons.CLEAR_DAY);
          else skycons.set("weather-icon", Skycons.CLEAR_NIGHT);
          break;
        case 801:
        case 802:
          if (hour >= 6 && hour <= 17)
            skycons.set("weather-icon", Skycons.PARTLY_CLOUDY_DAY);
          else skycons.set("weather-icon", Skycons.PARTLY_CLOUDY_NIGHT);
          break;
        case 803:
        case 804:
          skycons.set("weather-icon", Skycons.CLOUDY);
          break;
      }
      break;
    default:
      skycons.set("weather-icon", Skycons.SLEET);
      break;
  }
  skycons.play();
}

function drawWeather(weather) {
  weatherTemp.innerHTML = `${weather.temp} °C`;
  weatherStatus.innerHTML = `${weather.main}`;
  //맑은 날엔 파란색 배경으로
  if (weather.main == "Snow") {
    body.style.backgroundColor = "rgb(150, 194, 230)";
  } else if (
    weather.main == "Rain" ||
    weather.main == "Clouds" ||
    weather.main == "Thunderstorm"
  ) {
    body.style.backgroundColor = "rgb(152,153,158)";
  }
  weatherFirst.innerHTML = `<span>Feels:</span> ${weather.tempFeel} °C &nbsp;&nbsp;
    <span>Min:</span> ${weather.tempMin} °C &nbsp;&nbsp;
    <span>Max:</span> ${weather.tempMax} °C`;
  if (weather.rain) {
    weatherOthers.innerHTML = `<span>Humidity:</span> ${weather.hum} 
        <span>Rain:</span> ${weather.rain} mm/h 
        <span>Wind:</span> ${weather.wind} m/s`;
  } else {
    weatherOthers.innerHTML = `<span>Humidity:</span> ${weather.hum} % &nbsp;&nbsp;
        <span>Wind:</span> ${weather.wind} m/s`;
  }
  //  weather.id에 날씨값이 담겨있음
  drawIcon(weather.id);
}

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      //json로드 후에 파라미터로 받아서 실제 html에 추가하는 함수 실행

      console.log(json);
      const weather = {
        temp: json.main.temp.toFixed(2),
        tempFeel: json.main.feels_like.toFixed(2),
        tempMin: json.main.temp_min.toFixed(2),
        tempMax: json.main.temp_max.toFixed(2),
        hum: json.main.humidity,
        main: json.weather[0].main,
        wind: json.wind.speed,
        id: json.weather[0].id,
        rain: json.rain ? json.rain["1h"] : null,
        icon: json.weather[0].icon,
      };
      drawWeather(weather);
    });
}

function handleGeoSucces(position) {
  console.log(position);
  const latitude = position.coords.latitude; //콘솔창에 출력된 포지션 값 보고 어떤 객체에 latitude가 있는지 확인해서 대입함.
  const longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Failed to get current geo lacation");
}

function askForCoords() {
  //naviagator은 document, window같은 객체임. 시스템 내장 메소드들 많이 사용 가능
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError); //두 개의 함수를 인자로 필요로 함
}

askForCoords();
