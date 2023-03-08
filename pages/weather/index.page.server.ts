import {PageContextServer} from "../../renderer/types";
import {WeatherDto} from "../../types/complete-weather";
import {SunriseDto} from "../../types/sunrise";

export async function onBeforeRender(pageContext: PageContextServer) {

    // get from query
    const latitude = pageContext.query?.lat
    const longitude = pageContext.query?.lon
    console.log(`query: ${pageContext.query}}`)

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
        fetch(`https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${latitude}&lon=${longitude}`),
        fetch(`https://api.met.no/weatherapi/sunrise/2.0/.json?lat=${latitude}&lon=${longitude}&date=2023-03-07&offset=00:00`),
    ])

    const weather: WeatherDto = await weatherResponse.json()
    const sunrise: SunriseDto = await sunriseResponse.json()

    const pageProps = {weather, sunrise}
    return {
        pageContext: {
            pageProps
        }
    }
}

export const passToClient = ['pageProps']
export const doNotPrerender = true
