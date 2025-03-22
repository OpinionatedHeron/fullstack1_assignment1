import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const folders = await db.folderStore.getAllFolders();
      const viewData = {
        title: "PlaceMark Dashboard",
        folders: folders,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addFolder: {
    handler: async function (request, h) {
      const newFolder = {
        title: request.payload.title,
      };
      await db.folderStore.addFolder(newFolder);
      return h.redirect("/dashboard");
    },
  },
};
