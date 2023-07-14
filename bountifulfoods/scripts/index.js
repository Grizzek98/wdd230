

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

// ------ LAZY LOADING ------

const images = document.querySelectorAll('[data-src]');
const imgOptions = {};

function preloadImage(img) {
    const src = img.getAttribute("data-src");
    if(!src) {
        return;
    }
    img.src = src;
    img.onload = () => {
        img.removeAttribute("data-src");
    };
}

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            preloadImage(entry.target);
            imgObserver.unobserve(entry.target);
        }
    })
}, imgOptions);

images.forEach(image => {
    imgObserver.observe(image);
});
console.log(window.location.href)


// ------ HOME ------

if (window.location.href.indexOf('https://grizzek98.github.io/wdd230/bountifulfoods/') > -1 || window.location.href.indexOf('https://grizzek98.github.io/wdd230/bountifulfoods/index.html') > -1) {
    const temp = document.querySelector('.temp span');
    const condDesc = document.querySelector('.condition-desc span');
    const humidity = document.querySelector('.humidity span');
    const weatherIcon = document.querySelector('#weather-icon')

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Carlsbad&appid=82b3ab783ff7c95236b8cdc47074b9c8&units=imperial';
    
    const fc1Day = document.querySelector('.fc-1 h3');
    const fc1Span = document.querySelector('.fc-1 span');
    const fc2Day = document.querySelector('.fc-2 h3');
    const fc2Span = document.querySelector('.fc-2 span');
    const fc3Day = document.querySelector('.fc-3 h3');
    const fc3Span = document.querySelector('.fc-3 span');

    const forecasturl = `https://api.openweathermap.org/data/2.5/forecast?lat=33.1581&lon=-117.3506&appid=82b3ab783ff7c95236b8cdc47074b9c8&units=imperial`;

    const drinksMade = document.querySelector('.fresh-ordered h3 span');

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

    if (localStorage.getItem('drinksMade') != null) {
        drinksMade.innerHTML = `You've mixed ${localStorage.getItem('drinksMade')} specialty drinks. Way to go!`;
    }
    // console.log(localStorage.getItem('drinksMade'));
}

// ------ FRESH ------

if (window.location.href.indexOf('fresh.html') > -1) {

    let selects = document.querySelectorAll('select');

    const url = `https://brotherblazzard.github.io/canvas-content/fruit.json`;
    let jsonData = null

    async function freshFetch() {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                // console.log(data); // this is for testing the call
                populateSelects(data);
                jsonData = data;
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    freshFetch();
    
    function populateSelects(data) {
        selects.forEach(select => {
            data.forEach(flavor => {
                select.innerHTML = select.innerHTML + `<option value="${flavor.name}">${flavor.name}</option>`;
                // console.log(flavor.name);
            });
        });
    }
    
    document.querySelector('.submitBtn').addEventListener("click", function() {
        document.querySelector('#fname-con').innerHTML = `First Name: ${document.querySelector('[name="fname"').value}`;
        document.querySelector('#email-con').innerHTML = `Email: ${document.querySelector('[name="email"').value}`;
        document.querySelector('#phone-con').innerHTML = `Phone: ${document.querySelector('[name="phone"').value}`;
        document.querySelector('#time-con').innerHTML = `Order Date: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
        document.querySelector('#instr-con').innerHTML = `Special Instructions: ${document.querySelector('[name="spec-instr"').value}`;

        let totalCarbs = 0;
        let totalProtein = 0;
        let totalFat = 0;
        let totalSugar = 0;
        let totalCals = 0;
        
        selects.forEach(select => {
            const index = jsonData.findIndex(std=> std.name === select.value);
            totalCarbs += jsonData[index].nutritions.carbohydrates;
            totalProtein += jsonData[index].nutritions.protein;
            totalFat += jsonData[index].nutritions.fat;
            totalSugar += jsonData[index].nutritions.sugar;
            totalCals += jsonData[index].nutritions.calories;
            
        })
        document.querySelector('#carbs').innerHTML = `Carbohydrates: ${totalCarbs.toFixed(1)}`;
        document.querySelector('#protein').innerHTML = `Protein: ${totalProtein.toFixed(1)}`;
        document.querySelector('#fat').innerHTML = `Fat: ${totalFat.toFixed(1)}`;
        document.querySelector('#sugar').innerHTML = `Sugar: ${totalSugar.toFixed(1)}`;
        document.querySelector('#cals').innerHTML = `Calories: ${totalCals.toFixed(1)}`;

        document.querySelector('.form-result').style.display = 'grid';

        let drinksMade = 0;
        if (localStorage.getItem('drinksMade') != null) {
            localStorage.setItem('drinksMade', +localStorage.getItem('drinksMade') + 1)
        } else {
            localStorage.setItem('drinksMade', '1');
        }
        // console.log(localStorage.getItem('drinksMade'));
    });
}
