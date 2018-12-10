// API URL:
let url = "https://fcc-weather-api.glitch.me/api/current?";

// GETTING THE VIDEO TAG ELEMENT
const video = document.querySelector('#bg-video');

// GETTING THE WEATHER ELEMENTS
const localisation = document.querySelector('#location');
const degree = document.querySelector('#degree');
// const icon = document.querySelector('#icon');
const weather = document.querySelector('#weather');
const description = document.querySelector('#description');

// GETTING THE BUTTONS
const celsius = document.querySelector('#cel');
const fahrenheit = document.querySelector('#fah');


//DECLARING THE MAIN VARIABLES: 
let latitude;
let longitude;

// FUNCTIONS:

// FUNCTION TO CONVERT CELCIUS TO FAHRENHEIT
const toFah = (c) => {
    return c * 1.8 + 32;
}

// FUNCTION TO ADD THE ALTITUDE AND LONGITUDE COORDENATES TO THE API URL:
const weatherCall = (lat, long) => {
    let latitude = `lat=${lat}`;
    let longitude = `&lon=${long}`;
    url = `${url}${latitude}${longitude}`
    // console.log(url);
}

// FUNCTION TO SHOW THE WEATHER DETAILS ON THE SCREEN:
const getWeather = (loc, deg, wth, desc, name, country, temp, weather, theDescription) => {
    loc.innerHTML = `<span class="main-section__content--elm-black">${name}</span>, <span class="main-section__content--elm-white">${country}</span>`;
    deg.innerHTML = `<span class="main-section__content--degg"><span class="main-section__content--elm-black main-section__content--degree">${Math.floor(temp)} </span><span class="main-section__content--elm-white main-section__content--degree">C</span></span>`;
    // ic.setAttribute( 'src', `${icon}`);
    wth.innerHTML = `<span class="main-section__content--elm-black main-section__content--weather-status">${weather}</span>`;
    desc.innerHTML = `<span class="main-section__content--elm-white main-section__content--description">${theDescription}</span>`;
}


// STARTING THE SCRIPT AFTER THE BODY LOADS IN HTML:
const start = () => {
    
    // GETTING THE GET WEATHER STARTER BUTTON & TEXT:
    const weatherBtn = document.querySelector('#get-weather');
    const starterText = document.querySelector('#starter-text');

    // DEFINING WHAT WILL HAPPEN AFTER CLICKING THE GET WEATHER BUTTON:
    weatherBtn.addEventListener('click', () => {
        
        // GETTING THE USER'S LOCALISATION IF IT IS SUPPORTED BY THE BROWSER:
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                
                // STORING THE LOCALISATION COORDENATES IN VARIABLES AND ADDING THEM TO THE API URL:
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                weatherCall(latitude, longitude);

                // FETCHING THE API DATA FROM THE SERVER:
                fetch(url).then((data) => data.json()).then((res) => {
                    
                    // IMPLIMENTING A CONTROL FLOW SWITCH TO SHOW BACKGROUND VIDEOS DEPENDING ON THE WEATHER STATE:
                    switch (res.weather[0].main) {
                        case "Clear":
                            video.innerHTML = `<source src="https://redvanisation.github.io/my-weather/videos/compressed/clearSky.mp4">
                            `;
                            break;
                        case "Clouds":
                            video.innerHTML = `<source src="https://redvanisation.github.io/my-weather/videos/compressed/coulds1.mp4">
                            `;
                            break;
                        case "Few Clouds":
                            video.innerHTML = `<source src="https://redvanisation.github.io/my-weather/videos/compressed/partlyCloudy.mp4">
                            `;
                            break;
                        case "Scattered Clouds":
                            video.innerHTML = `<source src="https://redvanisation.github.io/my-weather/videos/compressed/partlyCloudy.mp4">`;
                            break;
                        case "Broken Clouds":
                            video.innerHTML = `<source src="https://redvanisation.github.io/my-weather/videos/compressed/partlyCloudy.mp4">`;
                            break;
                        case "Rain":
                            video.innerHTML = `<source src="https://redvanisation.github.io/my-weather/videos/compressed/rain.mp4">`;
                            break;
                        case "Shower Rain":
                            video.innerHTML = `<source src="https://redvanisation.github.io/my-weather/videos/compressed/rain.mp4">
                            `;
                            break;
                        case "Thunderstorm":
                            video.innerHTML = `<source src="https://redvanisation.github.io/my-weather/videos/compressed/thunder.mp4">
                            `;
                            break;
                        case "Snow":
                            video.innerHTML = `<source src="https://redvanisation.github.io/my-weather/videos/compressed/snow/snow.mp4">
                            `;
                            break;
                        case "Mist":
                            video.innerHTML = `<source src="https://redvanisation.github.io/my-weather/videos/compressed/fog.mp4">
                            `;
                            break;
                        default:
                            video.innerHTML = `<source src="#">`;
                            break;
                    }

                        // STORING WEATHER INFORMATIONS IN VARIABLES
                        let name = res.name;
                        let country = res.sys.country;
                        let tempC = res.main.temp;
                        // let theIcon = res.weather[1].icon;
                        let theWeather = res.weather[0].main;
                        let theDescription = res.weather[0].description;
                        
                        // CALLING THE GETWEATHER FUNCTION TO PUT EVERY PIECE OF DATA IN ITS RELATED HTML TAG:
                        getWeather(localisation, degree, weather, description, name, country, tempC, theWeather, theDescription);

                        // SHOWING THE CONVERTION BUTTON:
                        fahrenheit.classList.toggle('hidden');


                        // STORING THE CONVERTED VALUE OF THE CONVERTION FROM C TO F IN A VARIABLE:
                        const tempF = toFah(tempC);
                        
                        // CONVERTING THE SHOWEN VALUE ON THE SCREEN WHEN THE CONVERTION BUTTON IS CLICKED:
                        fahrenheit.addEventListener('click', () => {
                            degree.innerHTML = `<span class="main-section__content--elm-black main-section__content--degree">${Math.floor(tempF)} </span><span class="main-section__content--elm-white main-section__content--degree">F</span>`;
                            fahrenheit.classList.toggle('hidden');
                            celsius.classList.toggle('hidden');
                        });

                        celsius.addEventListener('click', () => {
                            degree.innerHTML = `<span class="main-section__content--elm-black main-section__content--degree">${Math.floor(tempC)} </span><span class="main-section__content--elm-white main-section__content--degree">C</span>`;
                            celsius.classList.toggle('hidden');
                            fahrenheit.classList.toggle('hidden');
                        });

                    }
                );

            });
        } else {
            alert("Failed to get the location, please refresh the page pressing 'F5' and allow the navigator to get your location");
        }
        weatherBtn.classList.toggle("hidden");
        starterText.classList.toggle('hidden');
    });


    
    
};