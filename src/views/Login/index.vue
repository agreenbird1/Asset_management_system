<template>
  <div class="login">
    <section class="weather-wrapper">
      <span class="time"
        >{{ weatherTimeInfo.hour }}:{{ weatherTimeInfo.minute }}</span
      >
      <span class="weather">
        <img src="@/assets/imgs/太阳.png" width="30" alt="" />
        {{ weatherTimeInfo.temperature }}℃ &nbsp; {{ weatherTimeInfo.path }}
      </span>
    </section>
  </div>
</template>

<script setup lang="ts">
import { CommonApi } from '@/api/common'
import { onUnmounted, reactive, ref } from 'vue'

const date = new Date()

const weatherTimeInfo = ref({
  hour: date.getHours(),
  minute: date.getMinutes(),
  name: '重庆',
  path: '重庆，中国',
  temperature: '10',
})

const location = navigator.geolocation

const initWeather = async (name: string) => {
  const { data } = await CommonApi.getWeather(name)
  weatherTimeInfo.value.temperature = data.results[0].now.temperature
}

location.getCurrentPosition((pos) => {
  CommonApi.getCityInfo(pos.coords.latitude, pos.coords.longitude).then(
    (res) => {
      const { name, path } = res.data.results[0]
      weatherTimeInfo.value.name = name
      weatherTimeInfo.value.path = path
      initWeather(path.split(',')[1])
    }
  )
})

const timeInterval = setInterval(() => {
  const date = new Date()
  weatherTimeInfo.value.hour = date.getHours()
  weatherTimeInfo.value.minute = date.getMinutes()
}, 1000)

onUnmounted(() => clearInterval(timeInterval))
</script>

<style scoped lang="less">
.login {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: no-repeat url('@/assets/imgs/login-bg.png') center;
  background-size: cover;
  .weather-wrapper {
    padding: 20px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 300px;
    height: 150px;
    background-color: rgba(255, 255, 255, 0.6);
    overflow: hidden;
    border-radius: 20px;
    z-index: 10;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: no-repeat url('@/assets/imgs/login-bg.png') center;
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: cover;
      filter: blur(10px);
      z-index: -1;
    }
    .time {
      font-size: 60px;
      color: #fff;
      margin-right: 20px;
    }
    .weather {
      display: flex;
      align-items: center;
      font-size: 22px;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
