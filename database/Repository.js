import { toJson } from "../lib/utils"

export class Repository {

    constructor(client, table) {
        this.client = client
        this.table = table
    }

    async query(sql, data = null) {
        try {
            const query = await this.client.query(sql, data)
            await this.client.end()
            return query

        } catch (error) {
            console.warn(error)
        }

    }

    async get({ fields = null, limit = 10, sort = 'DESC', orderBy = 'score' }) {
        let sql = `SELECT ${fields ? fields.join(',') : '*'} FROM ${this.table} ORDER BY ${orderBy} ${sort} LIMIT 0,${limit}`
        return toJson(await this.query(sql))
    }


    async create(data) {
        let query = await this.query(`INSERT INTO ${this.table} SET ?`, data)
        return query.insertId
    }
}