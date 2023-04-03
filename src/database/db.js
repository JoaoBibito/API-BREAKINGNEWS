import mongoose from 'mongoose';

const connectDatabase = () => {
  console.log("Wait connecting to the database");

  mongoose.connect(`mongodb+srv://joaoBibito:${process.env.MONGODB_PASS}@clusterbreakingnews.umxqlfh.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch((error) => console.log(error))
}

export default connectDatabase