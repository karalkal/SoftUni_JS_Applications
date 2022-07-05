function attachEvents() {
    const location = document.getElementById('location')
    const forecastContainer = document.getElementById('forecast')
    const divCurrent = document.getElementById('current')
    const divUpcoming = document.getElementById('upcoming')

    let sunny = '&#x2600';          // ☀
    let partlySunny = '&#x26C5';    // ⛅
    let overcast = '&#x2601';       // ☁
    let rain = '&#x2614';           // ☂
    let degrees = '&#176';          // °

    forecastContainer.style.display = 'inline'

    document.getElementById('submit').addEventListener('click', getWeather)


    function getWeather() {
        divCurrent.innerHTML = `<div class="label">Current conditions</div>`
        divUpcoming.innerHTML = ` <div class="label">Three-day forecast</div>`

        // ALL
        fetch(`http://localhost:3030/jsonstore/forecaster/locations`)
            .then(response => response.json())
            .then(allCities => {
                let foundCity = allCities.find(city => city.name == location.value)

                if (!foundCity) displayError()

                let locationCode = foundCity.code
                fetch(`http://localhost:3030/jsonstore/forecaster/today/${locationCode}`)    // TODAY
                    .then(response => {
                        if (response.status !== 200) {
                            displayError()
                        }
                        return response.json()
                    })
                    .then(data => {
                        constructCurrentDiv(data)
                    })

                fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`)    // NEXT
                    .then(response => {
                        if (response.status !== 200) {
                            displayError()
                        }
                        return response.json()
                    })
                    .then(data => {
                        constructNextDiv(data)
                    })
            })
    }


    function constructCurrentDiv(data) {
        let forecasts = document.createElement('div')
        forecasts.classList.add('forecasts')

        let symbolSpan = document.createElement('span')
        symbolSpan.classList.add('condition', 'symbol')
        if (data.forecast.condition === 'Sunny') {
            symbolSpan.innerHTML = sunny //`&#x2600;` // ☀
        } else if (data.forecast.condition === 'Partly sunny') {
            symbolSpan.innerHTML = partlySunny //`&#x26C5;` // ⛅
        } else if (data.forecast.condition === 'Overcast') {
            symbolSpan.innerHTML = overcast //`&#x2601;` // ☁
        } else if (data.forecast.condition === 'Rain') {
            symbolSpan.innerHTML = rain // `&#x2614;` // ☂
        } else {
            displayError()
        }

        let conditionSpan = document.createElement('span')
        conditionSpan.classList.add('condition')
        let citySpan = document.createElement('span')
        citySpan.classList.add('forecast-data')
        citySpan.textContent = data.name
        let degreesSpan = document.createElement('span')
        degreesSpan.classList.add('forecast-data')
        degreesSpan.innerHTML = data.forecast.low + degrees + '/' + data.forecast.high + degrees    // °
        let weatherTypeSpan = document.createElement('span')
        weatherTypeSpan.classList.add('forecast-data')
        weatherTypeSpan.textContent = data.forecast.condition

        conditionSpan.appendChild(citySpan)
        conditionSpan.appendChild(degreesSpan)
        conditionSpan.appendChild(weatherTypeSpan)

        forecasts.appendChild(symbolSpan)
        forecasts.appendChild(conditionSpan)

        divCurrent.appendChild(forecasts)

        forecastContainer.style.display = 'block'
    }


    function constructNextDiv(data) {
        let divForecastInfo = document.createElement('div')
        divForecastInfo.classList.add('forecast-info')

        for (let day = 0; day < 3; day++) {

            let upcomingSpan = document.createElement('span')
            upcomingSpan.classList.add('upcoming')

            let symbolSpan = document.createElement('span')
            symbolSpan.classList.add('symbol')
            if (data.forecast[day].condition === 'Sunny') {
                symbolSpan.innerHTML = sunny //`&#x2600;` // ☀
            } else if (data.forecast[day].condition === 'Partly sunny') {
                symbolSpan.innerHTML = partlySunny //`&#x26C5;` // ⛅
            } else if (data.forecast[day].condition === 'Overcast') {
                symbolSpan.innerHTML = overcast //`&#x2601;` // ☁
            } else if (data.forecast[day].condition === 'Rain') {
                symbolSpan.innerHTML = rain // `&#x2614;` // ☂
            } else {
                displayError()
            }

            let degreesSpan = document.createElement('span')
            degreesSpan.classList.add('forecast-data')
            degreesSpan.innerHTML = data.forecast[day].low + degrees + '/' + data.forecast[day].high + degrees    // °

            let weatherTypeSpan = document.createElement('span')
            weatherTypeSpan.classList.add('forecast-data')
            weatherTypeSpan.textContent = data.forecast[day].condition

            upcomingSpan.appendChild(symbolSpan)
            upcomingSpan.appendChild(degreesSpan)
            upcomingSpan.appendChild(weatherTypeSpan)

            divForecastInfo.appendChild(upcomingSpan)
            divUpcoming.append(divForecastInfo)

            forecastContainer.style.display = 'block'
        }
    }


    function displayError() {
        forecastContainer.style.display = 'block'
        forecastContainer.textContent = 'Error'
        throw new Error('Error')
    }

}

attachEvents();