import mongoose from "mongoose"

const connectDatabase = async () => {
  mongoose.connect('mongodb://127.0.0.1:27017/taskmanager', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });

}

export default connectDatabase;