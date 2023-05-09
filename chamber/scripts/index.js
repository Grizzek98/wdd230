function myFunction() {
    var x = document.querySelector("#navbar-links");
    if (x.style.display === "block") {
        satisfies.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

// const datebox = document.querySelector("#current-date");
const date = new Date();

const fulldateUK = new Intl.DateTimeFormat("en-UK", {
	dateStyle: "full"
}).format(now);

document.querySelector("#date").innerHTML = `<em>${fulldateUK}</em>`;
document.querySelector("#date").innerHTML = "poop";

// datebox.innerHTML = "hwllo"

