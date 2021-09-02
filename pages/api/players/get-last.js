// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Database } from "../../../modules/database"


export default async function handler(req, res) {

    if (req.method == 'GET') {
        const db = new Database()

        let data = await db.getLast()

        res.status(200).json(data)
    }

}
