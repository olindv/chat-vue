<template>
  <div class="col__left">
    <div class="user__info">
      <div class="user__photo">
        <img src="#"
             alt=""
             class="user__img user__img--ava" />
      </div>
      <div class="user__name">{{userInfo.userName}}</div>
    </div>
    <div class="user__participants">Пользователи</div>
    <ul class="user__list">
      <userItem :userInfo="userInfo" />
    </ul>
  </div>
</template>

<script>
import userItem from '@/components/sidebar/UserItem.vue'

export default {
  name: 'sidebar',
  components: {
    userItem
  },
  props: {
    userInfo: {
      type: [Array, null]
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
/* div {
  box-sizing: border-box;
} */
.col__left {
  background-color: #17212b;
  color: #fff;
  height: 100%;
  padding: 10px;
  width: 20%;
  min-width: 300px;
}
.user__info {
  display: flex;
  align-items: center;
}
.user__photo {
  background-color: #09101a;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* margin-bottom: 30px; */
}
.user__img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: url(../../assets/img/photo.png) center center no-repeat;
}
.user__name {
  margin-left: 10px;
  font-weight: bold;
  display: block;
}
.user__participants {
  margin-top: 30px;
}
.user__list {
  padding: 0;
  margin-top: 20px;
}
</style>
