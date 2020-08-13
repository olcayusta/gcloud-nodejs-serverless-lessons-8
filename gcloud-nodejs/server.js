const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello')
})

const server = app.listen(process.env.PORT || 8080, () => {
    console.log('Example app listening at http 8080...')
})