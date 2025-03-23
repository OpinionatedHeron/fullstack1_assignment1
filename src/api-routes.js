import { userApi } from "./api/user-api.js";
import { folderApi } from "./api/folder-api.js";
import { locationApi } from "./api/location-api.js"

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

  { method: "GET", path: "/api/locations", config: locationApi.find },
  { method: "GET", path: "/api/locations/{id}", config: locationApi.findOne },
  { method: "POST", path: "/api/folders/{id}/locations", config: locationApi.create },
  { method: "DELETE", path: "/api/locations", config: locationApi.deleteAll },
  { method: "DELETE", path: "/api/locations/{id}", config: locationApi.deleteOne },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
];
