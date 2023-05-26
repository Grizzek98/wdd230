const temp = document.querySelector(".temp span").innerHTML
const windSpeed = document.querySelector(".windspeed span").innerHTML
console.log(temp)
console.log(windSpeed)

const tempNum = Number(temp)
const windSpeedNum = Number(windSpeed)

if (temp <= 50 && windSpeed > 3) {
    document.querySelector(".windchill span").innerHTML = (35.74 + (0.6215 * tempNum) - (35.75 * (windSpeedNum ** 0.16)) + (0.4275 * tempNum * (windSpeedNum ** 0.16))).toFixed(1) + " &degF"
}
else {
    document.querySelector(".windchill span").innerHTML = "N/A"
}