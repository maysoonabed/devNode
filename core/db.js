import mongoose from "mongoose";

export default async function connect() {
    await mongoose.connect('mongodb://admin:password@mongodb:27017')
    //await mongoose.connect('mongodb+srv://maysoon:tzRriBReeZPmXJUH@cluster0.q7elu.mongodb.net/?retryWrites=true&w=majority')

}