document.querySelector('.text').value = ""
 // to get the current position
var lat, lon
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};  
function success(pos) {
    const crd = pos.coords;
    lat = crd.latitude
    lon = crd.longitude
    weatherHere.fetchWeather()
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options)

// display the weather for the current position
let weatherHere = {
    "apikey": "9fdda83d3389f300764029533e7ca857",
    fetchWeather: function() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apikey}`)
        .then((responce) => responce.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind
        let content = document.querySelector('.content')
        content.style.cssText = `padding-top: 10px; height: ${interHeight(content)}px;`
        document.querySelector('.city').innerHTML = `weather in: ${name}`;
        document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${name})`
        document.querySelector('.icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        document.querySelector('.description').innerHTML = description;
        document.querySelector('.temp').innerHTML = `Temperature: ${temp}°c`;
        document.querySelector('.humidity').innerHTML = `Humidity: ${humidity}%`;
        document.querySelector('.speed').innerHTML = `Wind speed: ${speed}km/h`;
        document.querySelector('.text').value = name
    } 
}

// get the weather when search
let weather = {
    "apikey": "9fdda83d3389f300764029533e7ca857",
    fetchWeather: function(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apikey}`)
        .then((responce) => responce.json())
        .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind
        document.querySelector('.city').innerHTML = `weather in: ${name}`;
        document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${name})`
        document.querySelector('.icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        document.querySelector('.description').innerHTML = description;
        document.querySelector('.temp').innerHTML = `Temperature: ${temp}°c`;
        document.querySelector('.humidity').innerHTML = `Humidity: ${humidity}%`;
        document.querySelector('.speed').innerHTML = `Wind speed: ${speed}km/h`
    } 
}

let place = document.querySelector('.text')
let search = document.querySelector('.search-btn')
search.addEventListener('click', () => {
    if (/^[a-zA-Z]+$/.test(place.value)) // to make sure that the fuction run only when the user enter names
    {
        weather.fetchWeather(place.value)
    }
})

// to calculate the height of the part that is hidden
function interHeight(element) {
    var h = 0 
    var style = 0
    element = element.children
    for (let e =0 ; e < element.length ; e++){
        h += element[e].offsetHeight
        style += +(element[e].currentStyle || window.getComputedStyle(element[e]).marginBottom.slice(0,-2))
        style += +(element[e].currentStyle || window.getComputedStyle(element[e]).marginTop.slice(0,-2))
        style += +(element[e].currentStyle || window.getComputedStyle(element[e]).paddingTop.slice(0,-2))
        style += +(element[e].currentStyle || window.getComputedStyle(element[e]).paddingBottom.slice(0,-2))
    }
    console.log(h + style + 10)
    return h + style + 20
}