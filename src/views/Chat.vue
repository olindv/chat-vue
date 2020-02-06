<template>
  <div class="wrapper">
    <AuthPopup v-if="!isAuthorized && !socket" @toggleAuth="toggleSocketConnection" />
    <div v-else class="container__chat container">
      <Sidebar :userInfo="userInfo" />
      <ChatView :socket="socket" :userInfo="userInfo"/>
    </div>
  </div>
</template>

<script>
import AuthPopup from '@/components/popup/AuthPopup.vue'
import ChatView from '@/components/chatView/ChatView.vue'
import Sidebar from '@/components/sidebar/Sidebar.vue'

export default {
  name: 'chat',
  components: {
    AuthPopup,
    ChatView,
    Sidebar
  },
  data() {
    return {
      isAuthorized: false,
      socket: null,
      userInfo: {
        userName: null,
        userNick: null,
        userPhoto: ''
      }
    }
  },
  methods: {
    togglePopup() {
      this.isAuthorized = !this.isAuthorized
    },
    initWs(userDetails) {
      this.socket = new WebSocket('ws://localhost:4000')

      this.socket.onopen = () => {
        // infoUser(ws)
        // sendInfoOnServer(ws)
        // initData(ws)
        this.togglePopup()
        this.userInfo.userName = userDetails.name
        this.userInfo.userNick = userDetails.nickName
      }

      this.socket.onmessage = res => {
        // const response = JSON.parse(res.data)
        // const { type, users } = response
        // if (type === 'initData') {
        //   initialRender(users)
        // } else if (type === 'getUsers') {
        //   updateUsers(users)
        // } else if (type === 'savePhoto') {
        //   updatePhoto(users)
        // } else if (type === 'message') {
        //   // console.log('type ', type, response);
        //   renderMsg(res.data)
        //   // upRender(response);
        // }
      }

      this.socket.onclose = () => (this.socket = null)
    },
    toggleSocketConnection(userDetails) {
      this.initWs(userDetails)
    }
  }
}
</script>

<style lang="scss" scoped>
.button_auth {
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 10;
}
.wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.container__chat {
  display: flex;
  height: 100vh;
}

/* .container {
  display: none;
} */
</style>
