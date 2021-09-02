import { PlayerRepository } from "../../../database/PlayerRepository"

import { client } from "./../../../database/client"

export default function handler(req, res) {

    if (req.method !== 'POST') {
        res.status(400).send({ message: 'Only POST requests allowed' })
        return
    }

    const repository = new PlayerRepository(client)
    console.log(req.body)
    repository.create(req.body)

    res.status(200).json(req.body)
}
