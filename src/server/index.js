const volleyball = require('volleyball')
const path = require('path')
const express = require('express')

const app = express();

app.use(volleyball)
app.use(express.json())

app.use(express.static(path.join(__dirname, '..', '..', 'static')))

app.get('/', (req, res, next) => {
  res.send("Hello world")
})

app.listen(3000, () => {
  console.log("Hello Seattle. I'm listening")
})
