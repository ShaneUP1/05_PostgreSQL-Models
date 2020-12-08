const pool = require('../utils/pool');

module.exports = class State {
    id;
    abbrev;
    land_locked;

    constructor(row) {
        this.id = row.id;
        this.abbrev = row.abbrev;
        this.land_locked = row.land_locked;
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM states');
        return rows.map(row => new State(row));
    }

    static async insert({ abbrev, land_locked }) {
        const { rows } = await pool.query(
            'INSERT INTO states (abbrev, land_locked) VALUES ($1, $2) RETURNING *',
            [abbrev, land_locked]
        );
        return new State(rows[0]);
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM states WHERE id=$1',
            [id]
        );

        if (!rows[0]) throw new Error(`No states with id ${id}`);
        return new State(rows[0]);
    }

    static async update(id, { abbrev, land_locked }) {
        const { rows } = await pool.query(
            `UPDATE states
    SET abbrev=$1,
        land_locked=$2
    WHERE id=$3
    RETURNING *
    `,
            [abbrev, land_locked, id]
        );
        return new State(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            `DELETE from states
            WHERE id=$1
            RETURNING *`,
            [id]
        );
        if (!rows[0]) throw new Error(`No states with id ${id}`);
        return new State(rows[0]);
    }

};
