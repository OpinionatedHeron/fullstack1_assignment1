import { v4 } from "uuid";

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
    return folders.find((folder) => folder._id === id);
  },

  async deleteFolderById(id) {
    const index = folders.findIndex((folder) => folder._id === id);
    folders.splice(index, 1);
  },

  async deleteAllFolders() {
    folders = [];
  },
};
