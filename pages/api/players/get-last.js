// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { client } from "../../../database/client"
import { PlayerRepository } from "../../../database/PlayerRepository"


export default async function handler(req, res) {

    if (req.method == 'GET') {

        const repository = new PlayerRepository(client)

        let data = await repository.getLastFiveByOrderAsc()

        res.status(200).json(data)
    }

}
