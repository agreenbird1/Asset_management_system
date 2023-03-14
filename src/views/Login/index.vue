<template>
  <div class="login">
    <div class="login-wrapper" :class="{ 'login-active': loginActive }">
      <div class="login-button login-button-hover" @click="loginActive = true">
        <img src="@/assets/imgs/向右.png" alt="" />
      </div>
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
    <form :class="{ 'form-active': loginActive }">
      <div>form-item</div>
      <div>form-item</div>
      <div>form-item</div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { CommonApi } from '@/api/common'
import { onUnmounted, reactive, ref } from 'vue'

const loginActive = ref(false)

const useWeather = () => {
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
  return {
    weatherTimeInfo,
    timeInterval,
  }
}
const { weatherTimeInfo, timeInterval } = useWeather()

onUnmounted(() => clearInterval(timeInterval))
</script>

<style scoped lang="less">
.login {
  position: relative;
  width: 100%;
  height: 100%;
  form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 40;
    transform: scale(0);
    transition: all 0.4s;
  }
  .form-active{
    transform: scale(1);
  }
  .login-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: no-repeat url('@/assets/imgs/login-bg.png') center;
    background-size: cover;
    transition: all 0.4s;
    z-index: 2;
    .weather-wrapper {
      padding: 20px;
      position: absolute;
      color: #aaa5a5;
      top: 20px;
      left: 20px;
      width: 300px;
      height: 150px;
      background-color: rgba(199, 195, 195, 0.6);
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
        margin-right: 20px;
      }
      .weather {
        display: flex;
        align-items: center;
        font-size: 22px;
        text-align: center;
      }
    }
    .login-button {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
      width: 100px;
      &:hover {
        background-color: rgba(174, 168, 168, 0.1);
      }
      text-align: center;
      backdrop-filter: blur(3px);
      background-color: rgba(106, 103, 103, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 100px;
      box-shadow: 2px 2px 2px rgb(0 0 0 / 10%);
      img {
        width: 40px;
      }
    }
    .login-button-hover:not(:hover) {
      animation: bounce 3s infinite;
      animation-delay: 3s;
    }
    @keyframes bounce {
      6.66%,
      17.66%,
      33.33% {
        transform: translateX(-50%) translateY(0);
      }

      13.33%,
      14.33% {
        transform: translateX(-50%) translateY(-30px);
      }

      23.33% {
        transform: translateX(-50%) translateY(-15px);
      }

      26.66% {
        transform: translateX(-50%) translateY(0);
      }

      30% {
        transform: translateX(-50%) translateY(-4px);
      }
    }
  }
  .login-active {
    transform-origin: center;
    transform: scale(1.8);
    filter: blur(5px);
  }
}
</style>
