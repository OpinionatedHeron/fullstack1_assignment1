import axios from "axios";
import { grog, serviceUrl } from "../fixtures.js";

export const placemarkService = {
  placemarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placemarkUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placemarkUrl}/api/users`);
    return res.data;
  },

  async createFolder(folder) {
    const res = await axios.post(`${this.placemarkUrl}/api/folders`, folder);
    return res.data;
  },

  async deleteAllFolders() {
    const response = await axios.delete(`${this.placemarkUrl}/api/folders`);
    return response.data;
  },

  async deleteFolder(id) {
    const response = await axios.delete(`${this.placemarkUrl}/api/folders/${id}`);
    return response;
  },

  async getAllFolders() {
    const res = await axios.get(`${this.placemarkUrl}/api/folders`);
    return res.data;
  },

  async getFolder(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/folders/${id}`);
    return res.data;
  },

  async getAllLocations() {
    const res = await axios.get(`${this.placemarkUrl}/api/locations`);
    return res.data;
  },

  async createLocation(id, location) {
    const res = await axios.post(`${this.placemarkUrl}/api/folders/${id}/locations`, location);
    return res.data;
  },

  async deleteAllLocations() {
    const res = await axios.delete(`${this.placemarkUrl}/api/locations`);
    return res.data;
  },

  async getLocation(id) {
    const res = await axios.get(`${this.placemarkUrl}/api/locations/${id}`);
    return res.data;
  },

  async deleteLocation(id) {
    const res = await axios.delete(`${this.placemarkUrl}/api/locations/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.placemarkUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};
