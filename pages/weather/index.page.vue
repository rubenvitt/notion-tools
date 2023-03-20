<script lang="ts" setup>
import {ForecastData, WeatherDto} from "../../types/complete-weather";
import {SunriseDto} from "../../types/sunrise";
import moment, {Moment} from "moment";

const {sunrise, weather, city} = defineProps<{ city: string, weather: WeatherDto, sunrise: SunriseDto, search: any }>()

const MAX_DAYS = 5;

interface WeatherData {
  air_temperature_max: number;
  air_temperature_min: number;
  symbol_code: string;
  precipitation_amount: number;
}

interface DailyWeatherData {
  date: Moment;
  data: WeatherData;
}

const dailyWeatherData: DailyWeatherData[] = [];
weather.properties.timeseries.forEach((data: ForecastData) => {
  const date = moment(data.time).utc(false)
  if (date.hour() === 12 && dailyWeatherData.length < MAX_DAYS) {
    const weatherData: WeatherData = {
      air_temperature_max: data.data.next_6_hours?.details?.air_temperature_max ?? data.data.instant.details!!.air_temperature!!,
      air_temperature_min: data.data.next_6_hours?.details?.air_temperature_min ?? data.data.instant.details!!.air_temperature!!,
      symbol_code: data.data.next_6_hours?.summary?.symbol_code ?? "",
      precipitation_amount: data.data.next_6_hours?.details?.precipitation_amount ?? 0,
    };
    dailyWeatherData.push({date, data: weatherData});
  }
});

</script>

<template>
  <div>
    {{ JSON.stringify(search) }}
  </div>
  <div v-if="weather && sunrise">
    <div class="flex mt-4 mb-2">
      <div class="flex-1">
        <div class="text-gray-600 text-sm dark:text-gray-400">{{ city }}</div>
        <div class="text-3xl font-bold text-gray-800 dark:text-gray-300">
          {{ weather.properties.timeseries[0].data.instant.details.air_temperature }} °C
        </div>
        <div class="text-xs text-gray-600 dark:text-gray-400">
          {{ weather.properties.timeseries[0].data.next_6_hours.details.air_temperature_max }} °C /
          {{ weather.properties.timeseries[0].data.next_6_hours.details.air_temperature_min }} °C
          <br>
          {{ weather.properties.timeseries[0].data.next_6_hours.details.precipitation_amount }} mm
        </div>
      </div>
      <div class="w-24">
        <img :alt="weather.properties.timeseries[0].data.instant.details.air_temperature"
             :src="`/assets/weather/${weather.properties.timeseries[0].data.next_12_hours.summary.symbol_code}.svg`"
             loading="lazy">
      </div>
    </div>
    <div class="flex space-x-2 justify-between border-t dark:border-gray-500">
      <template v-for="(forecast, key) in dailyWeatherData">
        <div class="flex-1 flex flex-col items-center py-4">
          <div class="text-gray-600 text-sm dark:text-gray-400">
            {{ moment(forecast.date).format("ddd") }}
          </div>
          <div class="text-2xl font-bold text-gray-800 dark:text-gray-300">
            {{ forecast.data.air_temperature_max }} °C
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400">
            {{ forecast.data.air_temperature_min }} °C
            <br>
            {{ forecast.data.precipitation_amount }} mm
          </div>
          <div class="w-12">
            <img :alt="forecast.data.air_temperature_max"
                 :src="`/assets/weather/${forecast.data.symbol_code}.svg`" loading="lazy">
          </div>
        </div>
      </template>
    </div>
  </div>
</template>