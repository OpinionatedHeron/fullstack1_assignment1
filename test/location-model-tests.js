import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testFolders, testLocations, faves, dublin, dublinCastle, testUsers } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

suite("Location Model tests", () => {
    let favesList = null;

    setup(async () => {
        db.init("mongo");
        await db.folderStore.deleteAllFolders();
        await db.locationStore.deleteAllLocations();
        favesList = await db.folderStore.addFolder(faves);
        for (let i = 0; i < testLocations.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testLocations[i] = await db.locationStore.addLocation(favesList._id, testLocations[i]);
        }
    });

    test ("create single location", async () => {
        const dublinList = await db.folderStore.addFolder(dublin);
        const location = await db.locationStore.addLocation(dublinList._id, dublinCastle)
        assert.isNotNull(location._id);
        assertSubset (dublinCastle, location);
    });

    test("get multiple locations", async () => {
        const locations = await db.locationStore.getLocationsByFolderId(favesList._id);
        assert.equal(locations.length, testLocations.length)
    });

    test("delete all locations", async () => {
        const locations = await db.locationStore.getAllLocations();
        assert.equal(testLocations.length, locations.length);
        await db.locationStore.deleteAllLocations();
        const newLocations = await db.locationStore.getAllLocations();
        assert.equal(0, newLocations.length);
    });

    test("get a location - success", async () => {
        const dublinList = await db.folderStore.addFolder(dublin);
        const location = await db.locationStore.addLocation(dublinList._id, dublinCastle)
        const newLocation = await db.locationStore.getLocationById(location._id);
        assertSubset (dublinCastle, newLocation);
    });

    test("delete One location - success", async () => {
        await db.locationStore.deleteLocation(testLocations[0]._id);
        const locations = await db.locationStore.getAllLocations();
        assert.equal(locations.length, testFolders.length - 1);
        const deletedLocation = await db.locationStore.getLocationById(testLocations[0]._id);
        assert.isNull(deletedLocation);
    });

    test("get a track - bad params", async () => {
        assert.isNull(await db.locationStore.getLocationById(""));
        assert.isNull(await db.locationStore.getLocationById());
    });

    test("delete one location - fail", async () =>{
        await db.locationStore.deleteLocation("bad-id");
        const locations = await db.locationStore.getAllLocations();
        assert.equal(locations.length, testFolders.length);
    });
});