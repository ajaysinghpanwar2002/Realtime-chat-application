const socket = io('http://localhost:8000');
//get dom elements in a respective  js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
//audio that will play on reiving messagesc
var audio = new Audio('noti.wav');
// fnction which will append event info to the computer
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}


//ask new user for his name
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);
//if a new user joins, receive his name from the server 
socket.on('user-joined', name => {
    append(`${name} joined the chat `, 'left')
});
// if the server sends the message recevies it 
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
});
//if a user leaves the chat , append the info to the container
socket.on('left', name => {
    append(`${name} left the chat`, 'left')
}); 
//if the forn gets submited send  server the message 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInput.value = ''
})

















