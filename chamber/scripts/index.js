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
    async function getListingsData() {
        const response = await fetch('./json/data.json');
        const data = await response.json();
        // console.table(data.listings);
        displayListings(data.listings);
    }
    
    getListingsData();

    const displayListings = (listings) => {
        const cards = document.querySelector('div.listingcards');

        listings.forEach((listing) => {
            let card = document.createElement('section');
            let image = document.createElement('img');
            let name = document.createElement('h2');
            let address = document.createElement('p');
            let phone = document.createElement('p');
            let website = document.createElement('p');
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
            membership.textContent = listing.membership;

            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(address);
            card.appendChild(phone);
            card.appendChild(website);
            card.appendChild(membership);

            cards.appendChild(card);
        });
    };
}; 
