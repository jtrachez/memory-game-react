import { client } from "../database/client"

export class Database {

    table = 'players'

    async get(options) {

        try {
            const result = await client.query(`SELECT * FROM ${this.table}`)
            console.log(result)
            return result

        } catch (error) {
            console.log(error)
        }

        return {}

    }

    getLast(limit = 5) {

        return this.get({ limit })
    }

    create() {
        console.log(`ceate`)
    }

}