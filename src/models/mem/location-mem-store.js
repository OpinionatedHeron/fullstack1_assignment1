import { v4 } from "uuid";

let locations = [];

export const locationMemStore = {
  async getAllLocations() {
    return locations;
  },

  async addLocation(folderId, location) {
    location._id = v4();
    location.folderid = folderId;
    locations.push(location);
    return location;
  },

  async getLocationsByFolderId(id) {
    return locations.filter((location) => location.folderid === id);
  },

  async getLocationById(id) {
    return locations.find((location) => location._id === id);
  },

  async getFolderLocations(folderId) {
    return locations.filter((location) => location.folderid === folderId);
  },

  async deleteLocation(id) {
    const index = locations.findIndex((location) => location._id === id);
    locations.splice(index, 1);
  },

  async deleteAllLocations() {
    locations = [];
  },

  async updateLocation(location, updatedLocation) {
    location.title = updatedLocation.title;
    location.category = updatedLocation.category;
    location.description = updatedLocation.description;
  },
};
