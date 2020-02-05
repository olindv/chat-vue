<template>
  <div class="col__right">
    <div class="messages__container">
      <chatItem />
    </div>
    <div class="message__generate">
      <chatInput :socket="socket" />
    </div>
  </div>
</template>

<script>
import chatItem from '@/components/chatView/ChatItem.vue'
import chatInput from '@/components/chatView/ChatInput.vue'

export default {
  name: 'chatView',
  components: { chatItem, chatInput },
  props: {
    socket: {
      type: WebSocket
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
