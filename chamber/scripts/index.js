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
