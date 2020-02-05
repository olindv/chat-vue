<template>
  <li class="user__elem">
    <div class="elem">
      <img class="elem__pic user__img--test elem__pic--test user__img"
           src="#"
           alt="" />
    </div>
    <h3 class="title">{{userInfo.userName}} ({{userInfo.userNick}})</h3>
  </li>
</template>

<script>
export default {
  name: 'userItem',
  components: {},
  props: {
    userInfo: {
      type: [Object, null]
    }
  }
}
</script>

<style lang="scss" scoped>
.user__elem {
  display: flex;
  margin-bottom: 15px;
}
.elem {
  margin-right: 20px;
  background-color: #09101a;
  border-radius: 50%;
}
.elem__pic {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  display: flex;
  background: url(../../assets/img/photo.png) center center no-repeat;
}
.title {
  margin: 0;
  display: flex;
  align-items: center;
}
</style>
