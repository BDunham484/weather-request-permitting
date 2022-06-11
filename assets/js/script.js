var userFormEl = document.querySelector("#user-form");
var cityEl = document.querySelector("#city");
var cityListEl = document.querySelector("#city-list");
var currentCondEl = document.querySelector("#current-conditions");
var currentCityEl = document.querySelector("#current-city");
var currentDateEl = document.querySelector("#current-date");
var currentIconEl = document.querySelector("#current-icon");
var currentTempEl = document.querySelector("#current-temp");
var currentHumidityEl = document.querySelector("#current-humidity");
var currentWindSpeedEl = document.querySelector("#current-wind-speed");
var currentUviEl = document.querySelector("#current-uvi");


var citiesArr = [];



//function that handles what happens on form submit
var formSubmitHandler = function(event) {
    //prevent default form reset behavior
    event.preventDefault();
    //get value from input element
    var city = cityEl.value.trim();
    if (city) {
        //call createButton() function 
        createButton(city);
        //call citySaves() function
        citySaves(city);
        console.log("The selected city is " + city)
        getCoordinates(city);
        cityEl.value = "";
    } else {
        alert("Please enter a city")
    }

}





//function that creates buttons used in cityListHandler and cityLoad
var createButton = function(city) {
     //create list-items for each city
     var cityListItemEl = document.createElement("li");
     //provide the city input as the textContent of the new list-item
     cityListItemEl.textContent = city;
     //add bootstrap classes to list-item
     cityListItemEl.classList.add("btn", "btn-secondary", "w-100", "my-3","py-2");
     //append list-item button to ul #city-list
     cityListEl.appendChild(cityListItemEl);
     //add bootstrap classes to ul #city-list
     cityListEl.classList.add("border", "border-2", "border-dark", "rounded", "bg-light");
     //calls function that saves cities to local storage
}





//function that saves city names to local storage
var citySaves = function(city) {
    citiesArr.push(city);
    localStorage.setItem("cities:", JSON.stringify(citiesArr));
}





//function that loads cities saved to localStorage and populates button list
var cityLoad = function() {
    //conditional that determines whether localStorage is empty or not
    if (localStorage.getItem("cities:") === null) {
        console.log("localStorage is empty")
    } else {
        var parsedCitiesArr = JSON.parse(localStorage.getItem("cities:")); 
        //loops through the array in localstorage and 
        for (var i = 0; i < parsedCitiesArr.length; i++) {
            var city = parsedCitiesArr[i];
            //push localstorage to citiesArr on page load
            citiesArr.push(city);
            //call create button function and pass city as an argument
            createButton(city);
        }
    }   
};





//function that fetches the coordinates by location name api
var getCoordinates = function(city) {
    console.log(city)
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=6bb1b7f8b26934ef2b1028b12a559a0f";

    fetch(apiUrl).then(function(response) {
        //request was succesful
        if (response.ok) {
            response.json().then(function(data) {
                console.log("latitude=" + data[0].lat)
                console.log("longitude=" + data[0].lon)
                //capture the latitude and longitude of the entered city
                var cityLat = data[0].lat;
                var cityLon = data[0].lon;
                //call getWeather() using captured coordinates
                getCurrentWeather(cityLat, cityLon, city);
            });
        } else {
            console.log("There was an error with the response");
        }
    }).catch(function(error) {
        console.log("Cannot compute!");
    });
};





//function that takes the lat and long from getCoordinates() and fetch weather data from openWeather
var getCurrentWeather = function(lat, lon, city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,daily,alerts&units=imperial&appid=6bb1b7f8b26934ef2b1028b12a559a0f";
    
    fetch(apiUrl).then(function(response) {
        //request was succesful
        if (response.ok) {
            response.json().then(function(data) {
                console.log(city);
                console.log(data);
                var currentTemp = data.current.temp
                var currentHumidity = data.current.humidity
                var currentWindSpeed = data.current.wind_speed
                var currentUvi = data.current.uvi
                displayCurrentWeather(city, currentTemp, currentHumidity, currentWindSpeed, currentUvi)
            });
        } else {
            console.log("Error: Shit aint working");
        };
    }).catch(function(error) {
        console.log("Does Not Compute!");
    });
};





//function that display the current weather data dynamically to the page
var displayCurrentWeather = function(city, temp, humidity, windSpeed, uvi) {
    currentCityEl.textContent = city.toUpperCase();
    currentDateEl.textContent = "6/11/2022";
    currentIconEl.textContent = "icon";
    currentTempEl.textContent = "Temp: " + temp + " Deg.";
    currentHumidityEl.textContent = "Humidity: " + humidity + "%";
    currentWindSpeedEl.textContent = "Wind Speed: " + windSpeed + " MPH";
    currentUviEl.textContent = "UV Index: " + uvi;



    currentCondEl.appendChild(currentCityEl);
    currentCondEl.appendChild(currentDateEl);
    currentCondEl.appendChild(currentIconEl);
    currentCondEl.appendChild(currentTempEl);
    currentCondEl.appendChild(currentHumidityEl);
    currentCondEl.appendChild(currentWindSpeedEl);
    currentCondEl.appendChild(currentUviEl);
}




// displayCurrentWeather("AUSTIN", "100", "40", "20", "10")
//calls cityLoad() on page load/refresh
cityLoad();
//form event listener on submit
userFormEl.addEventListener("submit", formSubmitHandler)