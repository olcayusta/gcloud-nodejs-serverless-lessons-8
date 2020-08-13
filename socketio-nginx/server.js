const http = require('http')
const fs   = require('fs')
const server = http.createServer((request, response) => {
    fs.readFile('index.html', (err, data) => {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });
}).listen(5000)

const io   = require('socket.io').listen(server)

const nsp = io.of('chat')

console.log('App listening port 5000!')

nsp.on('connection', (socket) => {
    console.log('Client connected!')

    setInterval(() => {
        socket.emit('news', new Date())
    }, 1000)

    socket.on('disconnect', () => {
        console.log('Client disconnect!')
    })
})