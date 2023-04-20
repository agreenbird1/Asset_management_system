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
    <div class="form" :class="{ 'form-active': loginActive }">
      <h5><img src="@/assets/favicon.ico" alt="" />资产管理系统</h5>
      <input
        type="text"
        placeholder="手机号"
        @input="accountChange"
        maxlength="11"
        autocomplete="false"
      />
      <input type="password" placeholder="登录密码" @input="passwordChange" />
      <button @click="login">登录</button>
      <span @click="loginActive = false">取消</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CommonApi } from '@/api/common'
import LoginApi from '@/api/login'
import { phoneReg } from '@/config/regExp'
import { encrypt } from '@/utils/crypto'
import { useMessage } from 'naive-ui'
import { onUnmounted, reactive, ref } from 'vue'

const loginActive = ref(false)
const message = useMessage()

const useLogin = () => {
  const loginForm = reactive({
    phone: '',
    password: '',
  })
  const accountChange = (e: Event) => {
    ;(e.target as HTMLInputElement).value = loginForm.phone = (
      e.target as HTMLInputElement
    ).value.replace(/[^0-9]/gi, '')
  }
  const passwordChange = (e: Event) => {
    loginForm.password = (e.target as HTMLInputElement).value
  }
  const login = () => {
    const { phone, password } = loginForm
    if (!phoneReg.test(phone)) return message.warning('手机号格式错误！')
    if (password.length > 16 || password.length < 6)
      return message.warning('密码长度在6-16位！')
    LoginApi.login(phone, encrypt(password)).then((res) => {
      if (res.success) {
        // 存储到 store
        // 返回首页
      } else message.error(res.message)
    })
  }
  return {
    loginForm,
    accountChange,
    passwordChange,
    login,
  }
}

const { accountChange, passwordChange, login } = useLogin()

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

  .form {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%) scale(0);
    z-index: 40;
    transition: all 0.4s;
    background-color: #ecf0f3;
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
    border-radius: 12px;
    padding: 0 25px 25px 25px;

    h5 {
      display: flex;
      align-items: center;
      font-size: 34px;
      font-weight: 700;
      line-height: 3;
      color: #181818;
    }

    input {
      width: 350px;
      height: 40px;
      margin: 4px 0;
      padding-left: 25px;
      font-size: 13px;
      letter-spacing: 0.15px;
      border: none;
      outline: none;
      font-family: 'Montserrat', sans-serif;
      background-color: #ecf0f3;
      transition: 0.25s ease;
      border-radius: 8px;
      box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
      transition: all 0.5s;
    }

    input:focus {
      box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #c9c8c8;
    }

    button {
      width: 180px;
      height: 40px;
      border-radius: 25px;
      margin-top: 30px;
      font-weight: 700;
      font-size: 18px;
      letter-spacing: 1.15px;
      background-color: #4b70e2;
      color: #f9f9f9;
      box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
      border: none;
      outline: none;
      cursor: pointer;
    }

    span {
      margin-top: 5px;
      font-size: 12px;
      color: #9c9a9a;
      cursor: pointer;
      width: 60px;
      text-align: center;
      border-bottom: 1px solid #979494;
      padding-bottom: 3px;

      &:hover {
        color: #ffffff;
        border-bottom: 1px solid #fff;
      }
    }
  }

  .form-active {
    transform: translateX(-50%) translateY(-50%) scale(1);
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
      animation-delay: 2s;
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
