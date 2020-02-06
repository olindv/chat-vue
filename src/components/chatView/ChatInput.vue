<template>
  <div class="message__generate-box">
    <input v-model="message"
           type="text"
           placeholder="Введите сообщение..."
           class="message__input" />
    <button @click="sendMessage"
            class="message__button">Отправить</button>
  </div>
</template>

<script>
export default {
  name: 'chatInput',
  components: {},
  props: {
    socket: {
      type: WebSocket
    }
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    sendMessage() {
      const messageInfo = {
        type: 'message',
        text: this.message
        // name: user.name,
        // photo: user.photo,
        // nick: user.nick
      }
      this.socket.send(JSON.stringify(messageInfo))
      this.$emit('mes', this.message)
      this.message = ''
      // console.log(messageInfo)
      // console.log(this.socket)
    }
  }
}
</script>
<style lang="scss" scoped>
button {
  background-color: #5288c1;
  border: none;
  border-radius: 15px;
  color: #fff;
  outline: 0;
  cursor: pointer;
}

button:hover {
  background-color: #426d9a;
}
input {
  /* outline: none; */
  border: 1px solid grey;
}
.message__generate-box {
  width: 100%;
}
.message__input {
  background-color: #17212b;
  width: 75%;
  color: #525e6a;
  padding: 5px;
}
.message__button {
  padding: 7px 20px;
}
</style>
