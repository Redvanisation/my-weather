// Starting JavaScript after the DOM is loaded
$(document).ready(function() {
	// Declaring a global variables and the api's url variable:
	var url = "https://fcc-weather-api.glitch.me/api/current?";
	var latitude;
	var longitude;
	var temp;

	//Creating an object of dynamic wallpapers of the app:
	var wallpapers = {
		clearSky: "http://www.wallpaperbetter.com/wallpaper/1024/879/794/landscape-simple-nature-moon-mountain-snowy-peak-clear-sky-1080P-wallpaper.jpg",
		clouds: "http://c1.peakpx.com/wallpaper/845/799/642/after-the-storm-dark-clouds-clouds-wallpaper.jpg",
		rain: "http://www.ehowzit.co.za/wp-content/uploads/2016/07/rainy-weather.jpg",
		thunderstorm: "https://wallpaperdownload.xyz/wp-content/uploads/2017/01/thunderstorm-live-wallpaper.jpg",
		snow: "http://hddesktopwallpapers.in/wp-content/uploads/2015/07/snow-wallpaper-sunrise.jpg",
		mist: "http://eskipaper.com/images/fog-wallpaper-8.jpg"
	}

	// creating the convertion to fahrenheit and to celsius functions:
	function toFah(c) {
		return c * 1.8 + 32;
	}

	function toCel(f) {
		return 1.8 / (f - 32) ;
	}

	// Getting the API's infos using JQuery getJSON method and the global variables declared above:
	function weatherCall(lat, long) {
		latitude = 'lat='+ lat;
		longitude = '&lon=' + long;
		url += latitude + longitude;
		
		$.getJSON(url, function(data) {
			temp = data.main.temp;

			// Creating a switch control flow to control which wallpaper must be shown as background depending on the weather:
			switch (data.weather[0].main) {
			case "Clear":
			$("body").css("background-image", "url(" + wallpapers.clearSky + ")");
			break;
			case "Clouds":
			$("body").css("background-image", "url(" + wallpapers.clouds + ")");
			break;
			case "Few Clouds":
			$("body").css("background-image", "url(" + wallpapers.clouds + ")");		break;
			case "Scattered Clouds":
			$("body").css("background-image", "url(" + wallpapers.clouds + ")");		break;
			case "Broken Clouds":
			$("body").css("background-image", "url(" + wallpapers.clouds + ")");		break;
			case "Rain":
			$("body").css("background-image", "url(" + wallpapers.rain + ")");
			break;
			case "Shower Rain":
			$("body").css("background-image", "url(" + wallpapers.rain + ")");
			break;
			case "Thunderstorm":
			$("body").css("background-image", "url(" +  wallpapers.thunderstorm + ")");
			break;
			case "Snow":
			$("body").css("background-image", "url(" + wallpapers.snow + ")");
			break;
			case "Mist":
			$("body").css("background-image", "url(" + wallpapers.mist + ")");
			break;
			default:
			$("body").css("background-image", "url(www.grizzlymontreal.com/en/wp-content/uploads/SODO_0032.jpg)");
			break;
			}

			// Showing the weather infos with animations using JQuery methods:
			$("#weather-div").fadeIn("5000").css("display", "block");
			$("#location").html('<i class="fas fa-map-marker-alt location-icon"></i>' + data.name + ", " + '<span class="deg-letter">' + data.sys.country + '</span>');
			$("#degree").html(Math.floor(data.main.temp) + "°	 <span class='deg-letter'>C</span>");
			$("#icon").attr("src",data.weather[0].icon);
			$("#weather").html('<span class="discription-color">' + data.weather[0].main + '</span>');
			$("#description").html(data.weather[0].description).css("text-transform", "capitalize");

			// Calling the function to fahrenheit in the click handler of the button and displaying only the related button with animations:
			$("#fah").on("click", function() {
				var tempF = toFah(data.main.temp);
				$("#degree").html(Math.floor(tempF) + "°	 <span class='deg-letter'>F</span>");
        
				$("#fah").fadeOut().css("display", "none");
				$("#cel").fadeIn().css("display", "inline-block");
			});

			// Converting the Fahrenheit to Celsius in the click handler and displaying only the related button with animations:
			$("#cel").on("click", function() {
				var tempC = data.main.temp;
				$("#degree").html(Math.floor(tempC) + "°	 <span class='deg-letter'>C</span>");

				$("#cel").fadeOut().css("display", "none");
				$("#fah").fadeIn().css("display", "inline-block");
			});
		});
	}

	// Asking for permisson to get the user's location:
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;
			weatherCall(latitude, longitude);
		});
	} else {
		alert("Failed to get the location, please refresh the page pressing 'F5' and allow the navigator to get your location");
	}
});