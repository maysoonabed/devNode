import express from "express";

const app = express();

app.post('/', (req, res) => {
    console.log("POST request")
})

app.get('/', (req, res) => {
    console.log(Date());
    res.send("GET request")
})

app.put('/', (req, res) => {

})

app.delete('/', (req, res) => {

})

app.patch('/', (req, res) => {
    
})

app.listen(3000, () => {
    console.log("server is listening on port 3000");
})