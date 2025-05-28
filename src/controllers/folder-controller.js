import { validate } from "uuid";
import { db } from "../models/db.js";
import { LocationSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

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

  uploadImage: {
    handler: async function (request, h) {
      try {
        console.log("Uploade image request received for folder:", request.params.id);

        const folder = await db.folderStore.getFolderById(request.params.id);
        if (!folder) {
          console.log("Folder not found:", request.params.id);
          return h.response({ error: "Folder not found"}).code(404);
        }

        const file = request.payload.imagefile;
        console.log.apply("File received:", file ? "Yes" : "No");

        if (!file || Object.keys(file).length === 0) {
          console.log("No file in request");
          return h.response({ error: "No filde provided"}).code(400);
        }

        console.log("Uploading to Cloudinary...");
        const url = await imageStore.uploadImage(file);

        if (!url) {
          console.log("Cloudinary upload failed");
          return h.response({ error: "Upload failed" }).code(500);
        }

        console.log("Image uploaded successfully:", url);
        folder.img = url;
        await db.folderStore.updateFolder(folder);

        return h.response({
          success: true,
          url: url,
          message: "Image uploaded successfully"
        }).code(200);

      } catch (err) {
        console.error("Upload error:", err);
        return h.response({
          error: "Upload failed",
          message: err.message
        }).code(500);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};
