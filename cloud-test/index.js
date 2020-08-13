const express = require('express')
const app = express()
const port = 8000

const { Pool, Client } = require('pg')
// const connectionString = 'postgresql://postgres:K3n4AN.R@35.241.179.47:5432/postgres'
const connectionString = 'postgresql://olcay:tatlikedi@68.183.68.126:5432/olcay'
/* 
const redis = require('redis')
const redis_client = redis.createClient({
  host: '68.183.68.126',
  port: 6379,
  auth_pass: 'foobared'
}) */

const client = new Client({
  connectionString: connectionString,
})

const pool = new Pool({
  connectionString: connectionString,
})

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/users', (req, res) => {

/*   redis_client.get('key1', (err, reply) => {
    console.dir(reply)
  })
 */
  console.dir('welcome')

  pool.query('SELECT * FROM users').then(result => {
    res.end(JSON.stringify(result.rows))
  }).catch(err => {
    throw err
  })

 /*  pool.query('SELECT * FROM user_list').then(result => res.end(JSON.stringify(result.rows)))
  .catch(e => console.error(e.stack)) */


/*   const client = await pool.connect()
  try {
    const result = await client.query('SELECT * FROM users')
    res.end(JSON.stringify(result.rows))
  } finally {
    client.release()
  } */
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))