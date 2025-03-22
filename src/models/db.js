//import { userMemStore } from "./mem/user-mem-store.js";
//import { folderMemStore } from "./mem/folder-mem-store.js";
//import { locationMemStore } from "./mem/location-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { folderJsonStore } from "./json/folder-json-store.js";
import { locationJsonStore } from "./json/location-json-store.js";

export const db = {
  userStore: null,
  folderStore: null,
  locationStore: null,

  init() {
    this.userStore = userJsonStore;
    this.folderStore = folderJsonStore;
    this.locationStore = locationJsonStore
  },
};
