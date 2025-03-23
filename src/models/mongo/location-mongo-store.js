import Mongoose from "mongoose";
import { Location } from "./location.js";

export const locationMongoStore = {
  async getAllLocations() {
    const locations = await Location.find().lean();
    return locations;
  },

  async addLocation(folderId, location) {
    location.folderid = folderId;
    const newLocation = new Location(location);
    const locationObj = await newLocation.save();
    return this.getLocationById(locationObj._id);
  },

  async getLocationsByFolderId(id) {
    const locations = await Location.find({ folderid: id }).lean();
    return locations;
  },

  async getLocationById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const location = await Location.findOne({ _id: id }).lean();
      return location;
    }
    return null;
  },

  async deleteLocation(id) {
    try {
      await Location.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllLocations() {
    await Location.deleteMany({});
  },

  async updateLocation(location, updatedLocation) {
    locationDoc.title = updatedLocation.title;
    locationDoc.category = updatedLocation.category;
    locationDoc.description = updatedLocation.description;
    await locationDoc.save();
  },
};
