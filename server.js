const express = require('express')
const loki = require('lokijs')
const bodyParser = require('body-parser');
const path = require('path');

const app = express()
const db = new loki('loki.json', { autoupdate: true })
const collection = db.addCollection('todo')

// serve static assets normally
app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/todos', function(req, res) {
    res.json(collection.find())
})

app.get('/todos/:id', function(req, res) {
    res.json(collection.get(req.params.id))
})

app.put('/todos/:id', function(req, res) {
    //TODO
})

app.post('/todos', function(req, res) {
    res.json(collection.insert(req.body))
})

app.delete('/todos/:id', function(req, res) {
    const todo = collection.get(req.params.id)
    res.json(collection.remove(todo))
})

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})