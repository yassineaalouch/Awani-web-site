// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from 'mongodb'
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}
const uri = process.env.MONGODB_URI || 'mongodb+srv://awaniimlil:awaniPassword123@cluster0.pes38.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const options = {
  serverSelectionTimeoutMS: 20000,
}

let client;
let clientPromise;
try {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }
} catch (error) {
  console.error('Error connecting to MongoDB:', error)
}


export default clientPromise