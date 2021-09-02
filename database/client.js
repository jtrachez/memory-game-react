import mysql from 'serverless-mysql'

export const client = mysql({
    config: {
        host: process.env.HOST,
        database: process.env.DATABASE,
        user: process.env.USERNAME,
        password: process.env.PASSWORD
    }
})