<template>
  <div class="message__item nickName">
    <div class="photo__box">
      <img class="user__img user__img--nickName"
           src="#"
           alt="">
    </div>
    <div class="message__content">
      <div>
        Dmitriy <b>26.01.2020</b>
      </div>
      <span class="text">Какой-то текст</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chatItem',
  components: {}
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: lightslategrey;
  border-radius: 10px;
  padding: 0 10px;
  width: 100%;
}
.message__item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  /* width: 25%; */
  max-width: 50%;
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
