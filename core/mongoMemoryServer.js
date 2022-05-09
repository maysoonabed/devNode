import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongo_memory_server = new MongoMemoryServer({
    instance: { dbName: 'base' },
    binary: { systemBinary: '/usr/bin/mongod' }
})

const mongoose_opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

export const connect = async () => {
    const mongoUri = await mongo_memory_server.getUri();
    await mongoose.connect(mongoUri, mongoose_opts);
}

export const disconnect = async () => {
    await mongoose.disconnect();
    await mongo_memory_server.stop();
}