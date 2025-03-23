import { Location } from "./location.js";

export const locationMongoStore = {
    async getLocationsByFolderId(id) {
        const locations = await Location.find({ folderid: id }).lean();
        return locations;
    },
};