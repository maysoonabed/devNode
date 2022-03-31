import express from "express";

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const users = [
    {
        id: 1,
        name: 'John',
        profile: {
            address1: 'address 1',
            address2: 'address 2'
        }
    },
    {
        id: 2,
        name: 'Doe',
        profile: {
            address1: 'address 3',
            address2: 'address 4'
        }
    },
    {
        id: 3,
        name: 'mark',
        profile: {
            address1: 'address 5',
            address2: 'address 6'
        }
    }
]

app.post('/', (req, res) => {
    console.log("POST request")
})

app.get('/', (req, res) => {
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