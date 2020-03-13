let user = {};

const initData = socket => {
    const userInfo = {
        type: 'init',
        name: user.name,
        nick: user.nick,
        photo: user.photo
    };
    socket.send(JSON.stringify(userInfo));
};

// Setting up a profile
const infoUser = socket => {
    const userName = document.querySelectorAll('.user__name');
    const userPhoto = document.querySelector('.user__photo');
    const containerLoad = document.querySelector('.container__popup--load');
    const viewPhoto = document.querySelector('.photo__pic');
    const savePhoto = document.querySelector('.save__button');
    const cancelPhoto = document.querySelector('.cancel__button');
    const dropZone = document.querySelector('.user__info--flex');
    const containerPreload = document.querySelector(
        '.container__popup--preload'
    );
    const photoFile = document.querySelector('.photo__file');

    // pass the name of user
    userName.forEach(element => {
        element.textContent = user.name;
    });

    // open popup
    userPhoto.addEventListener('click', () => {
        containerPreload.classList.remove('container');
    });

    // input listener (choose photo)
    photoFile.addEventListener('change', e => {
        e.preventDefault();
        const file = photoFile.files[0];

        handleView(file);
    });

    // d&d photo
    dropZone.addEventListener('drop', e => {
        e.preventDefault();

        let files = e.dataTransfer.files;
        let file = files[0];

        handleView(file);
    });
    dropZone.addEventListener('dragover', e => e.preventDefault());
    dropZone.addEventListener('dragleave', e => e.preventDefault());

    // render photo
    const handleView = file => {
        containerPreload.classList.add('container');
        containerLoad.classList.remove('container');

        let FReader = new FileReader();

        FReader.readAsDataURL(file);
        FReader.onloadend = () => {
            viewPhoto.src = FReader.result;
        };
    };

    // save photo
    savePhoto.addEventListener('click', e => {
        e.preventDefault();

        containerLoad.classList.add('container');
        user.photo = viewPhoto.src;
        // userImg.src = user.photo;

        sendPhotoOnServer(socket);
    });

    //cancel photo
    cancelPhoto.addEventListener('click', e => {
        e.preventDefault();

        containerLoad.classList.add('container');
    });
};

const initialRender = obj => {
    updateUsers(obj);
    // updateMessages();
};

// Update users (sidebar)
const updateUsers = obj => {
    const usersList = document.querySelector('.user__list');
    const userCounter = document.querySelector('.user__participants');
    const temp = Handlebars.compile(document.querySelector('#users').innerHTML);
    let users = [];
    let userInfo;
    for (const key in obj) {
        users.push(obj[key]);
    }
    users.forEach(element => {
        if (element.nick === user.nick) {
            userInfo = element;
        }
    });

    user = userInfo;
    userCounter.innerHTML = 'Пользователи' + '(' + users.length + ')';
    usersList.innerHTML = '';
    users.forEach(elem => {
        usersList.innerHTML += temp({
            nick: elem.nick,
            photo: elem.photo,
            name: elem.name
        });
    });
};

// const updateMessages = () => {};

// Update photos
const updatePhoto = users => {
    for (const key in users) {
        const { nick, photo } = users[key];
        if (photo) {
            const userImages = document.querySelectorAll(`.user__img--${nick}`);

            userImages.forEach(image => {
                image.src = photo;
            });
            if (user.nick === nick) {
                const avatarImages = document.querySelectorAll(
                    '.user__img--ava'
                );
                avatarImages.forEach(avatar => {
                    avatar.src = photo;
                });
            }
        }
    }
};

// Sending photo on server
const sendPhotoOnServer = socket => {
    const photoInfo = {
        type: 'photo',
        nick: user.nick,
        photo: user.photo
    };

    socket.send(JSON.stringify(photoInfo));
};

// Sending data for message rendering
const sendInfoOnServer = socket => {
    const messageInput = document.querySelector('.message__input');
    const messageButton = document.querySelector('.message__button');

    messageButton.addEventListener('click', () => {
        const messageInfo = {
            type: 'message',
            text: messageInput.value,
            name: user.name,
            photo: user.photo,
            nick: user.nick
        };
        socket.send(JSON.stringify(messageInfo));
        messageInput.value = '';
    });
};

// Rendering message in chat
const renderMsg = res => {
    const messageArea = document.querySelector('.messages__container');
    const data = JSON.parse(res);
    const date = new Date();
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    const timeStr = new Intl.DateTimeFormat('ru-RU', options).format(date);
    const temp = Handlebars.compile(
        document.querySelector('#message').innerHTML
    );
    const current = data.nick === user.nick ? 'message__item--current' : '';
    // debugger;
    const messageInfo = {
        info: data,
        date: timeStr,
        currentUser: current,
        userNick: data.nick
    };
    messageArea.innerHTML += temp(messageInfo);
    messageArea.scrollTop = messageArea.scrollHeight;
};

// const upRender = res => {
//     // const response = JSON.parse(res);
//     // console.log(res.messages);
//     const responseMessages = res.messages;
//     const messageArea = document.querySelector('.messages__container');
//     const temp = Handlebars.compile(
//         document.querySelector('#message').innerHTML
//     );

//     responseMessages.forEach(element => {
//         messageArea.innerHTML += temp({
//             info: element,
//             currentUser:
//                 element.nick === user.nick ? 'message__item--current' : '',
//             userNick: element.nick
//             // name: name
//         });
//     });

//     // for (const key in responseUsers) {
//     //     console.log(responseUsers, ':', responseUsers[key]);
//     //     const { nick, name } = responseUsers[key];

//     //     if (nick === user.nick) {
//     //         const current = 'message__item--current';
//     //         const value = responseUsers[key].messages;
//     //         let el;
//     //         value.forEach(element => {
//     //             el = element;
//     //         });
//     //         messageArea.innerHTML += temp({
//     //             info: el,
//     //             currentUser: current,
//     //             userNick: nick,
//     //             name: name
//     //         });
//     //     }
//     // }
// };

// User auth
const authUser = () => {
    const inputName = document.querySelector('.auth__username');
    const inputNick = document.querySelector('.auth__usernick');
    const form = document.querySelector('.form');
    const auth = document.querySelector('.container__auth');
    const chat = document.querySelector('.container__chat');

    form.addEventListener('submit', e => {
        e.preventDefault();

        if (inputName.value && inputNick.value) {
            [user.name, user.nick] = [inputName.value, inputNick.value];
            auth.classList.add('container');
            chat.classList.remove('container');
        }

        initWs();
    });
};

// Setting up communication with the server
const initWs = () => {
    const ws = new WebSocket('ws://localhost:4000');

    ws.onopen = () => {
        infoUser(ws);
        sendInfoOnServer(ws);
        initData(ws);
    };

    ws.onmessage = res => {
        const response = JSON.parse(res.data);
        const { type, users } = response;

        if (type === 'initData') {
            initialRender(users);
        } else if (type === 'getUsers') {
            updateUsers(users);
        } else if (type === 'savePhoto') {
            updatePhoto(users);
        } else if (type === 'message') {
            // console.log('type ', type, response);

            renderMsg(res.data);
            // upRender(response);
        }
    };

    ws.onclose = () => setStatus('DISCONNECTED');
};

window.onload = authUser;