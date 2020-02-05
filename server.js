const WebSocket = require('ws')
const server = new WebSocket.Server({ port: 4000 })

const clients = {
  online: {},
  offline: {},

  saveClient(name, client) {
    this.online[name] = client
  },
  removeClient(name) {
    this.offline[name] = this.online[name]
    delete this.online[name]
  },
  getClient(name) {
    if (this.offline[name]) {
      this.online[name] = this.offline[name]
    }
    delete this.offline[name]
    return this.online[name]
  },
  getAllClients() {
    return this.online
  },
  savePhoto(name, src) {
    this.online[name]['photo'] = src
  }
  // saveMessage(nick, text, name) {
  //     const date = new Date();
  //     const options = {
  //         hour: 'numeric',
  //         minute: 'numeric',
  //         second: 'numeric'
  //     };
  //     const timeStr = new Intl.DateTimeFormat('ru-RU', options).format(date);

  //     const messageDetails = {
  //         text,
  //         date: timeStr,
  //         name,
  //         nick
  //     };

  //     if (this.online['messages']) {
  //         this.online['messages'] = [
  //             ...this.online['messages'],
  //             messageDetails
  //         ];
  //     } else {
  //         this.online['messages'] = [messageDetails];
  //     }
  //     console.log(this.online[name]);
  // }
}

server.on('connection', ws => {
  const userElem = {}
  const send = (client, type = 'getUsers') => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: type,
          users: clients.getAllClients()
          // messages: clients.getAllMessages()
        })
      )
    }
  }
  ws.on('message', message => {
    const msg = JSON.parse(message)
    console.log(msg.type, message)
    if (msg.type === 'init') {
      userElem.name = msg.name
      userElem.nick = msg.nick
      userElem.photo = msg.photo

      if (!clients.getClient(msg.nick)) {
        clients.saveClient(msg.nick, userElem)
      }

      server.clients.forEach(client => send(client, 'initData'))
    } else if (msg.type === 'photo') {
      clients.savePhoto(msg.nick, msg.photo)
      server.clients.forEach(client => send(client, 'savePhoto'))
    } else {
      server.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message)
        }
      })
    }

    // else if (msg.type === 'message') {
    //     clients.saveMessage(msg.nick, msg.text, msg.name);
    //     server.clients.forEach(client => {
    //         if (client.readyState === WebSocket.OPEN) {
    //             send(client, 'message');
    //         }
    //     });
    // }
  })
  ws.on('close', function() {
    clients.removeClient(userElem.nick)
    server.clients.forEach(client => send(client))
  })
})

//node server
//http-server -p 4000
