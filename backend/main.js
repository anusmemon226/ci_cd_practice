require("dotenv").config();
const express = require("express")
const http = require("http");
const { neon } = require("@neondatabase/serverless");
const app = express()
const sql = neon(process.env.DATABASE_URL);
const cors = require('cors');
app.use(express.json())
app.use(cors())

async function insertData(data) {
    const { item, status } = data
    try {
        const result = await sql`
      INSERT INTO todo_items (todo_item, status) VALUES(${item}, ${status}) RETURNING *;
    `;

        console.log('Data inserted successfully:', result);
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

async function getData(){
    try{
        const result = await sql`SELECT * FROM todo_items`
        if(result){
            return result
        }
    }catch(error){
        console.error("Error Fetching Data", error)
    }
}

app.get("/getData", async (req, resp) => {
    const res = await getData()
    resp.send({data:res,status:"success"})
})

app.post("/insertData", (req, resp) => {
    insertData(req.body)
    resp.send({status:"success"})
})

app.listen(5000, () => {
    console.log(5000, "Server Running...!")
})