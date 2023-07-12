

// ------ HEADER AND FOOTER ------

function toggleMenu() {
    document
        .getElementsByClassName('navigation')[0]
        .classList.toggle('responsive')
}

const date = new Date();
const copyright = document.querySelector('.copyright span');
const modified = document.querySelector('#last-modified');

copyright.innerHTML = `&copy${date.getFullYear()}`;
modified.innerHTML = `Last Modified: ${document.lastModified}`;

// ------ HOME ------

if (window.location.href.indexOf('index.html') > -1) {
    const temp = document.querySelector('.temp span');
    const condDesc = document.querySelector('.condition-desc span');
    const humidity = document.querySelector('.humidity span');
    const weatherIcon = document.querySelector('#weather-icon')
    // const captionDesc = document.querySelector('figcaption');

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Carlsbad&appid=82b3ab783ff7c95236b8cdc47074b9c8&units=imperial';
    
    const fc1Day = document.querySelector('.fc-1 h3');
    const fc1Span = document.querySelector('.fc-1 span');
    const fc2Day = document.querySelector('.fc-2 h3');
    const fc2Span = document.querySelector('.fc-2 span');
    const fc3Day = document.querySelector('.fc-3 h3');
    const fc3Span = document.querySelector('.fc-3 span');

    const forecasturl = `http://api.openweathermap.org/data/2.5/forecast?lat=33.1581&lon=-117.3506&appid=82b3ab783ff7c95236b8cdc47074b9c8&units=imperial`;

    async function weatherFetch() {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                // console.log(data); // this is for testing the call
                displayWeather(data);
            } else {
              throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function forecastFetch() {
        try {
            const response = await fetch(forecasturl);
            if (response.ok) {
                const data = await response.json();
                // console.log(data); // this is for testing the call
                displayForecast(data);
            } else {
              throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    weatherFetch();
    forecastFetch();

    function displayWeather(data) {
        temp.innerHTML = `${data.main.temp.toFixed(0)}`;
        condDesc.innerHTML = `${data.weather[0].description}`;
        humidity.innerHTML = `${data.main.humidity}`;

        const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        weatherIcon.setAttribute('src', iconsrc);
        weatherIcon.setAttribute('alt', condDesc.innerHTML);
        // captionDesc.textContent = condDesc.innerHTML;
    }

    function displayForecast(data) {
        const day1 = getWeekdayName(data.list[0].dt_txt, 'en-US');
        const day2 = getWeekdayName(data.list[8].dt_txt, 'en-US');
        const day3 = getWeekdayName(data.list[16].dt_txt, 'en-US');

        fc1Day.innerHTML = day1;
        fc2Day.innerHTML = day2;
        fc3Day.innerHTML = day3;

        fc1Span.innerHTML = `${data.list[0].main.temp.toFixed(0)}`;
        fc2Span.innerHTML = `${data.list[8].main.temp.toFixed(0)}`;
        fc3Span.innerHTML = `${data.list[16].main.temp.toFixed(0)}`;
    }

    function getWeekdayName(dateStr, locale) {
        const date = new Date(dateStr);
        return date.toLocaleDateString(locale, { weekday: 'long' });
    }
}