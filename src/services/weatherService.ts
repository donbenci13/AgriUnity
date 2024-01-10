import { http } from "../helpers/http.js"
interface coord {
    lon: number
    lat: number
}

interface GeoCoding extends coord {
    country: string
    name: string
}

interface Temperature {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure?: number,
    humidity: number
}

interface Weather {
    base: string
    clouds: { all: number }
    cod: number
    coord: coord
    dt: number
    id: number
    main: Temperature
    name: string
    sys: { type: number, id: number, country: string, sunrise: number, sunset: number }
    timezone: number
    visibility: number
    weather: [{
        description: string
        icon: string
        id: number
        main: string
    }]
    wind: { speed: number, deg: number, gust: number }
}

class WeatherHelper {
    constructor() { }
    getDate(dt: string, timezone: string) {
        const utc_seconds = parseInt(dt, 10) + parseInt(timezone, 10);
        const utc_milliseconds = utc_seconds * 1000;
        const local_date = new Date(utc_milliseconds).toUTCString();
        return local_date;
    }
}

export default class WeatherService extends WeatherHelper {
    baseURL = "http://api.openweathermap.org/"
    apikey: string
    constructor(apiKey: string) {
        super()
        this.apikey = apiKey
    }
    async geoCodingAPI(location: string) {
        return http<GeoCoding[]>(`${this.baseURL}geo/1.0/direct?q=${location}&limit=1&appid=${this.apikey}`)
    }
    async weatherAPI({ lat, lon }: coord) {
        return http<Weather>(`${this.baseURL}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apikey}&units=metric`)
    }
}
