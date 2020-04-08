import mongoose from "mongoose";

const connection = {};

const connectDb = async () => {
  // existing connection
    if (connection.isConnected) {
    console.log("using existing connection");
    return;
  }
  // new connection
  const db = await mongoose.connect(process.env.MONGO_SRV, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("db connected");
  connection.isConnected = db.connections[0].readyState;
};

export default connectDb