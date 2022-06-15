//dom element variable declarations
var userFormEl = document.querySelector("#user-form");
var cityEl = document.querySelector("#city");
var cityListEl = document.querySelector("#city-list");
var clearListEl = document.querySelector("#clear-list");
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
var fcastHiLo1 =document.querySelector("#hi-lo-1");
var fcastHiLo2 =document.querySelector("#hi-lo-2");
var fcastHiLo3 =document.querySelector("#hi-lo-3");
var fcastHiLo4 =document.querySelector("#hi-lo-4");
var fcastHiLo5 =document.querySelector("#hi-lo-5");
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
var fcastIcon1 = document.querySelector("#icon-1");
var fcastIcon2 = document.querySelector("#icon-2");
var fcastIcon3 = document.querySelector("#icon-3");
var fcastIcon4 = document.querySelector("#icon-4");
var fcastIcon5 = document.querySelector("#icon-5");
var citySearchResultsEl = document.querySelector("#city-search-results")

//array declarations
var locationsArr = [];
var citiesArr = [];
var forecastTempsArr = [];
var forecastHiLosArr = [];
var forecastWindsArr = [];
var forecastHumiditiesArr = [];
var forecastIconsArr = [];
var forecastIconAlts = [];
var fcastListsArr = [forecast1, forecast2, forecast3, forecast4, forecast5];
var fcastTempsArr = [fcastTemp1, fcastTemp2, fcastTemp3, fcastTemp4, fcastTemp5];
var fcastHiLosArr = [fcastHiLo1, fcastHiLo2, fcastHiLo3, fcastHiLo4, fcastHiLo5]
var fcastWindsArr = [fcastWind1, fcastWind2, fcastWind3, fcastWind4, fcastWind5];
var fcastHumiditiesArr = [fcastHumidity1, fcastHumidity2, fcastHumidity3, fcastHumidity4, fcastHumidity5];
var fcastDatesArr = [fcastDay1, fcastDay2, fcastDay3, fcastDay4, fcastDay5];
var fcastHeadersArr = [fcastHeader1, fcastHeader2, fcastHeader3, fcastHeader4, fcastHeader5];
var fcastIconsArr = [fcastIcon1, fcastIcon2, fcastIcon3, fcastIcon4, fcastIcon5];





//function that handles what happens on form submit
var formSubmitHandler = function(event) {
    //prevent default form reset behavior
    event.preventDefault();
    //get value from input element
    var city = cityEl.value.trim();
    if (city) {
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
}





//function that creates button for the city search results
var cityResultBtns = function(city, lat, lon, id) {
    //create list-items for each city
    var resultsListItem = document.createElement("li");
    //provide the city input as the textContent of the new list-item
    resultsListItem.textContent = city;
    //add bootstrap classes to list-item
    resultsListItem.classList.add("btn", "btn-secondary", "w-100", "my-3","py-2");
    //add unique ID to each list item
    resultsListItem.setAttribute("id", id);
    //capture latitude and longitude
    resultsListItem.setAttribute("data-lat", lat);
    resultsListItem.setAttribute("data-lon", lon)
    //append list-item button to ul #city-list
    citySearchResultsEl.appendChild(resultsListItem);
}




//function to remove searched cities list buttons
var removeButton = function() {
        $(cityListEl).children().first().remove();
};





//function to remove search result buttons
var removeRsltBtns = function() {
    $(citySearchResultsEl).children().remove();
}





//function that saves city names to local storage
var citySaves = function(city) {
    if (citiesArr.length === 5) {
        removeButton()
        citiesArr.splice(0, 1,)
        citiesArr.push(city);
        localStorage.setItem("cities:", JSON.stringify(citiesArr));
    } else if (citiesArr.length <= 4) {
        citiesArr.push(city)
        localStorage.setItem("cities:", JSON.stringify(citiesArr));
    }
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
        };
    };   
};





//function that fetches the queried coordinates from openweather geocoding api for the initial search results
var getCoordinates = function(city) {
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=3&appid=6bb1b7f8b26934ef2b1028b12a559a0f";

    fetch(apiUrl).then(function(response) {
        //request was succesful
        if (response.ok) {
            response.json().then(function(data) {
                //loop through data to get desired objects from the results
                for (var i = 0; i < data.length; i++) {
                    var uniqueId = "item-" + i;
                    var latResults = data[i].lat;
                    var lonResults = data[i].lon;
                    var nameResults = data[i].name;
                    var stateResults = data[i].state;
                    if (stateResults === undefined) {
                        stateResults = "";
                    }
                    var countryResults = data[i].country;
                    //pass results to function that creates result display buttons
                    cityResultBtns(nameResults + ", " + stateResults + "\xa0 " + countryResults, latResults, lonResults, uniqueId)
                };
            });
        } else {
            console.log("There was an error with the response");
        }
    }).catch(function(error) {
        console.log("Cannot compute!");
    });
};





//function that gets coordinates from openweather geocoding api for the saved city buttons
var getBtnCoordinates = function(city) {
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=3&appid=6bb1b7f8b26934ef2b1028b12a559a0f";

    fetch(apiUrl).then(function(response) {
        //request was succesful
        if (response.ok) {
            response.json().then(function(data) {
                //capture lat and lon
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
}





//function that takes the lat and long from getCoordinates() and fetches weather data from openWeather
var getCurrentWeather = function(lat, lon, city) {
    var apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=6bb1b7f8b26934ef2b1028b12a559a0f";
    

    fetch(apiUrl).then(function(response) {
        //request was succesful
        if (response.ok) {
            response.json().then(function(data) {
                //assign values to variables from fetch object data
                var currentIcon = data.current.weather[0].icon
                var currentIconAlt = data.current.weather[0].main
                var currentTemp = data.current.temp
                var currentHigh = data.daily[0].temp.max
                var currentLow = data.daily[0].temp.min
                var currentHumidity = data.current.humidity
                var currentWindSpeed = data.current.wind_speed
                var currentUvi = data.current.uvi
                //clear arrays
                while(forecastIconsArr.length > 0) {
                    forecastIconsArr.pop();
                }
                while(forecastIconAlts.length > 0) {
                    forecastIconAlts.pop();
                }
                while(forecastTempsArr.length > 0) {
                    forecastTempsArr.pop();
                }
                while(forecastHiLosArr.length > 0) {
                    forecastHiLosArr.pop();
                }
                while(forecastWindsArr.length > 0) {
                    forecastWindsArr.pop();
                }
                while(forecastHumiditiesArr.length > 0) {
                    forecastHumiditiesArr.pop();
                }
                //loop though forecast data
                for (var i = 1; i < 6; i++) {
                    forecastIconsArr.push(data.daily[i].weather[0].icon);
                    forecastIconAlts.push(data.daily[i].weather[0].main)
                    forecastTempsArr.push(data.daily[i].temp.day);
                    forecastHiLosArr.push(data.daily[i].temp.max + "/" + data.daily[i].temp.min)
                    forecastWindsArr.push(data.daily[i].wind_speed);
                    forecastHumiditiesArr.push(data.daily[i].humidity)
                }
                //call next functions
                displayCurrentWeather(city, currentIcon, currentIconAlt, currentTemp, currentHigh, currentLow, currentHumidity, currentWindSpeed, currentUvi)
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





//function that displays the current weather data dynamically to the page
var displayCurrentWeather = function(city, icon, iconAlt, temp, high, low, humidity, windSpeed, uvi) {
    //assigns text content of current weather data
    currentCityEl.textContent = city.toUpperCase();
    currentIconEl.innerHTML = "<img src='https://openweathermap.org/img/wn/" + icon + ".png' alt='" + iconAlt + "'/> ";
    currentTempEl.textContent = "Temp: " + temp + " F° \xa0 \xa0 \xa0 \xa0 High: " + high + " F° \xa0 \xa0 \xa0 \xa0 Low: " + low + " F°";
    currentHumidityEl.textContent = "Humidity: " + humidity + "%";
    currentWindSpeedEl.textContent = "Wind Speed: " + windSpeed + " MPH";
    currentUviEl.textContent = "UV Index: " + uvi;
    //appends current weather data to the page
    currentCondEl.appendChild(currentCityEl);
    currentCondEl.appendChild(currentDateEl);
    currentCondEl.appendChild(currentIconEl);
    currentCondEl.appendChild(currentTempEl);
    currentCondEl.appendChild(currentHumidityEl);
    currentCondEl.appendChild(currentWindSpeedEl);
    currentCondEl.appendChild(currentUviEl);
    //conditional that sets background color based on uv index: favorbale, moderate, or severe.
    if (uvi <= 2) {
        $(currentUviEl).removeClass("moderate");
        $(currentUviEl).removeClass("severe");
        $(currentUviEl).addClass("favorable");
    } else if (uvi > 2 && uvi <=5) {
        $(currentUviEl).removeClass("favorable");
        $(currentUviEl).removeClass("severe");
        $(currentUviEl).addClass("moderate");
    } else {
        $(currentUviEl).removeClass("moderate");
        $(currentUviEl).removeClass("favorable");
        $(currentUviEl).addClass("severe");
    };
};





//gets the forecast dates and appends them to the page
for (var i = 0; i < 5; i++) {
    var date = moment().add(i, "days");
    fcastDatesArr[i].textContent = date.format("ddd - MMMM Do");
};





//function that displays the forecast data
var forecastData = function() {
    for (var i = 0; i < 5; i++) {
        fcastIconsArr[i].innerHTML = "<img src='https://openweathermap.org/img/wn/" + forecastIconsArr[i] + ".png' alt='" + forecastIconAlts[i] + "'/> "
        fcastTempsArr[i].textContent = "Temp: " + forecastTempsArr[i] + " F°";
        fcastHiLosArr[i].textContent = "Hi/Lo: " + forecastHiLosArr[i] + " F°";
        fcastWindsArr[i].textContent = "Wind-Speed: " + forecastWindsArr[i] + " mph";
        fcastHumiditiesArr[i].textContent = "Humidity: " + forecastHumiditiesArr[i] + "%";

        fcastHeadersArr[i].appendChild(fcastDatesArr[i])
        fcastListsArr[i].appendChild(fcastIconsArr[i]);
        fcastListsArr[i].appendChild(fcastTempsArr[i]);
        fcastListsArr[i].appendChild(fcastHiLosArr[i]);
        fcastListsArr[i].appendChild(fcastWindsArr[i]);
        fcastListsArr[i].appendChild(fcastHumiditiesArr[i]);  
    };
};





//function that listen for clicks on dynamic button elements and runs getCoordinates() based on it's text
$("#city-list").on("click", "li", function() {
    var city = $(this).text();
    getBtnCoordinates(city);
})





//function that removes all city names from list
clearListEl.addEventListener("click", function() {
    while (citiesArr.length > 0) {
        removeButton();
        citiesArr.pop();
    }
    localStorage.setItem("cities:", JSON.stringify(citiesArr));
    cityListEl.classList.remove("border", "border-2", "border-dark", "rounded", "bg-light");
})





//calls cityLoad() on page load/refresh
cityLoad();
//form event listener on submit
userFormEl.addEventListener("submit", formSubmitHandler)
//event listener on search results click
citySearchResultsEl.addEventListener("click", function(event) {
    searchTarget = event.target
    //capture inner text of clicked buttons
    var city = searchTarget.innerText;

    //function that assigns what happens depending on which search result button was clicked
    var ifClicked = function() {
        //captures lat and lon from data-attributes passed in dynmaic HTML
        var lat = searchTarget.getAttribute("data-lat");
        var lon = searchTarget.getAttribute("data-lon");
        //calls function that removes search result buttons
        removeRsltBtns();
        //calls function that gets the current weather based off lat, lon and city name
        getCurrentWeather(lat, lon, city)
        //saves city to localStorage
        citySaves(city);
        //creates buttons to display which cities were selected from search results
        createButton(city);
    }
    //conditional that  assigns current weather conditions depending on which search result button was clicked. 
    if (searchTarget.id === "item-0") {
        ifClicked();
    } else if (searchTarget.id === "item-1") {
        ifClicked();
    } else {
        ifClicked();
    };
});