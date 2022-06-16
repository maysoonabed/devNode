import mongoose from 'mongoose'
import Ticket from './Ticket'

const storySchema = Ticket.discriminator('story', new mongoose.Schema({

}))

export default storySchema