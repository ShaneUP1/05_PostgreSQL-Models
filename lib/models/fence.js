const pool = require('../utils/pool');

module.exports = class Fence {
    id;
    privacy;
    material;

    constructor(row) {
        this.id = row.id;
        this.privacy = row.privacy;
        this.material = row.material;
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM fences');
        return rows.map(row => new Fence(row));
    }

    static async insert({ privacy, material }) {
        const { rows } = await pool.query(
            'INSERT INTO fences (privacy, material) VALUES ($1, $2) RETURNING *',
            [privacy, material]
        );
        return new Fence(rows[0]);
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM fences WHERE id=$1',
            [id]
        );

        if (!rows[0]) throw new Error(`No fences with id ${id}`);
        return new Fence(rows[0]);
    }

    static async update(id, { privacy, material }) {
        const { rows } = await pool.query(
            `UPDATE fences
    SET privacy=$1,
        material=$2
    WHERE id=$3
    RETURNING *
    `,
            [privacy, material, id]
        );
        return new Fence(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            `DELETE from fences
            WHERE id=$1
            RETURNING *`,
            [id]
        );
        if (!rows[0]) throw new Error(`No states with id ${id}`);
        return new Fence(rows[0]);
    }

};
