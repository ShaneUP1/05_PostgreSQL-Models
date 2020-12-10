const pool = require('../utils/pool');

module.exports = class Car {
    id;
    make;
    year;

    constructor(row) {
        this.id = row.id;
        this.make = row.make;
        this.year = row.year;
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM cars');
        return rows.map(row => new Car(row));
    }

    static async insert({ make, year }) {
        const { rows } = await pool.query(
            'INSERT INTO cars (make, year) VALUES ($1, $2) RETURNING *',
            [make, year]
        );
        return new Car(rows[0]);
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM cars WHERE id=$1',
            [id]
        );

        if (!rows[0]) throw new Error(`No cars with id ${id}`);
        return new Car(rows[0]);
    }

    static async update(id, { make, year }) {
        const { rows } = await pool.query(
            `UPDATE cars
    SET make=$1,
        year=$2
    WHERE id=$3
    RETURNING *
    `,
            [make, year, id]
        );
        return new Car(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            `DELETE from cars
            WHERE id=$1
            RETURNING *`,
            [id]
        );
        return new Car(rows[0]);
    }

};
