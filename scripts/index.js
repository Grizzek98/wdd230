const d = new Date();
let copyrightYear = d.getFullYear();


const infoBar = `&copy ${copyrightYear} | Benjamin T. Anderson | Idaho`;
const lastModified = `Last Modified: ${document.lastModified}`;

document.querySelector("#info-bar").innerHTML = infoBar;
document.querySelector("#last-modified").innerHTML = lastModified;
