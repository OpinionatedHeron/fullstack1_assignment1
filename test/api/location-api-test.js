import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { grog, dublin, testFolders, testLocations, dublinCastle } from "../fixtures.js";

suite("Location API tests", () => {
  let user = null;
  let kilkennyFaves = null;

  setup(async () => {
    await placemarkService.deleteAllFolders();
    await placemarkService.deleteAllUsers();
    await placemarkService.deleteAllLocations();
    user = await placemarkService.createUser(grog);
    dublin.userid = user._id;
    kilkennyFaves = await placemarkService.createFolder(dublin);
  });

  teardown(async () => {});

  test("create location", async () => {
    const returnedLocation = await placemarkService.createLocation(kilkennyFaves._id, dublinCastle);
    assertSubset(dublinCastle, returnedLocation);
  });

  test("create Multiple locations", async () => {
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createLocation(kilkennyFaves._id, testLocations[i]);
    }
    const returnedLocations = await placemarkService.getAllLocations();
    assert.equal(returnedLocations.length, testLocations.length);
    for (let i = 0; i < returnedLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const location = await placemarkService.getLocation(returnedLocations[i]._id);
      assertSubset(location, returnedLocations[i]);
    }
  });

  test("Delete LocationApi", async () => {
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createLocation(kilkennyFaves._id, testLocations[i]);
    }
    let returnedLocations = await placemarkService.getAllLocations();
    assert.equal(returnedLocations.length, testLocations.length);
    for (let i = 0; i < returnedLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const location = await placemarkService.deleteLocation(returnedLocations[i]._id);
    }
    returnedLocations = await placemarkService.getAllLocations();
    assert.equal(returnedLocations.length, 0);
  });

  test("denormalised folder", async () => {
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createLocation(kilkennyFaves._id, testLocations[i]);
    }
    const returnedFolder = await placemarkService.getFolder(kilkennyFaves._id);
    assert.equal(returnedFolder.locations.length, testLocations.length);
    for (let i = 0; i < testLocations.length; i += 1) {
      assertSubset(testLocations[i], returnedFolder.locations[i]);
    }
  });
});
