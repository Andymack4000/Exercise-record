//All info on this page was from https://www.youtube.com/watch?v=Hej48pi_lOc&t=1503s

//I need function to delete as well

import mysql from 'mysql2'

//make sure you install dotenv
import dotenv from 'dotenv'
dotenv.config()

//Creates a pool connection to the database - Pool connection is a load of connections in one function?
const pool = mysql.createPool({
    //Use a .env file to store this info
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
//promise allows us to use async operation (check if this is right - near beginning of Video)
}).promise()

export async function getRecords () {
    const [rows] = await pool.query("SELECT * FROM exercise_record")
    return rows
}

//Prepared statement where we use a ? instead of the id as that could lead to SQL injection attacks
export async function getRecord(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM exercise_record
    WHERE id = ?`, [id])

    //SELECT statements always return an array so we need to get the first objest out with rows[0]
    return rows[0]
}

//this function returns the ResultSetHeader object, which we destructure and set to result
export async function createRecord(exerciseName, weight, sets, reps) {
    const [result] = await pool.query(`
        INSERT INTO exercise_record (exercise_name, weight_in_kgs, set_num, reps)
        VALUES (?, ?, ?, ?)`,
        [exerciseName, weight, sets, reps]
    )

    //this brings up ResultSetHeader object, of which insertId is the id for the new row
    const id = result.insertId

    /*If you just want a few items rather than everything, you can return individual properties instead of everything:
    
    Full explanation 16.30 of video*/

    return getRecords(id)
}

//const result = await createRecord("dips", 50, 5, 20)
//console.log(result)

//const record = await getRecord(2)
//console.log(record)