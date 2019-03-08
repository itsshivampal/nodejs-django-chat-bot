var http = require('http').createServer().listen(4000);
var io = require('socket.io')(http);
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

var xhttp = new XMLHttpRequest();

// node.js server is running at http://localhost:4000/

var host = 'http://127.0.0.1:8000/';
var port = '8000';

var onlineUser = {}

io.on('connection', function(socket) {
    // console.log(socket.id);

    socket.on('message', function(msgObject) {
        console.log("message received");
        console.log(onlineUser);
        var room_id = onlineUser[socket.id][2]
        io.to(room_id).emit('getMessage', msgObject);

        // var url = 'http://' + host +':' + port + '/save_message/';

        // xhttp.onreadystatechange = function() {
        //     if(this.readyState === 4 && this.status === 200) {
        //         if(xhttp.responseText === "error")
        //             console.log("error saving message");
        //         else if(xhttp.responseText === "success")
        //             console.log("the message was posted successfully");
        //     }
        // };

        // xhttp.open('POST', url, true);
        // xhttp.send(JSON.stringify(msgObject));
    });


    socket.on("join", (data, callback) => {
        var user_detail = [data.chat_to, data.chat_from, data.chat_id, socket.id];

        onlineUser[socket.id] = user_detail;
        console.log(onlineUser)
        // console.log(data.chat_id);

        socket.join(data.chat_id);
        var message = data.chat_to + " You are joined";
        io.to(data.chat_id).emit('revert_msg', message);

    })

});