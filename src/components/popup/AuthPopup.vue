<template>
  <div class="container__auth">
    <div class="auth__box">
      <div class="auth__content">
        <div class="auth__img">
          <img src="../../assets/img/auth.png"
               alt=""
               class="auth__pic">
        </div>
        <div class="auth__info">
          <h1 class="auth__title">Авторизация</h1>
          <span class="auth__text">Введите пожалуйста своё фио и ник для дальнейшей авторизации</span>
        </div>
        <form class="form">
          <input type="text"
                 placeholder="Введите ФИО"
                 class="auth__username"
                 required
                 v-model='name'>
          <input type="text"
                 placeholder="Введите свой ник"
                 class="auth__usernick"
                 required
                 v-model='nickName'>
          <input @click.prevent="handleSubmit"
                 type="submit"
                 class="auth__button"
                 value="Войти">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'authPopup',
  components: {},
  data() {
    return {
      name: '',
      nickName: ''
    }
  },
  methods: {
    handleSubmit() {
      const { name, nickName } = this
      this.$emit('toggleAuth', { name, nickName })
    }
  }
}
</script>

<style lang="scss" scoped>
.container__auth {
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #09101a;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.auth__box {
  width: 516px;
  background-color: #17212b;
}
.auth__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 45px 0;
}
.auth__img {
  margin-bottom: 35px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: #242f3d;
  display: flex;
  align-items: center;
  justify-content: center;
}
.auth__info {
  text-align: center;
  margin-bottom: 35px;
}
.auth__title {
  margin-bottom: 15px;
  margin-top: 0px;
  color: #fff;
}
.auth__text {
  color: #7f91a4;
}
.form {
  display: flex;
  flex-direction: column;
}
.auth__username {
  margin-bottom: 30px;
  color: #fff;
  background-color: #17212b;
  border-bottom: 1px solid #465362;
}

.auth__username:focus {
  border-bottom: 1px solid #5288c1;
}
.auth__usernick {
  margin-bottom: 30px;
  color: #fff;
  background-color: #17212b;
  border-bottom: 1px solid #465362;
}
.auth__usernick:focus {
  border-bottom: 1px solid #5288c1;
}
.auth__button {
  background-color: #5288c1;
  border: none;
  border-radius: 15px;
  color: #fff;
  outline: 0;
  cursor: pointer;
  padding: 13px 40px;
}
.auth__button:hover {
  background-color: #426d9a;
}
</style>
