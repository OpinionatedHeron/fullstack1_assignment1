import Mongoose from "mongoose";
import { Folder } from "./folder.js";
import { locationMongoStore } from "./location-mongo-store.js";

export const folderMongoStore = {
    async getAllFolders() {
        const folders = await Folder.find().lean();
        return folders;
    },

    async getFolderById(id) {
        if (Mongoose.isValidObjectId(id)) {
            const folder = await Folder.findOne({ _id: id}).lean();
            if (folder) {
                folder.locations = await locationMongoStore.getLocationsByFolderId(folder._id);
            }
            return folder;
        }
        return null;
    },

    async addFolder(folder) {
        const newFolder = new Folder(folder);
        const folderObj = await newFolder.save();
        return this.getFolderById(folderObj._id);
    },

    async getUserFolders(id) {
        const folder = await Folder.find({ userid: id }).lean();
        return folder;
    },

    async deleteFolderById(id) {
        try {
            await Folder.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAllFolders() {
        await Folder.deleteMany({});
    },
};