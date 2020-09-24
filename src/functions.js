
//change Background img
function changeBackground(weather) {
    let body = document.querySelector("body");
    if (weather === "clear sky") {
        body.style.backgroundImage = "url(src/media/0clear.jpg)";
    } else if (weather === "few clouds") {
        body.style.backgroundImage = "url(src/media/1fewclouds.jpg)";
    } else if (weather === "scattered clouds") {
        body.style.backgroundImage = "url(src/media/2scattered.jpg)";
    } else if (weather === "broken clouds") {
        body.style.backgroundImage = "url(src/media/3broken.jpg)";
    } else if (weather === "overcast clouds") {
        body.style.backgroundImage = "url(src/media/4overcast.jpg)";
    } else if (weather === "light rain" || weather === "moderate rain") {
        body.style.backgroundImage = "url(src/media/5rain.jpg)";
    } else if (weather === "heavy intensity rain" || weather === "very heavy rain" || weather === "extreme rain") {
        body.style.backgroundImage = "url(src/media/6heavyrain.jpg)";
    } else if (weather.includes("rain")) {
        body.style.backgroundImage = "url(src/media/5rain.jpg)";
    } else if (weather === "haze") {
        body.style.backgroundImage = "url(src/media/7haze.jpg)";
    } else if (weather === "mist" || weather === "fog") {
        body.style.backgroundImage = "url(src/media/8fog.jpg)";
    } else if (weather.includes("thunderstorm")) {
        body.style.backgroundImage = "url(src/media/9thunderstorm.jpg)";
    } else if (weather.includes("snow")) {
        body.style.backgroundImage = "url(src/media/snowfall.jpg)";
    } else {
        body.style.backgroundImage = "url(src/media/sky.jpg)";
    }
}


// Temperature 
function showTemp(response) {
     celsiusUnit.classList.add("active");
    fahrenheitUnit.classList.remove("active");
    
    let todayTemp = document.querySelector("#today-temp");
    celsiusTemp = response.data.main.temp; // already created and accessible // To store the value
    todayTemp.innerHTML = Math.round(celsiusTemp);

    let todayDescription = document.querySelector("#today-description");
    todayDescription.innerHTML = `${response.data.weather[0].description}`;

    let todayIcon = document.querySelector("#today-icon");
    todayIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    todayIcon.setAttribute("alt", response.data.weather[0].description);

    changeBackground(response.data.weather[0].description);
    //console.log(response.data.weather[0].description);

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = `${response.data.name}`;

    let countryElement = document.querySelector("#country");
    countryElement.innerHTML = `, ${response.data.sys.country}`;

    let currentHumidity = document.querySelector("#humidity-value");
    currentHumidity.innerHTML = `${response.data.main.humidity}`;

    let currentWind = document.querySelector("#wind-value");
    currentWind.innerHTML = `${Math.round(response.data.wind.speed)}`;

    function formatTime(time) {
        let hours = date.getHours();
        if (hours < 10) {
            hours = `0${hours}`;
        }
        let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        return `${hours}:${minutes}`;
    }

    let timeElement = document.querySelector("#time");
    let date = new Date();
    timeElement.innerHTML = formatTime(time);
}

let celsiusTemp = null; //global variable


// Forecast time
function formatTime(timestamp) {
    let date = new date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
}

//Forecast 
function showForecast(response) {
    console.log(response.data);
    let forecast1 = response.data.list[1];
    let forecast2 = response.data.list[2];
    let forecast3 = response.data.list[3];

    let forecast1Description = document.querySelector("#forecast1-desc");
    forecast1Description.innerHTML = `${forecast1.weather[0].description}`;

    let forecast1Icon = document.querySelector("#forecast1-img");
    forecast1Icon.setAttribute("src", `http://openweathermap.org/img/wn/${forecast1.weather[0].icon}@2x.png`);
    forecast1Icon.setAttribute("alt", forecast1.weather[0].description);

    let forecast1Time = document.querySelector("#forecast1-time");
    //forecast1Time.innerHTML = `${formatTime(forecast1.dt * 1000)}`;
    
    let forecast2Description = document.querySelector("#forecast2-desc");
    forecast2Description.innerHTML = `${forecast2.weather[0].description}`;

    let forecast2Icon = document.querySelector("#forecast2-img");
    forecast2Icon.setAttribute("src", `http://openweathermap.org/img/wn/${forecast2.weather[0].icon}@2x.png`);
    forecast2Icon.setAttribute("alt", forecast2.weather[0].description);

    let forecast2Time = document.querySelector("#forecast2-time");
    //forecast2Time.innerHTML = `${forecast2.dt}`;

    let forecast3Description = document.querySelector("#forecast3-desc");
    forecast3Description.innerHTML = `${forecast3.weather[0].description}`;

    let forecast3Icon = document.querySelector("#forecast3-img");
    forecast3Icon.setAttribute("src", `http://openweathermap.org/img/wn/${forecast3.weather[0].icon}@2x.png`);
    forecast3Icon.setAttribute("alt", forecast3.weather[0].description);

    let forecast3Time = document.querySelector("#forecast3-time");
    //forecast3Time.innerHTML = `${forecast3.dt}`;
}


//My Location API
function handlePosition(position) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showTemp);

    let keyApi = "67a9f186348f05c767ebc82bbd14474d";
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${keyApi}`;
    axios.get(apiUrl).then(showForecast);
}

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(handlePosition);
}

let myButton = document.querySelector("#current-location-btn");
myButton.addEventListener("click", getCurrentPosition);


// city Input API
function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#input-city"); 
    let cityElement = document.querySelector("#city");

    if (searchInput.value) {
        let city = `${searchInput.value}`;
        let apiKey = "67a9f186348f05c767ebc82bbd14474d";
        let units = "metric";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
        //console.log(apiUrl);
        axios.get(apiUrl).then(showTemp);

        let keyApi = "67a9f186348f05c767ebc82bbd14474d";
        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${keyApi}&units=${units}`;
        axios.get(apiUrl).then(showForecast);

    } else {
        cityElement.innerHTML = null;
        alert("Please enter a location");
    }
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//Fahrenheit
function showFahrenheit(event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#today-temp");
    // remove active class from celsius Unit & add it to Fahrenheit in CSS
    celsiusUnit.classList.remove("active");
    fahrenheitUnit.classList.add("active");

        if (celsiusTemp === null) {
        alert("Search by location or city name");
        } else {
        let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
        currentTemp.innerHTML = Math.round(fahrenheitTemp);
        }
    }

let fahrenheitUnit = document.querySelector("#fahrenheit-unit");
fahrenheitUnit.addEventListener("click", showFahrenheit);

//Celsius
function showCelsius(event) {
    event.preventDefault();
    celsiusUnit.classList.add("active");
    fahrenheitUnit.classList.remove("active");

    let currentTemp = document.querySelector("#today-temp"); 

    if (celsiusTemp === null) {
        alert("Search by location or city name");
    } else {
        currentTemp.innerHTML = Math.round(celsiusTemp);
    }
}

let celsiusUnit = document.querySelector("#celsius-unit");
celsiusUnit.addEventListener("click", showCelsius);

//Current day
function formatDate(now) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let today = days[now.getDay()];
    return `${today}`;
}

let today = document.querySelector("#today");
let now = new Date();
today.innerHTML = formatDate(now);