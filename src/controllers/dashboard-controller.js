import { options } from "joi";
import { db } from "../models/db.js";
import { FolderSpec } from "../models/joi-schemas.js";

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
    validate: {
      payload: FolderSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Folder error", errors: error.details }).takeover().code(400);
      },
    },
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
