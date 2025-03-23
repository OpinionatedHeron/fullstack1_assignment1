import { EventEmitter } from "events";
import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testFolders, dublin } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

EventEmitter.setMaxListeners(25);

suite("Folder Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.folderStore.deleteAllFolders();
    for (let i = 0; i < testFolders.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testFolders[i] = await db.folderStore.addFolder(testFolders[i]);
    }
  });

  test("create a folder", async () => {
    const folder = await db.folderStore.addFolder(dublin);
    assertSubset(dublin, folder);
    assert.isDefined(folder._id);
  });

  test("delete all folders", async () => {
    let returnedFolders = await db.folderStore.getAllFolders();
    assert.equal(returnedFolders.length, 3);
    await db.folderStore.deleteAllFolders();
    returnedFolders = await db.folderStore.getAllFolders();
    assert.equal(returnedFolders.length, 0);
  });

  test("get a folder - success", async () => {
    const folder = await db.folderStore.addFolder(dublin);
    const returnedFolder = await db.folderStore.getFolderById(folder._id);
    assertSubset(dublin, folder);
  });

  test("delete One Playist - success", async () => {
    const id = testFolders[0]._id;
    await db.folderStore.deleteFolderById(id);
    const returnedFolders = await db.folderStore.getAllFolders();
    assert.equal(returnedFolders.length, testFolders.length - 1);
    const deletedFolder = await db.folderStore.getFolderById(id);
    assert.isNull(deletedFolder);
  });

  test("get a folder - bad params", async () => {
    assert.isNull(await db.folderStore.getFolderById(""));
    assert.isNull(await db.folderStore.getFolderById());
  });

  test("delete One Folder - fail", async () => {
    await db.folderStore.deleteFolderById("bad-id");
    const allFolders = await db.folderStore.getAllFolders();
    assert.equal(testFolders.length, allFolders.length);
  });
});
