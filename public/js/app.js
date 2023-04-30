console.log("Client side js loaded")

const forecastForm = document.getElementById("search-form");
const search = document.getElementById("search-input");
const forecastLocation = document.getElementById("forecast-location");

forecastForm.addEventListener("submit", (event) => {
    event.preventDefault()

    let query = search.value;

    fetch(`https://forecast-app-ymtp.onrender.com/forecast?address=${query}`)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    forecastLocation.textContent = `An error has occurred calling host: ${data.error.info}`
                } else {
                    forecastLocation.textContent = `${data.body.location.name}, ${data.body.location.country}`;
                    document.getElementById('forecast-temperature').textContent = `${data.body.current.temperature}ºC`;
                    document.getElementById('forecast-info').textContent = `Sensacion térmica de ${data.body.current.feelslike}ºC, con ${data.body.current.precip}% de probabilidad de
                    lluvia y ${data.body.current.humidity}% de humedad`;
                }

            })

        }).catch((error) => console.log(error))
})