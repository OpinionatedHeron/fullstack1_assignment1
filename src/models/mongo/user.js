import Mongoose from "mongoose";

const { Schema } = Mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
});

export const User = Mongoose.model("User", userSchema);
