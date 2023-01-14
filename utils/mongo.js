import mongoose from 'mongoose'


async function dbConnect() {
   mongoose.connect(process.env.MONGO_URL)
}

export default dbConnect