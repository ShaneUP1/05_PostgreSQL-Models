const pool = require('../utils/pool');

module.exports = class Dog {
    id;
    breed;
    color;

    constructor(row) {
        this.id = row.id;
        this.breed = row.breed;
        this.color = row.color;
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM dogs');
        return rows.map(row => new Dog(row));
    }

    static async insert({ breed, color }) {
        const { rows } = await pool.query(
            'INSERT INTO dogs (breed, color) VALUES ($1, $2) RETURNING *',
            [breed, color]
        );
        return new Dog(rows[0]);
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM dogs WHERE id=$1',
            [id]
        );

        if (!rows[0]) throw new Error(`No dogs with id ${id}`);
        return new Dog(rows[0]);
    }

    static async update(id, { breed, color }) {
        const { rows } = await pool.query(
            `UPDATE dogs
    SET breed=$1,
        color=$2
    WHERE id=$3
    RETURNING *
    `,
            [breed, color, id]
        );
        return new Dog(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            `DELETE from dogs
            WHERE id=$1
            RETURNING *`,
            [id]
        );
        if (!rows[0]) throw new Error(`No dogs with id ${id}`);
        return new Dog(rows[0]);
    }

};
