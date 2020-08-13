const express = require('express')
const cors = require('cors')
const app = express()
const os = require('os')
const mysql = require('mysql')
const disk = require('diskusage')
let path = os.platform() === 'win32' ? 'c:' : '/'
const child_process = require('child_process')

const fs = require('fs')

const server = app.listen(5000)
const io = require('socket.io')(server)

app.use(cors());

/* const server = http.createServer((req, res) => {

    // Callbacks
    disk.check(path, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info.available);
            console.log(info.free);
            console.log(info.total);
        }
    });

    res.end('Hello World!')

}) */

fs.readdir('/', (err, files) => {
    console.log(files[2])

   /* const x = fs.statSync(`/images`);
    const a = fs.lstatSync('/images');*/
    fs.readdir('/images', (err1, files1) => {
        const test = fs.statSync(`/images/${files1[1]}`)
        console.log(test.size)
    })
})

io.on('connection', (socket) => {
    console.log('Client connected!')
    setInterval(() => {
        socket.emit('free memory', os.freemem())
    }, 5000)
})

app.get('/mysql/:db', (req, res) => {
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: req.params.db
    });

    const sql = `SELECT table_name, table_rows, engine, data_length, table_collation FROM information_schema.tables WHERE table_schema = ? ORDER BY table_name`
   con.query(sql, [req.params.db],(err, result, fields) => {
        if (err) throw err;
        res.json(result)
    });
})

app.get('/mysql/:db/:table', (req, res) => {
    const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: req.params.db
    });

    const sql = `SELECT * FROM ??`
    con.query(sql, [req.params.table],(err, result, fields) => {
        if (err) throw err;
        res.json(result)
    });
})

app.get('/mysql', (req, res) => {

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: 'music'
    });



    con.connect((err) => {
        if (err) throw err
        console.log("Connected!")
        con.query('SHOW DATABASES;', (err, result) => {
            if (err) throw err
            res.json(result)
            // console.log(result)
        });
    });

/*    con.query("SHOW TABLES",(err, result, fields) => {
        if (err) throw err;
        res.json(result)
    });*/
/*    con.query("SELECT * FROM artists",(err, result, fields) => {
        if (err) throw err;
        console.log(result);
        res.json(result)
    });*/
})

app.get('/', (req, res) => {
    const x = {
        hostname: os.hostname(),
        platform: os.platform(),
        arch: os.arch(),
        cpus: os.cpus(),
        cpuModel: os.cpus()[0].model,
        release: os.release(),
        uptime: os.uptime(),
        userInfo: os.userInfo(),
        freemem: os.freemem(),
        totalmem: os.totalmem()
    }
    res.json(x)
})

console.log('app listen 5000!')

process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
})