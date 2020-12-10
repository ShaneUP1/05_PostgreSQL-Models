require('dotenv').config();
const request = require('supertest');
const express = require('express');
const app = require('../app');
const fs = require('fs');
const Car = require('../models/car');
const pool = require('../utils/pool');


app.use(express.json());

const expectedResponse =
{
    'id': '1',
    'make': 'chevrolet',
    'year': 1987
}
    ;

describe('app tests', () => {
    beforeEach(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });

    afterAll(() => {
        return pool.end();
    });

    it('GETs all cars in cars table', async () => {
        const newCar = await Car.insert({ make: 'chevrolet', year: 1987 });

        const response = await request(app)
            .get('/cars');

        expect(response.body).toEqual([newCar]);
    });

    it('creates a car via POST', async () => {
        const response = await request(app)
            .post('/cars')
            .send({
                make: "chevrolet",
                year: 1987
            });

        expect(response.body).toEqual({
            id: "1",
            make: "chevrolet",
            year: 1987
        });
    });

    it('finds a car by id via GET', async () => {
        const newCar = await Car.insert({ make: 'cheverolet', year: 1987 });

        const response = await request(app)
            .get(`/cars/${newCar.id}`);
    });

    it('updates a car by id via PUT', async () => {
        const newCar = await Car.insert({ make: 'chevrolet', year: 1987 });

        const response = await request(app)
            .put(`/cars/${newCar.id}`)
            .send({
                make: "chevrolet",
                year: 1983
            });

        expect(response.body).toEqual({
            ...newCar,
            make: 'chevrolet',
            year: 1983
        });
    });

    it('deletes a car by id via DELETE', async () => {
        const newCar = await Car.insert({ make: 'chevrolet', year: 1987 });
        console.log(newCar.id);
        const response = await request(app)
            .delete(`/cars/${newCar.id}`);
        expect(response.body).toEqual(newCar);
    });
});




