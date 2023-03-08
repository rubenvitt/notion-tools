import {PageContextServer} from "../../renderer/types";
import {WeatherDto} from "../../types/complete-weather";
import {SunriseDto} from "../../types/sunrise";
import axios from "axios";

export async function onBeforeRender(pageContext: PageContextServer) {

    // get from query
    const city = pageContext.routeParams.city
    const latitude = pageContext.routeParams.lat
    const longitude = pageContext.routeParams.lon

    if (!latitude || !longitude) {

        console.error(`latitude (${latitude}) or longitude (${longitude}) is missing`)

        return {
            pageContext: {
                httpResponse: {
                    statusCode: 400,
                    body: 'Bad request',
                    contentType: 'text/plain'
                }
            }
        }
    }

    const [weatherResponse, sunriseResponse] = await Promise.all([
        axios.get(`https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${latitude}&lon=${longitude}`, {
            headers: {
                'User-Agent': 'notion-tools'
            }
        }),
        axios.get(`https://api.met.no/weatherapi/sunrise/2.0/.json?lat=${latitude}&lon=${longitude}&date=2023-03-07&offset=00:00`, {
            headers: {
                'User-Agent': 'notion-tools'
            }
        }),
    ])

    const weather: WeatherDto = await weatherResponse.data
    const sunrise: SunriseDto = await sunriseResponse.data

    const pageProps = {weather, sunrise, city}
    return {
        pageContext: {
            pageProps
        }
    }
}

export const passToClient = ['pageProps']
