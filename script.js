document.querySelector(".weather-result").style.filter = "blur(5px)"

let weatherCodes = [
    "☀️ Clear",
    "🌤️ Partly cloudy",
    "🌨️ Blowing snow or rain",
    "⌛ Sandstorm",
    "🌁 Fog or Haze",
    "🌦️ Drizzle",
    "☔ Rain",
    "🌧️ Snow or Rain",
    "🌦️ Showers",
    "⛈️ Thunderstorm"
]

// showing default weather by getting user location
const successCallback = (position) => {
    let lat = position.coords.latitude
    let lon = position.coords.longitude
    console.log(position.coords.latitude, position.coords.longitude);
    let fetchWeather = fetch("https://api.open-meteo.com/v1/forecast?latitude=" + Number(lat) + "&longitude=" + Number(lon) + "&current_weather=true")
    fetchWeather
    .then(res => res.json())
    .then(d => {
        document.querySelector(".weather-result").style.filter = "blur(0)"
        document.querySelector(".temp").textContent = `🌡️ ${d.current_weather.temperature}°C`
        document.querySelector(".win-speed").textContent = `💨 ${d.current_weather.windspeed}km/h`
        document.querySelector(".weather-type").textContent = `${weatherCodes[d.current_weather.weathercode]}`
    })
}
const errorCallback = (error) => {
    console.log(error)
}
navigator.geolocation.getCurrentPosition(successCallback, errorCallback)

document.querySelector(".search-btn").addEventListener("click", ()=>{
    document.querySelector(".weather-result").style.filter = "blur(5px)"
    let city = document.querySelector(".search-in").value
    let fetchCity = fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
    fetchCity
    .then(res => res.json())
    .then(c => {
        console.log(c)
        let lat = c.results[0].latitude
        let lon = c.results[0].longitude
        document.querySelector(".city").textContent = "📌 " + c.results[0].name
        document.querySelector(".state").textContent = c.results[0].admin1 + ","
        document.querySelector(".country").textContent = c.results[0].country
        let fetchWeather = fetch("https://api.open-meteo.com/v1/forecast?latitude=" + Number(lat) + "&longitude=" + Number(lon) + "&current_weather=true")
        fetchWeather.then(res => res.json())
        .then(d => {
            if(d.current_weather){  
            document.querySelector(".weather-result").style.filter = "blur(0)"
            document.querySelector(".temp").textContent = `🌡️ ${d.current_weather.temperature}°C`
            document.querySelector(".win-speed").textContent = `💨 ${d.current_weather.windspeed}km/h`
            document.querySelector(".weather-type").textContent = `${weatherCodes[d.current_weather.weathercode]}`
            }
        })
    })
})

