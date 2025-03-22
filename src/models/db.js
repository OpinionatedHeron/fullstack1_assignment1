import { userMemStore } from "./mem/user-mem-store.js";
import { folderMemStore } from "./mem/folder-mem-store.js";
import { locationMemStore } from "./mem/location-mem-store.js";

export const db = {
  userStore: null,
  folderStore: null,

  init() {
    this.userStore = userMemStore;
    this.folderStore = folderMemStore;
    this.locationStore = locationMemStore
  },
};
