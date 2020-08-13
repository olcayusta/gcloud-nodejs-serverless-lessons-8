/* var pg = require ('pg');

var pgConString = "postgres://postgres@localhost/music"

pg.connect(pgConString, function(err, client) {
  if(err) {
    console.log(err);
  }
  client.on('notification', function(msg) {
    console.log(msg);
  });
  var query = client.query("LISTEN watchers");
}); */

/* const { Client } = require('pg')
const client = new Client({
    connectionString: 'postgresql://postgres@localhost/music'
})

await client.connect()

client.on('notification', (msg) => {
    console.log(msg);
})

await client.query('LISTEN watchers')
await client.end() */

const start = async () => {

    const { Client } = require('pg')
    const client = new Client({
        connectionString: 'postgresql://postgres@localhost/music'
    })
    
    await client.connect()

    client.on('notification', (msg) => {
        console.log(msg);
    });

    await client.query("LISTEN watchers");
   
    // await client.end()
}

start()