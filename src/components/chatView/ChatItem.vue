<template>
  <ul class="message__item nickName" >
    <li v-for="(message, index) in messages" v-bind:key="index" class="message__elem" >
      <div class="photo__box">
        <img class="user__img user__img--nickName"
            src="#"
            alt="">
      </div>
      <div class="message__content">
        <div>
          {{userInfo.userName}} <b>26.01.2020</b>
        </div>
        <span class="text">{{message}}</span>
      </div>
    </li>
    <pre>{{userInfo}}</pre>
  </ul>
</template>

<script>
export default {
  name: 'chatItem',
  components: {},
  props: {
    messages: {
      type: Array
    },
    userInfo: {
      type: Array
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.user__img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: url(../../assets/img/photo.png) center center no-repeat;
}
.photo__box {
  background-color: #09101a;
  /* width: 80px;
    height: 80px; */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.message__content {
  font-size: 13px;
  margin-left: 10px;
  background-color: lightslategrey;
  border-radius: 10px;
  padding: 20px 10px;
  width: 100%;
}
.message__elem {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.message__item {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  width: 40%;
}
.message__item--current {
  align-self: flex-end;
  justify-content: flex-end;
  display: flex;
  /* flex-flow: wrap; */
}
.message__item--current .message__content div .text {
  text-align: end;
}
.message__item--current .photo__box {
  order: 2;
}
.message__item--current .message__content {
  margin: 0 10px 0 0;
  align-items: flex-end;
}
.text {
  word-break: break-all;
  margin-top: 10px;
}
</style>
