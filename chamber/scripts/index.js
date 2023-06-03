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
if (localStorage.lastVisit == undefined) {
    localStorage.lastVisit = new Date();
    daysSinceVisitElement.innerHTML = "This is your first time visiting this webpage!"
} else {
    daysSinceVisitElement.innerHTML = `It has been ${getDaysSinceLastVisit()} days since you last visited this webpage.`
}

// console.log(currentVisit.getTime() - new Date(localStorage.lastVisit).getTime());