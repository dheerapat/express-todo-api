const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('strictQuery', false)

const app = express()
const port = process.env.PORT
const Schema = mongoose.Schema

const todoSchema = new Schema({
  todo: {type: String, require: true},
  isFinished: {type: Boolean, default: false}
})

const todo = mongoose.model('todo', todoSchema)

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/add', (req, res) => {
  let newTodo = new todo({todo: req.body.todo})
  newTodo.save((err, data) => {
    if (err) {
      console.error(err)
    } else {
      res.json(data)
    }
  })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})