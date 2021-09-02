export class Repository {
    table
    constructor(client, table) {
        this.client = client
        this.table = table
    }

    async query(sql, data = null) {
        try {
            const query = await this.client.query(sql, data)
            this.client.end()
            return query

        } catch (error) {
            console.warn(error)
        }

    }

    async get({ fields = null, limit = 10, sort = 'DESC', orderBy = 'score' }) {
        return await this.query(`SELECT ${fields ? fields.join(',') : '*'} FROM ${this.table} ORDER BY ${orderBy} ${sort} LIMIT 0,${limit}`)
    }


    async create(data) {
        let query = await this.query(`INSERT INTO ${this.table} SET ?`, data)
        return query.insertId
    }
}