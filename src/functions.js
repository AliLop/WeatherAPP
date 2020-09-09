  //My Location API
  function showWeather(response) {
    console.log(response.data);
    let myTemp = document.querySelector("#today-temp");
    let myTemperature = Math.round(response.data.main.temp);
    myTemp.innerHTML = `${myTemperature}`;

    let myCity = document.querySelector("#current-city");
    myCity.innerHTML = `${
      response.data.name.charAt(0).toUpperCase() +
      response.data.name.slice(1).toLowerCase()
    }`;

    let myDescription = document.querySelector("#today-description");
    myDescription.innerHTML = `${
      response.data.weather[0].description.charAt(0).toUpperCase() +
      response.data.weather[0].description.slice(1).toLowerCase()
    }`;

    let myHumidity = document.querySelector("#humidity-value");
    myHumidity.innerHTML = `${response.data.main.humidity}`;

    let myWind = document.querySelector("#wind-value");
    myWind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  };

function handlePosition(position) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
}

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(handlePosition);
}

let myButton = document.querySelector("#current-location-btn");
myButton.addEventListener("click", getCurrentPosition);



// city Input Weather API
function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#input-city");
    let currentCity = document.querySelector("#current-city");

    if (searchInput.value) {

        let city = `${searchInput.value}`;
        let apiKey = "67a9f186348f05c767ebc82bbd14474d";
        let units = "metric";

        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

        function showTemperature(response) {
            console.log(response.data);
            let todayTemp = Math.round(response.data.main.temp);
            let currentTemp = document.querySelector("#today-temp");
            currentTemp.innerHTML = `${todayTemp}`;

            let todayDescription = document.querySelector("#today-description");
            todayDescription.innerHTML = `${response.data.weather[0].description.charAt(0).toUpperCase() + response.data.weather[0].description.slice(1).toLowerCase()}`;

            let currentCity = document.querySelector("#current-city");
            currentCity.innerHTML = `${response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1).toLowerCase()}`;

            let currentHumidity = document.querySelector("#humidity-value");
            currentHumidity.innerHTML = `${response.data.main.humidity}`;

            let currentWind = document.querySelector("#wind-value");
            currentWind.innerHTML = `${Math.round(response.data.wind.speed)}`;
        }

        axios.get(apiUrl).then(showTemperature);

    } else {
        currentCity.innerHTML = null;
        alert("Please type a city name");
    }
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);


//Current day and time
function formatDate(now) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let today = days[now.getDay()];
    
    let hours = now.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }

    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${today} ${hours}:${minutes}`;  
}

let today = document.querySelector("#today");
let now = new Date();
today.innerHTML = formatDate(now);
