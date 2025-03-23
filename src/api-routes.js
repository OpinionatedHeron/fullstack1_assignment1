import { userApi } from "./api/user-api.js";
import { folderApi } from "./api/folder-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/folders", config: folderApi.create },
  { method: "DELETE", path: "/api/folders", config: folderApi.deleteAll },
  { method: "GET", path: "/api/folders", config: folderApi.find },
  { method: "GET", path: "/api/folders/{id}", config: folderApi.findOne },
  { method: "DELETE", path: "/api/folders/{id}", config: folderApi.deleteOne },
];
