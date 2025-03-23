import Boom from "@hapi/boom";
import { IdSpec, FolderArraySpec, FolderSpec, FolderSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const folderApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const folders = await db.folderStore.getAllFolders();
        return folders;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: FolderArraySpec, failAction: validationError },
    description: "Get all folders",
    notes: "Returns all folders",
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const folder = await db.folderStore.getFolderById(request.params.id);
        if (!folder) {
          return Boom.notFound("No Folder with this id");
        }
        return folder;
      } catch (err) {
        return Boom.serverUnavailable("No Folder with this id");
      }
    },
    tags: ["api"],
    description: "Find a Folder",
    notes: "Returns a folder",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: FolderSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const folder = request.payload;
        const newFolder = await db.folderStore.addFolder(folder);
        if (newFolder) {
          return h.response(newFolder).code(201);
        }
        return Boom.badImplementation("error creating folder");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Folder",
    notes: "Returns the newly created folder",
    validate: { payload: FolderSpec, failAction: validationError },
    response: { schema: FolderSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const folder = await db.folderStore.getFolderById(request.params.id);
        if (!folder) {
          return Boom.notFound("No Folder with this id");
        }
        await db.folderStore.deleteFolderById(folder._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Folder with this id");
      }
    },
    tags: ["api"],
    description: "Delete a folder",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.folderStore.deleteAllFolders();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all FolderApi",
  },
};
