import Mongoose from "mongoose";

const { Schema } = Mongoose;

const folderSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Folder = Mongoose.model("Folder", folderSchema);
