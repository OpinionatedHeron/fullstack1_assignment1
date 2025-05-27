import Mongoose from "mongoose";

const { Schema } = Mongoose;

const locationSchema = new Schema({
  title: String,
  category: String,
  description: String,
  latitude: Number,
  longitude: Number,
  folderid: {
    type: Schema.Types.ObjectId,
    ref: "Folder",
  },
});

export const Location = Mongoose.model("Location", locationSchema);
