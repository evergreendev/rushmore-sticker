'use server'
import mysql from 'mysql2/promise'

const createConnection = async () => {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || ""),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })
}

export async function addEntry(name:string, ageDivision:string, teamName:string, numberOfStickers:string) {
    try {
        const db = await createConnection();

        const sql = 'INSERT INTO sticker_entries (name,age_division,team_name,number_of_stickers) VALUES (?,?,?,?)';
        const values = [name, ageDivision, teamName, numberOfStickers];

        const [result] = await db.execute(sql, values);

        await db.end();

        return "Success";

    } catch (e:any){

        return {
            message: e.message,
            errno: e.errno,
        }
    }
}