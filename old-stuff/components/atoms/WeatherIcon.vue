<script lang="ts" setup>
// import all icons

import {WeatherIconName} from "../../public/assets/weather";

const {icon} = defineProps<{ icon: WeatherIconName }>()
const imageUri = `/assets/weather/${icon}.svg`

</script>

<template>
  <div class="h-24 w-24">
    <img :src="imageUri" alt="weather icon"/>
  </div>
</template>