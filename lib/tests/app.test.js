const request = require('supertest');
const express = require('express');
const app = require('../app');

app.use(express.json());

const expectedResponse = [
    {
        'id': '2',
        'make': 'ford',
        'year': 1957
    },
    {
        'id': '3',
        'make': 'chevrolet',
        'year': 1987
    },
    {
        'id': '4',
        'make': 'toyota',
        'year': 2004
    },
    {
        'id': '5',
        'make': 'toyota',
        'year': 2014
    },
    {
        'id': '6',
        'make': 'mini',
        'year': 2002
    }
];

describe('GET /cars', () => {
    it('responds wtih all cars in table', async () => {
        return await request(app)
            .get('/cars')
            .expect(200);
    });
});

describe('POST /cars', () => {
    it('adds a new car to the table', async () => {
        return await request(app)
            .post('/cars')
            .send({ make: 'volkswagon', year: 1977 })
            .expect(200);
    });
});

describe('PUT /cars', () => {
    it('updates a car in the table', async () => {
        ')
    })
