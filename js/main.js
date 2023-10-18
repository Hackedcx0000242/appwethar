const search = document.querySelector("#search-city");
const button = document.querySelector("#button");
const cityn = document.querySelector("#cityn");
const country = document.querySelector("#country");
const day = document.querySelector("#day");
const daate = document.querySelector("#date");
const time = document.querySelector("#time");
const temp = document.querySelector("#temp");
const aqicolor = document.querySelector("#AQIcolor");
const weatherimg = document.querySelector("#weatherimg");
const feel = document.querySelector("#feellike");
const humality = document.querySelector("#humidity");
const visibility = document.querySelector("#visibility");
const wind = document.querySelector("#wind");
const uv = document.querySelector("#uv");
console.log(humidity);
console.log(weatherimg);

const AQI = document.querySelector("#air-quality");
// AQI.innerHTML = "ol";
console.log(AQI);
let arr = [];
let arr2 = [];
let airwrong = [];
async function my() {
  let url = "https://restcountries.com/v3.1/all?fields=name,altSpellings";
  let response = await fetch(url);
  let data = await response.json();
  arr = data;
}

my();
console.log(search);
async function weather(cityName) {
  const apiKey = "75c1392a4d080822c2d92bd764771ac7";
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let coun = arr.find((country) => {
        return country.altSpellings[0] == data.sys.country;
      });
      if (coun != undefined) {
        country.innerText = coun.name.common;
      }
      const getDay = () => {
        const currentDate = new Date(data.dt * 1000);
        const options2 = { weekday: "long" };
        const dayName = currentDate.toLocaleDateString("en-US", options2);
        return `${dayName}`;
      };
      day.innerText = getDay();
      const getCurrentDate = () => {
        const currentDate = new Date(data.dt * 1000);
        const options = { month: "long", day: "numeric", year: "numeric" };
        const formattedDate = currentDate.toLocaleDateString("en-US", options);
        return `${formattedDate}`;
      };

      daate.innerText = getCurrentDate();
      cityn.innerText = data.name;
      temp.innerText = `${Math.round(data.main.temp - 273.15)}°`;

      switch (data.weather[0].main) {
        case "Clear":
          weatherimg.src = "/img/weather-icon/clear-sky.svg";
          break;
        case "Haze":
          weatherimg.src = "/img/weather-icon/haze.png";
          break;

        case "few clouds":
          weatherimg.src = "/img/weather-icon/few-clouds.svg";
          break;
        case "clouds":
          weatherimg.src = "/img/weather-icon/scattered-clouds.svg";
          break;
        // case "clouds":
        //   weatherimg.src = "/img/weather-icon/broken-clouds.svg";
        //   break;
        case "shower rain":
          weatherimg.src = "/img/weather-icon/shower-rain.svg";
          break;
        case "rain":
          weatherimg.src = "/img/weather-icon/rain.svg";
          break;
        case "thunderstorm":
          weatherimg.src = "/img/weather-icon/thunderstorm.svg";
          break;
        case "snow":
          weatherimg.src = "/img/weather-icon/snow.svg";
          break;
        case "mist":
          Z;
          weatherimg.src = "/img/weather-icon/mist.svg";
          break;
        case "thunderstorm rain":
          weatherimg.src = "/img/weather-icon/thunderstorm-rain.svg";
          break;
      }
      human = data.main.humidity;
      humidity.innerText = human;
      // const visible = data.visibility / 1000;
      // update.classList.add("my-styled-div");
      wind.innerHTML = (data.wind.speed * 3.6).toFixed(2);
      // visibility.innerText = `${visible.toFixed(2)} `;
      console.log("okdone", data.weather[0].description, data.weather[0].main);
      feel.innerText = Math.round(data.main.feels_like - 273.15);
    });
}

async function air(cityName) {
  const api = "CXMBKB8G8ATEPHC3HRTD7RWUJ";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=${api}&contentType=json`;
  let response = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const currentTime = data.currentConditions.datetime;
      const [hours, minutes] = currentTime.split(":");
      let formattedTime;
      if (hours > 12) {
        formattedTime = hours - 12 + ":" + minutes + " PM";
      } else if (hours === "0") {
        formattedTime = "12:" + minutes + " AM";
      } else if (hours === "12") {
        formattedTime = "12:" + minutes + " PM";
      } else {
        formattedTime = hours + ":" + minutes + " AM";
      }
      time.innerText = formattedTime;
      visibility.innerHTML = data.currentConditions.visibility;
    })
    .catch((error) => {
      console.log("Error fetching air pollution data:", error);
    });
}
async function aqi(cityName) {
  const url = `https://api.waqi.info/feed/${cityName}/?token=359ee8c9409d247d0928fd5533026101d7b40c45`;
  const res = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let airQuality = data.data.aqi;
      // let lat = data.coord.lat;
      // let lon = data.coord.lon;
      // console.log("my", lat);
      // AQI.innerText = airQuality;
      if (airQuality != undefined) {
        AQI.innerText = airQuality;
        function updateAQI(airQuality) {
          if (airQuality >= 0 && airQuality <= 20) {
            aqicolor.style.backgroundColor = "#6bdf4e";
          } else if (airQuality >= 20 && airQuality <= 80) {
            aqicolor.style.backgroundColor = "yellow";
          } else if (airQuality >= 80 && airQuality <= 250) {
            aqicolor.style.backgroundColor = "#ffa023";
          } else if (airQuality >= 250 && airQuality <= 350) {
            aqicolor.style.backgroundColor = "#cd5f00";
          } else if (airQuality >= 350 && airQuality <= 500) {
            aqicolor.style.backgroundColor = "red";
          }
          console.log("op", data);
        }
        updateAQI(airQuality);
      } else {
        const apiKey = "75c1392a4d080822c2d92bd764771ac7";
        const city = "Bareilly";

        fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
        )
          .then((response) => response.json())
          .then((data) => {
            const lat = data[0].lat;
            console.log("city", data);
            const lon = data[0].lon;
            fetch(
              `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
            )
              .then((response) => response.json())
              .then((data) => {
                const airQuality = data.list[0].main.aqi;
                AQI.innerText = `${airQuality} Unit`;
                //
                function updateAQI(airQuality) {
                  if (airQuality >= 0 && airQuality <= 3) {
                    aqicolor.style.backgroundColor = "#6bdf4e";
                  } else if (airQuality >= 3 && airQuality <= 4) {
                    aqicolor.style.backgroundColor = "yellow";
                  } else if (airQuality >= 4 && airQuality <= 7) {
                    aqicolor.style.backgroundColor = "#ffa023";
                  } else if (airQuality >= 7 && airQuality <= 8) {
                    aqicolor.style.backgroundColor = "#cd5f00";
                  } else if (airQuality >= 8 && airQuality <= 9) {
                    aqicolor.style.backgroundColor = "red";
                  }
                }
                updateAQI(airQuality);
              });
            // Now you can use these latitude and longitude values to fetch the air quality data.
          })
          .catch((error) => {
            console.log(
              "An error occurred while fetching the latitude and longitude."
            );
          });
      }

      console.log("ok", data.data);
    })

    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
}
async function uvi(city) {
  const apiKey = "d2ecff41a7a7454d841fba25b9d1dc5a";

  await fetch(
    `https://api.weatherbit.io/v2.0/current/uv?city=${city}&key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      const uvIndex = data?.data[0]?.uv;
      uv.innerHTML = uvIndex.toFixed(1);
    })
    .catch((error) => {
      console.error("An error occurred while fetching the UV index:", error);
    });
}

button.addEventListener("click", () => {
  weather(search.value);
  air(search.value);
  aqi(search.value);
  uvi(search.value);
});
