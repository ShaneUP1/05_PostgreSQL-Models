const express = require('express');
const Car = require('./models/car');
const app = express();


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/cars', (req, res) => {
    Car
        .find()
        .then(car => res.send(car));
});

app.get('/cars/:id', (req, res) => {
    Car
        .findById(req.params.id)
        .then(car => res.send(car));
});

app.post('/cars', (req, res) => {
    Car
        .insert(req.body)
        .then(car => res.send(car));
});

app.put('/cars/:id', (req, res) => {
    Car
        .update(req.params.id, req.body)
        .then(car => res.send(car));
});

app.delete('/cars/:id', (req, res) => {
    Car
        .delete(req.params.id)
        .then(car => res.send(car));
});

module.exports = app;
