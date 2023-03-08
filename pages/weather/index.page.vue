<script lang="ts" setup>
import {WeatherDto} from "../../types/complete-weather";
import {SunriseDto} from "../../types/sunrise";
import WeatherIcon from "../../components/atoms/WeatherIcon.vue";
import moment from "moment";

const pageProps = defineProps(['weather', 'sunrise'])
const weather: WeatherDto = pageProps.weather
const sunrise: SunriseDto = pageProps.sunrise
</script>

<template>
  <div v-if="weather && sunrise">
    <div class="bg-white shadow-md rounded-lg p-4">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <WeatherIcon :icon="weather.properties.timeseries[0].data.next_6_hours.summary.symbol_code"/>
        </div>
        <div class="ml-6 pt-1">
          <h4 class="text-xl text-gray-900 leading-tight">
            {{ weather.properties.timeseries[0].data.instant.details.air_temperature }}°C</h4>
          <p class="text-base text-gray-600 leading-normal">
            {{ weather.properties.timeseries[0].data.next_6_hours.summary.symbol_code }}</p>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p class="text-sm text-gray-600 leading-normal">Wind speed</p>
          <p class="text-base text-gray-900 leading-normal">
            {{ weather.properties.timeseries[0].data.instant.details.wind_speed }} m/s</p>
        </div>
        <div>
          <p class="text-sm text-gray-600 leading-normal">Wind direction</p>
          <p class="text-base text-gray-900 leading-normal">
            {{ weather.properties.timeseries[0].data.instant.details.wind_from_direction }}°</p>
        </div>
        <div>
          <p class="text-sm text-gray-600 leading-normal">Relative humidity</p>
          <p class="text-base text-gray-900 leading-normal">
            {{ weather.properties.timeseries[0].data.instant.details.relative_humidity }}%</p>
        </div>
        <div>
          <p class="text-sm text-gray-600 leading-normal">Pressure</p>
          <p class="text-base text-gray-900 leading-normal">
            {{ weather.properties.timeseries[0].data.instant.details.air_pressure_at_sea_level }} hPa</p>
        </div>
        <div>
          <p class="text-sm text-gray-600 leading-normal">Cloud cover</p>
          <p class="text-base text-gray-900 leading-normal">
            {{ weather.properties.timeseries[0].data.instant.details.cloud_area_fraction }}%</p>
        </div>
        <div>
          <p class="text-sm text-gray-600 leading-normal">Sunset</p>
          <p class="text-base text-gray-900 leading-normal">
            {{ moment(sunrise.location.time[0].sunset.time).format('HH:mm') }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Something went wrong 💥</p>
  </div>
</template>