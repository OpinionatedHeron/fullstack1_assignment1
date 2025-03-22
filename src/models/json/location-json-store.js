import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const locationJsonStore = {
  async getAllLocations() {
    await db.read();
    return db.data.locations;
  },

  async addLocation(folderId, location) {
    await db.read();
    location._id = v4();
    location.folderid = folderId;
    db.data.locations.push(location);
    await db.write();
    return location;
  },

  async getLocationsByFolderId(id) {
    await db.read();
    return db.data.locations.filter((location) => location.folderid === id);
  },

  async getLocationById(id) {
    await db.read();
    return db.data.locations.find((location) => location._id === id);
  },

  async deleteLocation(id) {
    await db.read();
    const index = db.data.locations.findIndex((location) => location._id === id);
    db.data.locations.splice(index, 1);
    await db.write();
  },

  async deleteAllLocations() {
    db.data.locations = [];
    await db.write();
  },

  async updateLocation(location, updatedLocation) {
    location.title = updatedLocation.title;
    location.artist = updatedLocation.artist;
    location.duration = updatedLocation.duration;
    await db.write();
  },
};
