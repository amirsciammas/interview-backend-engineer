import { db_connect } from '../db/sqlite-connector'
import { Request, Response } from 'express'
import { ISqlite } from 'sqlite'

let sql: ISqlite.SqlType

export const getUserDetails = async function getUserDetails(req: Request, res: Response) {
    const userId = req.params.userId
    const connection = await db_connect()
    try {
        sql = `CREATE TABLE IF NOT EXISTS users (
          [id] INT NULL,
          [name] VARCHAR (50),
          [email] VARCHAR (100),
          [address_geo_lat] FLOAT,
          [address_geo_lng] FLOAT
        );`
        await connection.run(sql)
        //sql = `INSERT INTO users (id,name,email,address_geo_lat,address_geo_lng) VALUES (?,?,?,?,?)`;
        // await connection.run(sql, [1, "MS Dhoni", "msd@adi.biz", "35.9991", "65.4332"], (err: { message: any; }) => {
        //     if (err) throw new Error(err.message);
        // })
        const user = await connection.get(`select * from users where id = ?`, userId)
        if (user) {
            res.status(200).send(user)
        }
        else { res.status(400).send('User Id not Found'); }
    } catch (error: any) {
        res.status(500).send(error.message)
    }
    await connection.close()
}

export const getUserAndAlbumDetails = async function getUserDetails(req: Request, res: Response) {
    const userId = req.params.userId
    const page_limit = parseInt(req.query.limit as string) || 10  // default keeping it as 10
    const sort_param = req.query.sort as string || 'title'
    const sort_order = req.query.order as string || 'ASC'
    const connection = await db_connect()
    try {
        sql = `CREATE TABLE IF NOT EXISTS albums (
                [userId] INT, 
                [id] INT, 
                [title] VARCHAR (200)
                );`
        await connection.run(sql)

        // sql = `INSERT INTO albums (userId,id,title) VALUES (?,?,?)`;
        // await connection.run(sql, [4,42,"Whoopty -CJ"], (err: { message: any; }) => {
        //     if (err) throw new Error(err.message);
        // })
        const details = await connection.all(
            `SELECT distinct a.id,a.userId,a.title,u.name FROM albums a
            INNER JOIN users u ON u.id = a.userId
            where u.id = ${userId} 
            ORDER BY ${sort_param} ${sort_order}
            LIMIT ${page_limit}
        `)
        if (details.length > 0) {
            res.status(200).send(details)
        }
        else res.status(400).send('Album details Not Found. Please check Input Parameters!');
    } catch (error: any) {
        res.status(500).send(error.message)
    }
    await connection.close()
}

export const getUserAlbumImageDetails = async function getUserDetails(req: Request, res: Response) {
    const userId = req.params.userId
    const page_limit = parseInt(req.query.limit as string) || 10
    const sort_param = req.query.sort as string || 'title'
    const sort_order = req.query.order as string || 'ASC'
    const connection = await db_connect()
    try {
        sql = `CREATE TABLE IF NOT EXISTS images (
            [albumId] INT,
            [id] INT,
            [title] VARCHAR NULL,
            [url] VARCHAR (300)
            )`;

        await connection.run(sql)
        // sql = `INSERT INTO images (albumId,id,title,url) VALUES (?,?,?,?)`;
        // await connection.run(sql, [42,4002,"Whoopty",'http://www.sample.edu/?canvas=earth&relation=cap'], (err: { message: any; }) => {
        //     if (err) throw new Error(err.message);
        // })
        const details = await connection.all(
            `SELECT distinct i.*,a.userId FROM images i
            INNER JOIN albums a ON i.albumId = a.id
            INNER JOIN users u ON a.userId = u.id 
            where u.id = ${userId} 
            ORDER BY ${sort_param} ${sort_order}
            LIMIT ${page_limit}
        `)
        if (details.length > 0) {
            res.status(200).send(details)
        }
        else res.status(400).send('Image details Not Found. Please check Input Parameters!');
    } catch (error: any) {
        res.status(500).send(error.message)
    }
    await connection.close()
}

module.exports = { getUserDetails, getUserAndAlbumDetails, getUserAlbumImageDetails }