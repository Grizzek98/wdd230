function toggleMenu() {
    document
        .getElementsByClassName('navigation')[0]
        .classList.toggle('responsive')
}

const date = new Date();
let copyrightYear = date.getFullYear();

const fulldateUK = new Intl.DateTimeFormat("en-UK", {
	dateStyle: "full"
}).format(date);

const copyrightYearTemplate = `&copy${copyrightYear} Lidekonia Chamber`;
const lastModified = `Last Modification: ${document.lastModified}`;

document.querySelector("#date").innerHTML = `${fulldateUK}`;
document.querySelector("#copyright").innerHTML = copyrightYearTemplate;
document.querySelector("#last-modified").innerHTML = lastModified;

// console.log(date.getDay());

const currentDay = date.getDay();

if (currentDay == 1 || currentDay == 2) {
    document.querySelector('.banner').style.display = "block";
    console.log("hello world")
}

// ------- HOME PAGE --------

if (window.location.href.indexOf('') > -1) {
    const currentTemp = document.querySelector('.temp span');
    const currentWind = document.querySelector('.windspeed span');
    const weatherIcon = document.querySelector('#weather-icon');
    const captionDesc = document.querySelector('figcaption');
    const tempNum = Number(currentTemp)
    const windSpeedNum = Number(currentWind)
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Carraroe&appid=82b3ab783ff7c95236b8cdc47074b9c8&units=imperial';

    const spot1name = document.querySelector('.spotlight-1 h4');
    const spot1img = document.querySelector('.spotlight-1 img');
    const spot1quote = document.querySelector('.spotlight-1 .spot-quote');
    const spot1address = document.querySelector('.spotlight-1 .spot-email');
    const spot1contact = document.querySelector('.spotlight-1 .spot-contact');
    const spot2name = document.querySelector('.spotlight-2 h4');
    const spot2img = document.querySelector('.spotlight-2 img');
    const spot2quote = document.querySelector('.spotlight-2 .spot-quote');
    const spot2address = document.querySelector('.spotlight-2 .spot-email');
    const spot2contact = document.querySelector('.spotlight-2 .spot-contact');
    const spot3name = document.querySelector('.spotlight-3 h4');
    const spot3img = document.querySelector('.spotlight-3 img');
    const spot3quote = document.querySelector('.spotlight-3 .spot-quote');
    const spot3address = document.querySelector('.spotlight-3 .spot-email');
    const spot3contact = document.querySelector('.spotlight-3 .spot-contact');

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

    async function spotlightFetch() {
        try {
            const response = await fetch('./json/data.json');
            if (response.ok) {
                const data = await response.json();
                // console.log(data.listings);
                displaySpotlight(data.listings);
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    weatherFetch();
    spotlightFetch();

    function displayWeather(weatherData) {
        currentTemp.innerHTML = `${weatherData.main.temp.toFixed(0)}`;
        currentWind.innerHTML = `${weatherData.wind.speed.toFixed(1)}`;

        const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
        const desc = weatherData.weather[0].description;

        weatherIcon.setAttribute('src', iconsrc);
        weatherIcon.setAttribute('alt', desc);
        captionDesc.textContent = desc;

        if (tempNum <= 50 && windSpeedNum > 3) {
            document.querySelector(".windchill span").innerHTML = (35.74 + (0.6215 * tempNum) - (35.75 * (windSpeedNum ** 0.16)) + (0.4275 * tempNum * (windSpeedNum ** 0.16))).toFixed(1) + " &degF"
        }
        else {
            document.querySelector(".windchill span").innerHTML = "N/A"
        }    
    }

    function displaySpotlight(listings) {
        let membershipList = [];

        listings.forEach(business => {
            if (business.membership == "Gold Membership" || business.membership == "Silver Membership") {
                membershipList.push(business);
            }
        });

        // membershipList.forEach(business => {})
        console.log(membershipList);
        
        const spot1 = Math.floor(Math.random()*membershipList.length);
        spot1name.innerHTML = membershipList[spot1].name;
        spot1img.setAttribute('src', membershipList[spot1].image);
        spot1quote.innerHTML = membershipList[spot1].quote;
        spot1address.innerHTML = membershipList[spot1].address;
        spot1contact.innerHTML = `${membershipList[spot1].phone}  ${membershipList[spot1].website}`;
        membershipList.splice(spot1, spot1);
        console.log(spot1)
        console.log(membershipList);
        
        const spot2 = Math.floor(Math.random()*membershipList.length);
        spot2name.innerHTML = membershipList[spot2].name;
        spot2img.setAttribute('src', membershipList[spot2].image);
        spot2quote.innerHTML = membershipList[spot2].quote;
        spot2address.innerHTML = membershipList[spot2].address;
        spot2contact.innerHTML = `${membershipList[spot2].phone}  ${membershipList[spot2].website}`;
        membershipList.splice(spot2, spot2);
        console.log(spot2)
        console.log(membershipList);
        
        const spot3 = Math.floor(Math.random()*membershipList.length);
        spot3name.innerHTML = membershipList[spot3].name;
        spot3img.setAttribute('src', membershipList[spot3].image);
        spot3quote.innerHTML = membershipList[spot3].quote;
        spot3address.innerHTML = membershipList[spot3].address;
        spot3contact.innerHTML = `${membershipList[spot3].phone}  ${membershipList[spot3].website}`;
        membershipList.splice(spot3, spot3);
        console.log(spot3)
        console.log(membershipList);
        }

}
    
// ------- DISCOVER PAGE ---------

if (window.location.href.indexOf('discover.html') > -1) {

    const images = document.querySelectorAll("[data-src]");
    
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
    
    const imgOptions = {};
    
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
    
    
    const currentFull = new Date();
    const currentVisit = new Date(`${currentFull.getUTCMonth()}/${currentFull.getUTCDate()}/${currentFull.getUTCFullYear()}`);
    localStorage.lastVisit = localStorage.currentVisit;
    localStorage.currentVisit = currentVisit;
    
    function getDaysSinceLastVisit() {
        return currentVisit.getTime() - new Date(localStorage.lastVisit).getTime()
    }
    
    const daysSinceVisitElement = document.querySelector(".demographics p span")
    if (isNaN(localStorage.lastVisit)) {
        localStorage.lastVisit = new Date();
        daysSinceVisitElement.innerHTML = "This is your first time visiting this webpage!"
    } else {
        daysSinceVisitElement.innerHTML = `It has been ${getDaysSinceLastVisit()} days since you last visited this webpage.`
    }
};

// ----------- JOIN PAGE -------------

if (window.location.href.indexOf('join.html') > -1) {
    const currentTimeElement = document.querySelector("#time");
    currentTimeElement.value = Date.now();
};

// ----------- DIRECTORY PAGE -------------

if (window.location.href.indexOf('directory.html') > -1) {
    const cardBtn = document.querySelector('#cardBtn');
    const listBtn = document.querySelector('#listBtn');

    cardBtn.addEventListener('click', function() {
        document.querySelector('.table').style.display = "none";
        document.querySelector('.listingcards').style.display = "grid";
    })
    listBtn.addEventListener('click', function() {
        document.querySelector('.table').style.display = "grid";
        document.querySelector('.listingcards').style.display = "none";
    })

    async function getListingsData() {
        const response = await fetch('./json/data.json');
        const data = await response.json();
        console.log(data.listings);
        generateCards(data.listings);
        generateTable(data.listings);
        // displayListings(data.listings);
    }
    
    getListingsData();

    const generateCards = (listings) => {
        const cards = document.querySelector('div.listingcards');

        listings.forEach((listing) => {
            let card = document.createElement('section');
            let image = document.createElement('img');
            let name = document.createElement('h2');
            let address = document.createElement('p');
            let phone = document.createElement('p');
            let website = document.createElement('a');
            let membership = document.createElement('p');

            image.setAttribute('src', listing.image);
            image.setAttribute('alt', `Image for ${listing.name}`);
            image.setAttribute('loading', 'lazy');
            image.setAttribute('width', '340');
            image.setAttribute('height', '440');

            name.textContent = listing.name;
            address.textContent = listing.address;
            phone.textContent = listing.phone;
            website.textContent = listing.website;
            website.href = listing.website;
            membership.textContent = listing.membership;

            card.className = 'card';
            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(address);
            card.appendChild(phone);
            card.appendChild(website);
            card.appendChild(membership);

            cards.appendChild(card);
        });
    };

    const generateTable = (listings) => {
        const table = document.querySelector('tbody')

        listings.forEach((listing) => {
            let tr = document.createElement('tr');
            let name = document.createElement('p');
            let address = document.createElement('p');
            let phone = document.createElement('p');
            let website = document.createElement('a');
            let membership = document.createElement('p');

            name.textContent = listing.name;
            address.textContent = listing.address;
            phone.textContent = listing.phone;
            website.textContent = listing.website;
            website.href = listing.website;
            membership.textContent = listing.membership;

            tr.className = 'tableRow';
            tr.appendChild(document.createElement('td')).appendChild(name);
            tr.appendChild(document.createElement('td')).appendChild(address);
            tr.appendChild(document.createElement('td')).appendChild(phone);
            tr.appendChild(document.createElement('td')).appendChild(website);
            tr.appendChild(document.createElement('td')).appendChild(membership);

            table.appendChild(tr);
        });
    };

    
}; 
