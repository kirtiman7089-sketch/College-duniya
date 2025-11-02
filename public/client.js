const socket =io('http://localhost:8080');

const element = document.querySelector(".user1");
const username = element.textContent;
var chats= document.querySelector(".chats");
var users_list=document.querySelector(".users-list");
var users_count=document.querySelector(".users-count");
var msg_send=document.querySelector("#user-send");
var user_msg=document.querySelector("#user-msg");

var audio = new Audio('ting.mp3');
// Listen for the 'messages' event from the server
socket.on('messages', (messages) => {
    // Iterate through the array of messages
    messages.forEach((message) => {
        if(message.user == username)
         appendMessage1(message,'outgoing');
        else
        appendMessage1(message,'incoming');
    });
});
function appendMessage1(data,status){
    let div=document.createElement('div');
    div.classList.add('message',status);
    let content=`
    <h5>${data.user}</h5>
    <p>${data.content}</p>
    `;
    div.innerHTML=content;
    chats.appendChild(div);
    chats.scrollTop=chats.scrollHeight;
}



socket.emit("new-user-joined",username);

socket.on('user-connected',(socket_name)=>{
    userJoinLeft(socket_name,'joined');
});

function userJoinLeft(name,status){
  let div = document.createElement("div");
  div.classList.add('user-join');
  let content = `<p><b> ${name} </b> ${status} the chat</p>`;
  div.innerHTML=content;
  chats.appendChild(div);
}

socket.on('user-disconnected',(user)=>{
    userJoinLeft(user,'left')
});

socket.on('user-list',(users)=>{
users_list.innerHTML="";
users_arr=Object.values(users);
for(i=0;i<users_arr.length;i++){
    let p = document.createElement('p');
    p.innerText= users_arr[i];
    users_list.appendChild(p);
}
  users_count.innerHTML= users_arr.length;
});


msg_send.addEventListener('click',()=>{
    let data={
        user:username,
        msg: user_msg.value
    };
    if(user_msg.value!=''){
        appendMessage(data,'outgoing');
        socket.emit('message',data);
        user_msg.value='';

    }
});

function appendMessage(data,status){
    let div=document.createElement('div');
    div.classList.add('message',status);
    let content=`
    <h5>${data.user}</h5>
    <p>${data.msg}</p>
    `;
    div.innerHTML=content;
    chats.appendChild(div);
    chats.scrollTop=chats.scrollHeight;
}

socket.on('message',(data)=>{
    appendMessage(data,'incoming');
        audio.play();
    
});