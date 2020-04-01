
let socket = undefined;
let username = generateRandomId();

function initialize() {
    loadHistory();

    socket = io.connect({transports: ['websocket']});
    socket.on('message', renderMessage);

    document.addEventListener("keypress", function(event){
        if(event.keyCode === 13){
            sendMessage();
        }
    })
}

function sendMessage() {
    const chatBox = document.getElementById("chatInput");
    const message = chatBox.value;
    chatBox.value = "";
    if(message !== "") {
        socket.emit("message", JSON.stringify({'username': username, 'message': message}))
    }

    chatBox.focus();
}


function renderMessage(rawMessage) {
    let chat = document.getElementById('chat');

    const theMessage = JSON.parse(rawMessage);

    chat.innerHTML = "<b>" + theMessage['username'] + "</b>: " + theMessage["message"] + "<br/>" + chat.innerHTML
}

function loadHistory() {
    let ajaxRequest = new XMLHttpRequest();
    ajaxRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("chat").innerHTML = renderAllMessage(this.responseText);
        }
    };
    ajaxRequest.open("GET", "chat-history", true);
    ajaxRequest.send();
}


function renderAllMessage(rawMessages) {
    let historyHTML = "";
    let history = JSON.parse(rawMessages);
    for (const message of history) {
        historyHTML = "<b>" + message['username'] + "</b>: " + message["message"] + "<br/>" + historyHTML;
    }
    return historyHTML;
}

function generateRandomId() {
    return "anon_" + Math.round(Math.random()*1000).toString()
}
