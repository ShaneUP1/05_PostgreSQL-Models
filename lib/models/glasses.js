const pool = require('../utils/pool');

module.exports = class Glasses {
    id;
    rx;
    tinted;

    constructor(row) {
        this.id = row.id;
        this.rx = row.rx;
        this.tinted = row.tinted;
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM glasses');
        return rows.map(row => new Glasses(row));
    }

    static async insert({ rx, tinted }) {
        const { rows } = await pool.query(
            'INSERT INTO glasses (rx, tinted) VALUES ($1, $2) RETURNING *',
            [rx, tinted]
        );
        return new Glasses(rows[0]);
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM glasses WHERE id=$1',
            [id]
        );

        if (!rows[0]) throw new Error(`No glasses with id ${id}`);
        return new Glasses(rows[0]);
    }

    static async update(id, { rx, tinted }) {
        const { rows } = await pool.query(
            `UPDATE glasses
    SET rx=$1,
        tinted=$2
    WHERE id=$3
    RETURNING *
    `,
            [rx, tinted, id]
        );
        return new Glasses(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            `DELETE from glasses
            WHERE id=$1
            RETURNING *`,
            [id]
        );
        if (!rows[0]) throw new Error(`No glasses with id ${id}`);
        return new Glasses(rows[0]);
    }

};
