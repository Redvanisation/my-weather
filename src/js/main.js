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
    loc.innerHTML = `${name} ${country}`;
    deg.innerHTML = `${Math.floor(temp)} C`;
    // ic.setAttribute( 'src', `${icon}`);
    wth.innerHTML = `${weather}`;
    desc.innerHTML = `${theDescription}`;
}


// STARTING THE SCRIPT AFTER THE BODY LOADS IN HTML:
const start = () => {
    
    // GETTING THE GET WEATHER STARTER BUTTON:
    const weatherBtn = document.querySelector('#get-weather');

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
                            degree.innerHTML = `${Math.floor(tempF)} F`;
                            fahrenheit.classList.toggle('hidden');
                            celsius.classList.toggle('hidden');
                        });

                        celsius.addEventListener('click', () => {
                            degree.innerHTML = `${Math.floor(tempC)} C`;
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
    });


    
    
};