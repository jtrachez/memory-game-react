import { Repository } from "./Repository"

export class PlayerRepository extends Repository {


    constructor(client) {
        super(client, 'players')
    }

    async getLastByOrderAsc({ limit = 5 }) {
        return await this.get({ fields: ['name', 'score'], limit, orderBy: 'score', sort: 'ASC' })
    }

}