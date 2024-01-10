import WeatherService from './services/weatherService.js'
const app = (function () {
    const searchInput = document.getElementById("searchInput") as HTMLInputElement
    const searchForm = document.getElementById("searchForm") as HTMLFormElement
    const infoSection = document.getElementById("info") as HTMLDivElement
    const mainSection = document.getElementById("mainInfo") as HTMLDivElement
    const mainTemplate = (time: string, temp: number, name: string) => {
        return `
            <h2>${name}</h2>
            <h3>${temp}°C at ${time}</h3>
        `
    }
    const templateOne = (value: string) => {
        return ` <div class="single-pill">
                <div class="value">${value}</div>
            </div>`
    }
    const templateTwo = (label: string, value: string) => {
        if (!label) {
            return ` <div class="pill">
                <div class="value">${value}</div>
            </div>`
        }
        return `
            <div class="pill">
                <div class="label">${label}</div>
                <div class="value">${value}</div>
            </div>`
    }
    return {
        init: () => {
            searchForm.addEventListener("submit", async function (e: SubmitEvent) {
                e.preventDefault();
                const weatherService = new WeatherService("46fe646c1190056c5763e902757940cc") //abstract this in a .env file in a real project
                const location = searchInput.value
                weatherService.geoCodingAPI(location)
                    .then(georesult => {
                        const { lat, lon } = georesult[0]
                        return weatherService.weatherAPI({ lat, lon })
                    })
                    .then(result => {
                        const { sys, timezone, dt, main: temperature, weather, name, visibility } = result;
                        const { temp, humidity, pressure, temp_max, temp_min, feels_like } = temperature;
                        const { main, description } = weather[0];
                        const sunrise = new Date((sys.sunrise) * 1000)
                        const sunset = new Date((sys.sunset) * 1000)

                        const localDatetime = weatherService.getDate(dt.toString(), timezone.toString())
                        let loadMainHtml: string = mainTemplate(localDatetime, temp, name)
                        mainSection.innerHTML = loadMainHtml += templateOne(`Feels like ${feels_like}°C. ${main}.${description}`)

                        let loadHTML: string = ''
                        const htmlCollection = [
                            templateTwo("Humidity", `${humidity}%`),
                            templateTwo("Pressure", `${pressure}hPA`),
                            templateTwo("High Temp", `${temp_max}°C`),
                            templateTwo("Low Temp", `${temp_min}°C`),
                            templateTwo("Visibility", `${visibility / 1000}km`),
                            templateTwo("Sun Rise", `${sunrise.toLocaleTimeString()}`),
                            templateTwo("Sun Set", `${sunset.toLocaleTimeString()}`),
                        ]

                        htmlCollection.forEach(element => {
                            loadHTML += element
                        });

                        infoSection.innerHTML = loadHTML
                    })
                    .catch(err => {
                        mainSection.innerHTML = `<div class="error">${err.message}</div>`
                    })

                searchInput.value = ""
            })
        }
    }
})()

app.init()