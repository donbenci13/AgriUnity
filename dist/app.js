var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import WeatherService from './services/weatherService.js';
var app = (function () {
    var searchInput = document.getElementById("searchInput");
    var searchForm = document.getElementById("searchForm");
    var infoSection = document.getElementById("info");
    var mainSection = document.getElementById("mainInfo");
    var mainTemplate = function (time, temp, name) {
        return "\n            <h2>".concat(name, "</h2>\n            <h3>").concat(temp, "\u00B0C at ").concat(time, "</h3>\n        ");
    };
    var templateOne = function (value) {
        return " <div class=\"single-pill\">\n                <div class=\"value\">".concat(value, "</div>\n            </div>");
    };
    var templateTwo = function (label, value) {
        if (!label) {
            return " <div class=\"pill\">\n                <div class=\"value\">".concat(value, "</div>\n            </div>");
        }
        return "\n            <div class=\"pill\">\n                <div class=\"label\">".concat(label, "</div>\n                <div class=\"value\">").concat(value, "</div>\n            </div>");
    };
    return {
        init: function () {
            searchForm.addEventListener("submit", function (e) {
                return __awaiter(this, void 0, void 0, function () {
                    var weatherService, location;
                    return __generator(this, function (_a) {
                        e.preventDefault();
                        weatherService = new WeatherService("46fe646c1190056c5763e902757940cc") //hide this in a .env file in a real project
                        ;
                        location = searchInput.value;
                        weatherService.geoCodingAPI(location)
                            .then(function (georesult) {
                            var _a = georesult[0], lat = _a.lat, lon = _a.lon;
                            return weatherService.weatherAPI({ lat: lat, lon: lon });
                        })
                            .then(function (result) {
                            var sys = result.sys, timezone = result.timezone, dt = result.dt, temperature = result.main, weather = result.weather, name = result.name, visibility = result.visibility;
                            var temp = temperature.temp, humidity = temperature.humidity, pressure = temperature.pressure, temp_max = temperature.temp_max, temp_min = temperature.temp_min, feels_like = temperature.feels_like;
                            var _a = weather[0], main = _a.main, description = _a.description;
                            var sunrise = new Date((sys.sunrise) * 1000);
                            var sunset = new Date((sys.sunset) * 1000);
                            var localDatetime = weatherService.getDate(dt.toString(), timezone.toString());
                            //render the main section
                            var loadMainHtml = mainTemplate(localDatetime, temp, name);
                            mainSection.innerHTML = loadMainHtml += templateOne("Feels like ".concat(feels_like, "\u00B0C. ").concat(main, ".").concat(description));
                            //render the other info
                            var loadHTML = '';
                            var htmlCollection = [
                                templateTwo("Humidity", "".concat(humidity, "%")),
                                templateTwo("Pressure", "".concat(pressure, "hPA")),
                                templateTwo("High Temp", "".concat(temp_max, "\u00B0C")),
                                templateTwo("Low Temp", "".concat(temp_min, "\u00B0C")),
                                templateTwo("Visibility", "".concat(visibility / 1000, "km")),
                                templateTwo("Sun Rise", "".concat(sunrise.toLocaleTimeString())),
                                templateTwo("Sun Set", "".concat(sunset.toLocaleTimeString())),
                            ];
                            htmlCollection.forEach(function (element) {
                                loadHTML += element;
                            });
                            infoSection.innerHTML = loadHTML;
                        })
                            .catch(function (err) {
                            mainSection.innerHTML = "<div class=\"error\">".concat(err.message, "</div>");
                        });
                        searchInput.value = "";
                        return [2 /*return*/];
                    });
                });
            });
        }
    };
})();
//Initilize app
app.init();
