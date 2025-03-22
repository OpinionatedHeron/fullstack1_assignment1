import { v4 } from "uuid";
import { locationMemStore } from "./location-mem-store.js";

let folders = [];

export const folderMemStore = {
  async getAllFolders() {
    return folders;
  },

  async addFolder(folder) {
    folder._id = v4();
    folders.push(folder);
    return folder;
  },

  async getFolderById(id) {
    const list = folders.find((folder) => folder._id === id);
    list.locations = await locationMemStore.getLocationsByFolderId(list._id);
    return list;
  },

  async getUserFolders(userid) {
    return folders.filter((folder) => folder.userid === userid);
  },

  async deleteFolderById(id) {
    const index = folders.findIndex((folder) => folder._id === id);
    folders.splice(index, 1);
  },

  async deleteAllFolders() {
    folders = [];
  },
};
