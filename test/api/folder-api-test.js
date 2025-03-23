import { EventEmitter } from "events";
import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { grog, dublin, testFolders } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Folder API tests", () => {
  let user = null;

  setup(async () => {
    await placemarkService.deleteAllFolders();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(grog);
    dublin.userid = user._id;
  });

  teardown(async () => {});

  test("create folder", async () => {
    const returnedFolder = await placemarkService.createFolder(dublin);
    assert.isNotNull(returnedFolder);
    assertSubset(dublin, returnedFolder);
  });

  test("delete a folder", async () => {
    const folder = await placemarkService.createFolder(dublin);
    const response = await placemarkService.deleteFolder(folder._id);
    assert.equal(response.status, 204);
    try {
      const returnedFolder = await placemarkService.getFolder(folder.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Folder with this id", "Incorrect Response Message");
    }
  });

  test("create multiple folders", async () => {
    for (let i = 0; i < testFolders.length; i += 1) {
      testFolders[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createFolder(testFolders[i]);
    }
    let returnedLists = await placemarkService.getAllFolders();
    assert.equal(returnedLists.length, testFolders.length);
    await placemarkService.deleteAllFolders();
    returnedLists = await placemarkService.getAllFolders();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant folder", async () => {
    try {
      const response = await placemarkService.deleteFolder("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Folder with this id", "Incorrect Response Message");
    }
  });
});
