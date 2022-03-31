import express from 'express';
const router = express.Router()

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
const authentication = (req, res, next) => {
    // validation
    if (req.isAuthenticated) {
        next()
    } else {
        throw new Error('not authenticated')
    }
}
const autheriztion = (req, res, next) => {
    // validation
    if (req.isAuthorized) {
        next()
    } else {
        throw new Error('not authorized')
    }
    next()
}
const handler = (req, res) => {
    console.log("processing the request")
    users.push(req.body)
    res.send(req.body)
}

router.post('/', authentication, autheriztion, handler)

router.get('/', (req, res) => {
    res.send("GET request")
})

router.put('/', (req, res) => {

})

router.delete('/', (req, res) => {

})

router.patch('/', (req, res) => {

})

export default router