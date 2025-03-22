import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { locationJsonStore } from "./location-json-store.js";

export const folderJsonStore = {
    async getAllFolders() {
      await db.read();
      return db.data.folders;
    },

    async addFolder(folder) {
        await db.read();
        folder._id = v4();
        db.data.folders.push(folder);
        await db.write();
        return folder;
    },

    async getFolderById(id) {
        await db.read();
        let list = db.data.folders.find((folder) => folder._id === id);
        if (list) {
            list.locations = await locationJsonStore.getLocationsByFolderId(list._id);
        } else {
            list = null;
        }
        return list;
    },

    async getUserFolders(userid) {
        await db.read();
        return db.data.folders.filter((folder) => folder.userid === userid);
    },

    async deleteFolderById(id) {
        await db.read();
        const index = db.data.folders.findIndex((folder) => folder._id === id);
        if (index !== -1) db.data.folders.splice(index, 1);
        await db.write();
    },

    async deleteAllFolders() {
        db.data.folders = [];
        await db.write();
    },
};