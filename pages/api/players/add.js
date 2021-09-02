// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Database } from "../../../modules/database"

export default function handler(req, res) {


  const dataBase = new Database

  console.log(dataBase)


  res.status(200).json({ name: 'John Doe' })
}
