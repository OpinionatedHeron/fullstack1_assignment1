import { userMemStore } from "./mem/user-mem-store.js";
import { folderMemStore } from "./mem/folder-mem-store.js";
import { locationMemStore } from "./mem/location-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { folderJsonStore } from "./json/folder-json-store.js";
import { locationJsonStore } from "./json/location-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { folderMongoStore } from "./mongo/folder-mongo-store.js";

export const db = {
  userStore: null,
  folderStore: null,
  locationStore: null,

  init(storeType) {
    switch(storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.folderStore = folderJsonStore;
        this.locationStore = locationJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.folderStore = folderMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.folderStore = folderMemStore;
        this.locationStore = locationMemStore;
    }
  },
};
