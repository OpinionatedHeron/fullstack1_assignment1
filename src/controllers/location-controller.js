import { LocationSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const locationController = {
  index: {
    handler: async function (request, h) {
      const folder = await db.folderStore.getFolderById(request.params.id);
      const location = await db.locationStore.getLocationById(request.params.locationid);
      const viewData = {
        title: "Edit Location",
        folder: folder,
        location: location,
      };
      return h.view("location-view", viewData);
    },
  },

  update: {
    validate: {
      payload: LocationSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("location-view", { title: "Edit location error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.locationid);
      const newLocation = {
        title: request.payload.title,
        category: request.payload.artist,
        description: request.request.payload.duration,
      };
      await db.locationStore.updateLocation(location, newLocation);
      return h.redirect(`/folder/${request.params.id}`);
    },
  },
};
