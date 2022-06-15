# weather-request-permitting
A server-side API based weather dashboard that runs in the browser

<p>Upon page load you are presented with a blank weather dashboard.  Upon entering a city in the search bar you are presented with three search result options that match your query.  Upon selecting the desired search result from the list, the city is appended to a new list of search history buttons, and is also saved to localStorage. They can be clicked at any time to re-retrieve that cities weather.  The current weather data for the selected city is displayed in the current weather data section.  The temperature highs and lows were added to the results as well. The UV index in the current weather section is color coded to represent favorable, moderate, and severe.</p>  

<p>The 5-day forecast also appears when a city is selected.  The list of selected cities will only go to 5 cities and then as more names are added, the top most name will be removed from the dislay, and the new one will be added to the bottom.  There is also a 'Clear List' button at the bottom of the search section that will clear all cities from the saved search list as well as localStorage.</p>

![My Weather Dashboard](./assets/images/weather-dashboard.png)

## Made With:

* HTML

* CSS

* Bootstrap

* JQuery

* Moment()

* OpenWeather API

## Webiste Url:

* https://bdunham484.github.io/weather-request-permitting/

* Made with ❤️ by Brad Dunham
