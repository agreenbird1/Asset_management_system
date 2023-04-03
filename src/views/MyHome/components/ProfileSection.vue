<template>
  <div class="profile-section">
    <p class="company">觉晓科技</p>
    <div class="profile-header df jcsb aic">
      <button class="avatar">
        <img src="https://assets.codepen.io/3306515/IMG_2025.jpg" />
        <span>Aybüke C.</span>
      </button>
      <div class="profile-options df aic">
        <ChangePassword />
        <Logout />
      </div>
    </div>
    <p>中后台项目组</p>
    <p>前端工程师</p>
    <p>个人简介：长得越丑，就越要往台上走。</p>
  </div>
</template>

<script setup lang="ts">
import ChangePassword from './ChangePassword.vue'
import Logout from './Logout.vue'
</script>

<style scoped lang="less">
.profile-section {
  flex-shrink: 0;
  padding-bottom: 32px;
  background-color: var(--projects-section);
  margin-left: 24px;
  flex: 1;
  width: 100%;
  padding: 20px;
  height: 250px;
  border-radius: 30px;
  position: relative;
  overflow: auto;
  transition: all 300ms cubic-bezier(0.19, 1, 0.56, 1);

  .avatar {
    padding: 0;
    border: 0;
    background-color: transparent;
    display: flex;
    align-items: center;

    img {
      width: 32px;
      height: 32px;
      object-fit: cover;
      border-radius: 50%;
      margin-right: 4px;
    }

    span {
      color: var(--main-color);
      font-size: 16px;
      line-height: 24px;
    }
  }

  p {
    font-size: 14px;
    margin-top: 5px;
    padding-left: 35px;
    color: #5e5b5b;
  }

  .company {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 600;
    padding: 0;
  }
}
</style>
