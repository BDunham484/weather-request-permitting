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
var fcastTemp1 = document.querySelector("#temp-1");
var fcastTemp2 = document.querySelector("#temp-2");
var fcastTemp3 = document.querySelector("#temp-3");
var fcastTemp4 = document.querySelector("#temp-4");
var fcastTemp5 = document.querySelector("#temp-5");
var fcastWind1 = document.querySelector("#wind-1");
var fcastWind2 = document.querySelector("#wind-2");
var fcastWind3 = document.querySelector("#wind-3");
var fcastWind4 = document.querySelector("#wind-4");
var fcastWind5 = document.querySelector("#wind-5");
var fcastHumidity1 = document.querySelector("#humidity-1");
var fcastHumidity2 = document.querySelector("#humidity-2");
var fcastHumidity3 = document.querySelector("#humidity-3");
var fcastHumidity4 = document.querySelector("#humidity-4");
var fcastHumidity5 = document.querySelector("#humidity-5");
var forecast1 = document.querySelector("#forecast-1");
var forecast2 = document.querySelector("#forecast-2");
var forecast3 = document.querySelector("#forecast-3");
var forecast4 = document.querySelector("#forecast-4");
var forecast5 = document.querySelector("#forecast-5");
var fcastDay1 =document.querySelector("#day-1");
var fcastDay2 =document.querySelector("#day-2");
var fcastDay3 =document.querySelector("#day-3");
var fcastDay4 =document.querySelector("#day-4");
var fcastDay5 =document.querySelector("#day-5");
var fcastHeader1 = document.querySelector("#f-one");
var fcastHeader2 = document.querySelector("#f-two");
var fcastHeader3 = document.querySelector("#f-three");
var fcastHeader4 = document.querySelector("#f-four");
var fcastHeader5 = document.querySelector("#f-five");



var citiesArr = [];
var forecastTemps = [];
var forecastWinds = [];
var forecastHumidities = [];
var fcastLists = [forecast1, forecast2, forecast3, forecast4, forecast5];
var fcastTemps = [fcastTemp1, fcastTemp2, fcastTemp3, fcastTemp4, fcastTemp5];
var fcastWinds = [fcastWind1, fcastWind2, fcastWind3, fcastWind4, fcastWind5];
var fcastHumidities = [fcastHumidity1, fcastHumidity2, fcastHumidity3, fcastHumidity4, fcastHumidity5];
var fcastDates = [fcastDay1, fcastDay2, fcastDay3, fcastDay4, fcastDay5]
var fcastHeaders = [fcastHeader1, fcastHeader2, fcastHeader3, fcastHeader4, fcastHeader5]



//function that handles what happens on form submit
var formSubmitHandler = function(event) {
    //prevent default form reset behavior
    event.preventDefault();
    //get value from input element
    var city = cityEl.value.trim();
    if (city) {
        //call createButton()
        createButton(city);
        //call citySaves()
        citySaves(city);
        //call getCoordinates()
        getCoordinates(city);
        cityEl.value = "";
    } else {
        alert("Please enter a city")
    };
};





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
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=6bb1b7f8b26934ef2b1028b12a559a0f";

    fetch(apiUrl).then(function(response) {
        //request was succesful
        if (response.ok) {
            response.json().then(function(data) {
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
    var apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=6bb1b7f8b26934ef2b1028b12a559a0f";
    

    fetch(apiUrl).then(function(response) {
        //request was succesful
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data)
                //assign values to variables from fetch object data
                var currentTemp = data.current.temp
                var currentHumidity = data.current.humidity
                var currentWindSpeed = data.current.wind_speed
                var currentUvi = data.current.uvi
                //clear arrays
                while(forecastTemps.length > 0) {
                    forecastTemps.pop();
                }
                while(forecastWinds.length > 0) {
                    forecastWinds.pop();
                }
                while(forecastHumidities.length > 0) {
                    forecastHumidities.pop();
                }
                //loop though forecast data
                for (var i = 0; i <= 5; i++) {
                    forecastTemps.push(data.daily[i].temp.day);
                    forecastWinds.push(data.daily[i].wind_speed);
                    forecastHumidities.push(data.daily[i].humidity)
                }
                //call next functions
                displayCurrentWeather(city, currentTemp, currentHumidity, currentWindSpeed, currentUvi)
                forecastData();
            });
        } else {
            console.log("Error: Shit aint working");
        };
    }).catch(function(error) {
        console.log("Does Not Compute!");
    });
};






//function that gets the current date
var currentDate = function() {
    date = moment(new Date())
    $("#current-date").text(date.format('dddd, MMMM Do YYYY'));
};

$(document).ready(function(){
    currentDate();
    setInterval(currentDate, (1000 * 60) * 5);
});


//function that display the current weather data dynamically to the page
var displayCurrentWeather = function(city, temp, humidity, windSpeed, uvi) {
    currentCityEl.textContent = city.toUpperCase();
    // currentDateEl.textContent = "6/11/2022";
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





//function that displays the forecast data
var forecastData = function() {
    for (var i = 0; i < 5; i++) {
        var date = moment().add(i, "days");
        fcastDates[i].textContent = date.format("MMMM Do")
        fcastTemps[i].textContent = "Temp: " + forecastTemps[i];
        fcastWinds[i].textContent = "Wind-Speed: " + forecastWinds[i] + " mph";
        fcastHumidities[i].textContent = "Humidity: " + forecastHumidities[i] + "%";

        fcastHeaders[i].appendChild(fcastDates[i])
        fcastLists[i].appendChild(fcastTemps[i]);
        fcastLists[i].appendChild(fcastWinds[i]);
        fcastLists[i].appendChild(fcastHumidities[i]);  
    };
};






//calls cityLoad() on page load/refresh
cityLoad();
//form event listener on submit
userFormEl.addEventListener("submit", formSubmitHandler)