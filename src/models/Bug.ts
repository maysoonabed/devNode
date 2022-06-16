import mongoose from 'mongoose'
import Ticket from './Ticket'

const bugSchema = Ticket.discriminator('bug', new mongoose.Schema({
    severity: {
        type: String,
        enum: ["Blocker",
            "Critical",
            "Major",
            "Minor",
            "Trivial"
        ]
    },
}))

export default bugSchema