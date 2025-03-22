import { validate } from "uuid";
import { db } from "../models/db.js";
import { LocationSpec } from "../models/joi-schemas.js";

export const folderController = {
  index: {
    handler: async function (request, h) {
      const folder = await db.folderStore.getFolderById(request.params.id);
      const viewData = {
        title: "Folder",
        folder: folder,
      };
      return h.view("folder-view", viewData);
    },
  },

  addLocation: {
    validate: {
      payload: LocationSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("folder-view", { title: "Add location error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const folder = await db.folderStore.getFolderById(request.params.id);
      const newLocation = {
        title: request.payload.title,
        category: request.payload.category,
        description: request.payload.description,
      };
      await db.locationStore.addLocation(folder._id, newLocation);
      return h.redirect(`/folder/${folder._id}`);
    },
  },

  deleteLocation: {
    handler: async function(request, h) {
      const folder = await db.folderStore.getFolderById(request.params.id);
      await db.locationStore.deleteLocation(request.params.locationid);
      return h.redirect(`/folder/${folder._id}`);
    },
  },
};
