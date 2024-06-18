import express from 'express'

import {getRecords, getRecord, createRecord} from './database.js'

const app = express()

app.use(express.json())

import cors from "cors"
app.use(cors())

//Use static files in /public folder
app.use(express.static('public'))

app.get("/", (req, res) => {
    res.sendFile("/index.html")
})

//Use a button to get records and put them in a table

app.get("/exercise_record", async (req, res) => {
    const records = await getRecords()
    res.send(records)
})


app.get("/exercise_record/:id", async (req, res) => {
    const id = req.params.id
    const record = await getRecord(id)
    res.send(record)
})

app.post("/exercise_record", async (req, res) => {
    const { exerciseName, weight, sets, reps } = req.body
    const record = await createRecord(exerciseName, weight, sets, reps)
    res.status(201).send(record)
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send("Something broke!")
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})

