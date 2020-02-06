<template>
  <div class="col__right">
    <div class="messages__container">
      <chatItem  :messages="messages" :userInfo="userInfo"/>
    </div>
    <div class="message__generate">
      <chatInput :socket="socket" @mes="rewriteMessage"/>
    </div>
  </div>
</template>

<script>
import chatItem from '@/components/chatView/ChatItem.vue'
import chatInput from '@/components/chatView/ChatInput.vue'

export default {
  name: 'chatView',
  components: { chatItem, chatInput },
  data() {
    return {
      messages: []
    }
  },
  props: {
    // message: {
    //   type: String
    // },
    userInfo: {
      type: Object
    },
    socket: {
      type: WebSocket
    }
  },
  methods: {
    rewriteMessage() {
      // console.log('v chatitem', this.message)
      this.socket.onmessage = res => {
        const response = JSON.parse(res.data)
        const { type } = response
        if (type === 'message') {
          console.log('type ', type, response)
          // this.message = this.message.push(response.text)
          this.messages.push(response.text)
          console.log(this.messages)
          //   renderMsg(res.data)
          //   // upRender(response);
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* div {
  box-sizing: border-box;
} */

.col__right {
  width: 80%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #101921;
}
.messages__container {
  height: 94%;
  overflow-y: auto;
  background-color: #0e1621;
  color: #fff;
  display: flex;
  flex-direction: column;
}
.message__generate {
  height: 6%;
  background-color: #17212b;
  border-top: 1px solid #101921;
  display: flex;
  align-items: center;
}
</style>
