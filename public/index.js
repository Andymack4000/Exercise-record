//import { getRecords } from "../database"

const searchField = document.getElementById("searchField")
//searchField.addEventListener()

//GET RECORDS BUTTONS
const button = document.getElementById("button")
const recordsTable = document.getElementById("table")

//CREATE RECORD BUTTONS
const createRecordButton = document.getElementById("createRecordButton")

createRecordButton.addEventListener("click", () => {
    console.log("create Record buttn working")
    createRecordForm()
})

const createRecordForm = () => {
    let form = 
    `
    <form id="recordForm">
        <table>
        <tr>
        <th>Exercise Name</th>
        <th>Weight</th>
        <th>Sets</th>
        <th>Reps</th>
        <th>Comments</th>
        </tr>
        <tr>
        <td><input id="exerciseName"></td>
        <td><input id="weight" type="number"></td>
        <td><input id="sets" type="number"></td>
        <td><input id="reps" type="number"></td>
        <td><input id="comments"></td>
        </tr>
        <input type="submit" value="Create Record">
    </form>`
    recordsTable.innerHTML = form
    let recordForm = document.getElementById("recordForm")
    let weight = document.getElementById("weight")
    let sets = document.getElementById("sets")
    let reps = document.getElementById("reps")
    let comments = document.getElementById("comments")

    recordForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        let tableValues = {
            "Exercise Name" : exerciseName.value,
            "weight": weight.value,
            "sets": sets.value,
            "reps": reps.value,
            "comments": comments.value  
        }
        console.log(tableValues)
        inputDataIntoDatabase(tableValues)
    })
    
}

     
function inputDataIntoDatabase (tableValues) {
    return fetch('http://127.0.0.1:8080/exercise_record', {
            method: 'POST',
            body: JSON.stringify(tableValues),
            headers: {
                'Content-type': 'application/json'
            },
        }).then((response) => response.json())
}

button.addEventListener("click", async () => {
    console.log("clicked")
    getRecords()
})

async function getRecords() {
    console.log("getRecords working?")
    const response = await fetch("http://127.0.0.1:8080/exercise_record")
    const data = await response.json()
    createTable(data)
}

const createTable = (data) => {
    console.log("createTable working")
    let table = `
        <table>
        <tr>
        <th>Exercise Name</th>
        <th>Weight</th>
        <th>Sets</th>
        <th>Reps</th>
        <th>Comments</th>
        </tr>`
    data.forEach(item => {
        table += 
        ` 
        <tr>
        <td>${item.exercise_name}</td>
        <td>${item.weight_in_kgs}</td>
        <td>${item.set_num}</td>
        <td>${item.reps}</td>
        <td>${item.notes || ""}</td>
        </tr>
        `
    })

    const newBtn = document.createElement("button")
    const newContent = document.createTextNode("Clear Records");
    newBtn.appendChild(newContent)
    document.body.insertBefore(newBtn, recordsTable)

    table += `
        </table>
        `
    recordsTable.innerHTML = table
    console.log("button part working")
    //const btn = document.getElementById("clear")
    newBtn.addEventListener("click", () => {
        console.log("deleteButton working?")
        clearRecords()
    })
    
}
    const clearRecords = () => {
        console.log("clearReords working?")

        //This might need looking at...
        window.location.reload()
        //recordsTable.removeChild(newBtn)
}

//CREATE A NEW RECORD

