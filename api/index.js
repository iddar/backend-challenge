const express = require('express')
const app = express()
const port = 8000

const data = require('./dummy-data.json')

app.get('/', (req, res) => {
  res.json(data)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})