import moment from 'moment';
import Image from "next/image";
import {unstable_cache} from "next/cache";

const MAX_DAYS = 5;

interface WeatherData {
    air_temperature_max: number;
    air_temperature_min: number;
    symbol_code: string;
    precipitation_amount: number;
}

interface DailyWeatherData {
    date: moment.Moment;
    data: WeatherData;
}

export default async function WeatherPage({searchParams: {city, lon, lat}}: {
    searchParams: { lon?: string, lat?: string, city?: string }
}) {
    console.log("city", city);
    console.log("lon", lon);
    console.log("lat", lat);

    if (!lon || !lat) {
        return (
            <div>
                <h1>Bad request</h1>
                <p>Latitude and longitude are required</p>
            </div>
        );
    }

    async function fetchWeather() {
        const response = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lat}&lon=${lon}`, {
            headers: {
                'User-Agent': 'notion-tools'
            }
        });
        return response.json();
    }

    const cachedWeather = unstable_cache(fetchWeather, [`weather-${lat}-${lon}`], {revalidate: 600});

    const weather = await fetchWeather();

    const dailyWeatherData: DailyWeatherData[] = [];
    weather.properties.timeseries.forEach((data: any) => {
        const date = moment(data.time).utc(false);
        if (date.hour() === 12 && dailyWeatherData.length < MAX_DAYS) {
            const weatherData: WeatherData = {
                air_temperature_max: data.data.next_6_hours?.details?.air_temperature_max ?? data.data.instant.details.air_temperature,
                air_temperature_min: data.data.next_6_hours?.details?.air_temperature_min ?? data.data.instant.details.air_temperature,
                symbol_code: data.data.next_6_hours?.summary?.symbol_code ?? "",
                precipitation_amount: data.data.next_6_hours?.details?.precipitation_amount ?? 0,
            };
            dailyWeatherData.push({date, data: weatherData});
        }
    });

    return (
        <div>
            {dailyWeatherData.length > 0 && (
                <div className="flex pt-4 pb-2">
                    <div className="flex-1">
                        <div className="text-gray-600 text-sm dark:text-gray-400">{city}</div>
                        <div className="text-3xl font-bold text-gray-800 dark:text-gray-300">
                            {dailyWeatherData[0].data.air_temperature_max} °C
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                            {dailyWeatherData[0].data.air_temperature_max} °C /
                            {dailyWeatherData[0].data.air_temperature_min} °C
                            <br/>
                            {dailyWeatherData[0].data.precipitation_amount} mm
                        </div>
                    </div>
                    <div className="w-24">
                        <Image width={96} height={96}
                               src={`/assets/weather/${dailyWeatherData[0].data.symbol_code}.svg`}
                               alt={dailyWeatherData[0].data.symbol_code}/>
                    </div>
                </div>
            )}
            <div className="flex space-x-2 justify-between border-t dark:border-gray-500">
                {dailyWeatherData.map((dailyData, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center py-4">
                        <div className="text-gray-600 text-sm dark:text-gray-400">
                            {dailyData.date.format('ddd')}
                        </div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-300">
                            {dailyData.data.air_temperature_max} °C
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                            {dailyData.data.air_temperature_min} °C
                            <br/>
                            {dailyData.data.precipitation_amount} mm
                        </div>
                        <div className="w-12">
                            <Image alt={dailyData.data.symbol_code}
                                   height={96} width={96}
                                   src={`/assets/weather/${dailyData.data.symbol_code}.svg`} loading="lazy"/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}