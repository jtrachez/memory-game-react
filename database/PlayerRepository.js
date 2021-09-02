import { Repository } from "./Repository"

export class PlayerRepository extends Repository {


    constructor(client) {
        super(client, 'players')
    }

    async getLastFiveByOrderAsc() {
        return await this.get({ fields: ['name', 'score'], limit: 5, orderBy: 'score', sort: 'ASC' })
    }


}