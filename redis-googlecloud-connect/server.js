const http = require('http')
const redis = require('redis')
const client = redis.createClient({
    auth_pass: 'F8nu7FEwuRGV',
    host: '35.242.237.254',
    port: 6379
})
http.createServer((req, res) => {
    client.SET('user:01', 'bla bla', (err, reply) => {
        console.dir(reply)
    })
    res.end('Hello world')
}).listen(4800)

console.log('Server listenin 4800...')