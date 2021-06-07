const weatherTemp = document.querySelector(".weather-temperature");
const weatherStatus = document.querySelector(".weather-status");
const weatherFirst = document.querySelector(".weather-first");
const weatherOthers = document.querySelector(".weather-others");
const weatherIcon = document.querySelector(".weather-icon");

const API_KEY="150ea3fb9fa521e207d6c1c7626a7f1e";
//API) 다른 웹사이트로부터 데이터 가져올 수 있고, 머신들끼리 소통 가능.

function drawWeather(weather){
    weatherTemp.innerHTML =  `${weather.temp} °C`;
    weatherStatus.innerHTML = `${weather.main}`;
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="icon" />`;
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

}

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json();
    }).then(function(json){//json로드 후에 파라미터로 받아서 실제 html에 추가하는 함수 실행

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
            rain: json.rain? json.rain["1h"] : null,
            icon: json.weather[0].icon,
        } 
        drawWeather(weather);
    });
}



function handleGeoSucces(position){
    console.log(position);
    const latitude = position.coords.latitude; //콘솔창에 출력된 포지션 값 보고 어떤 객체에 latitude가 있는지 확인해서 대입함.
    const longitude = position.coords.longitude;
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("Failed to get current geo lacation");
}

function askForCoords(){
    //naviagator은 document, window같은 객체임. 시스템 내장 메소드들 많이 사용 가능
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);//두 개의 함수를 인자로 필요로 함
}

askForCoords();