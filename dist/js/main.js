'use strict';

// API URL:
var url = "https://fcc-weather-api.glitch.me/api/current?";

// GETTING THE VIDEO TAG ELEMENT
var video = document.querySelector('#bg-video');

// GETTING THE WEATHER ELEMENTS
var localisation = document.querySelector('#location');
var degree = document.querySelector('#degree');
// const icon = document.querySelector('#icon');
var weather = document.querySelector('#weather');
var description = document.querySelector('#description');

// GETTING THE BUTTONS
var celsius = document.querySelector('#cel');
var fahrenheit = document.querySelector('#fah');

//DECLARING THE MAIN VARIABLES: 
var latitude = void 0;
var longitude = void 0;

// FUNCTIONS:

// FUNCTION TO CONVERT CELCIUS TO FAHRENHEIT
var toFah = function toFah(c) {
    return c * 1.8 + 32;
};

// FUNCTION TO ADD THE ALTITUDE AND LONGITUDE COORDENATES TO THE API URL:
var weatherCall = function weatherCall(lat, long) {
    var latitude = 'lat=' + lat;
    var longitude = '&lon=' + long;
    url = '' + url + latitude + longitude;
    // console.log(url);
};

// FUNCTION TO SHOW THE WEATHER DETAILS ON THE SCREEN:
var getWeather = function getWeather(loc, deg, wth, desc, name, country, temp, weather, theDescription) {
    loc.innerHTML = '<span class="main-section__content--elm-black">' + name + '</span>, <span class="main-section__content--elm-white">' + country + '</span>';
    deg.innerHTML = '<span class="main-section__content--degg"><span class="main-section__content--elm-black main-section__content--degree">' + Math.floor(temp) + ' </span><span class="main-section__content--elm-white main-section__content--degree">C</span></span>';
    // ic.setAttribute( 'src', `${icon}`);
    wth.innerHTML = '<span class="main-section__content--elm-black main-section__content--weather-status">' + weather + '</span>';
    desc.innerHTML = '<span class="main-section__content--elm-white main-section__content--description">' + theDescription + '</span>';
};

// STARTING THE SCRIPT AFTER THE BODY LOADS IN HTML:
var start = function start() {

    // GETTING THE GET WEATHER STARTER BUTTON & TEXT:
    var weatherBtn = document.querySelector('#get-weather');
    var starterText = document.querySelector('#starter-text');

    // DEFINING WHAT WILL HAPPEN AFTER CLICKING THE GET WEATHER BUTTON:
    weatherBtn.addEventListener('click', function () {

        // GETTING THE USER'S LOCALISATION IF IT IS SUPPORTED BY THE BROWSER:
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {

                // STORING THE LOCALISATION COORDENATES IN VARIABLES AND ADDING THEM TO THE API URL:
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                weatherCall(latitude, longitude);

                // FETCHING THE API DATA FROM THE SERVER:
                fetch(url).then(function (data) {
                    return data.json();
                }).then(function (res) {

                    // IMPLIMENTING A CONTROL FLOW SWITCH TO SHOW BACKGROUND VIDEOS DEPENDING ON THE WEATHER STATE:
                    switch (res.weather[0].main) {
                        case "Clear":
                            video.setAttribute('src', '../../videos/clearSky.mp4');
                            break;
                        case "Clouds":
                            video.setAttribute('src', '../../videos/coulds1.mp4');
                            break;
                        case "Few Clouds":
                            video.setAttribute('src', '../../videos/partlyCloudy/MP4/partlyCloudy.mp4');
                            break;
                        case "Scattered Clouds":
                            video.setAttribute('src', '../../videos/partlyCloudy/MP4/partlyCloudy.mp4');
                            break;
                        case "Broken Clouds":
                            video.setAttribute('src', '../../videos/partlyCloudy/MP4/partlyCloudy.mp4');
                            break;
                        case "Rain":
                            video.setAttribute('src', '../../videos/rain/WEBM/rain.webm');
                            break;
                        case "Shower Rain":
                            video.setAttribute('src', '../../videos/rain/WEBM/rain.webm');
                            break;
                        case "Thunderstorm":
                            video.setAttribute('src', '../../videos/thunder.mp4');
                            break;
                        case "Snow":
                            video.setAttribute('src', '../../videos/snow/snow.mp4');
                            break;
                        case "Mist":
                            video.setAttribute('src', '../../videos/fog.mp4');
                            break;
                        default:
                            video.setAttribute('src', '../../videos/clearSky.mp4');
                            break;
                    }

                    // STORING WEATHER INFORMATIONS IN VARIABLES
                    var name = res.name;
                    var country = res.sys.country;
                    var tempC = res.main.temp;
                    // let theIcon = res.weather[1].icon;
                    var theWeather = res.weather[0].main;
                    var theDescription = res.weather[0].description;

                    // CALLING THE GETWEATHER FUNCTION TO PUT EVERY PIECE OF DATA IN ITS RELATED HTML TAG:
                    getWeather(localisation, degree, weather, description, name, country, tempC, theWeather, theDescription);

                    // SHOWING THE CONVERTION BUTTON:
                    fahrenheit.classList.toggle('hidden');

                    // STORING THE CONVERTED VALUE OF THE CONVERTION FROM C TO F IN A VARIABLE:
                    var tempF = toFah(tempC);

                    // CONVERTING THE SHOWEN VALUE ON THE SCREEN WHEN THE CONVERTION BUTTON IS CLICKED:
                    fahrenheit.addEventListener('click', function () {
                        degree.innerHTML = '<span class="main-section__content--elm-black main-section__content--degree">' + Math.floor(tempF) + ' </span><span class="main-section__content--elm-white main-section__content--degree">F</span>';
                        fahrenheit.classList.toggle('hidden');
                        celsius.classList.toggle('hidden');
                    });

                    celsius.addEventListener('click', function () {
                        degree.innerHTML = '<span class="main-section__content--elm-black main-section__content--degree">' + Math.floor(tempC) + ' </span><span class="main-section__content--elm-white main-section__content--degree">C</span>';
                        celsius.classList.toggle('hidden');
                        fahrenheit.classList.toggle('hidden');
                    });
                });
            });
        } else {
            alert("Failed to get the location, please refresh the page pressing 'F5' and allow the navigator to get your location");
        }
        weatherBtn.classList.toggle("hidden");
        starterText.classList.toggle('hidden');
    });
};