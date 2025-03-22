import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const folders = await db.folderStore.getAllFolders(loggedInUser._id);
      const viewData = {
        title: "PlaceMark Dashboard",
        user: loggedInUser,
        folders: folders,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addFolder: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newFolder = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.folderStore.addFolder(newFolder);
      return h.redirect("/dashboard");
    },
  },

  deleteFolder: {
    handler: async function (request, h) {
      const folder = await db.folderStore.getFolderById(request.params.id);
      await db.folderStore.deleteFolderById(folder._id);
      return h.redirect("/dashboard");
    },
  },
};
