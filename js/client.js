const socket = io('http://localhost:8000');

const form = document.getElementById('send-content');
const msginp = document.getElementById('msginp');
const msgCont = document.querySelector('.container');

const append = (message, position) => {
    const msgEle = document.createElement('div');
    msgEle.innerText = message;
    msgEle.classList.add('message');
    msgEle.classList.add(position);
    msgCont.append(msgEle);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = msginp.value;
    append(`You: ${msg}`, `right`);
    socket.emit('send', msg);
    msginp.value = '';
})

const nme = prompt("Enter your name: ");
socket.emit('new-user-joined', nme);

socket.on('user-joined', data => {
    append(`${data} joined the chat`, `right`);
});

socket.on('receive', data => {
    append(`${data.nme}: ${data.message}`, `left`);
})