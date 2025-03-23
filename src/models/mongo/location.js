import Mongoose from "mongoose";

const { Schema } = Mongoose;

const locationSchema = new Schema({
  title: String,
  category: String,
  description: String,
  folderid: {
    type: Schema.Types.ObjectId,
    ref: "Folder",
  },
});

export const Location = Mongoose.model("Location", locationSchema);
