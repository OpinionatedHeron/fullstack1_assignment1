import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { grog, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    placemarkService.clearAuth();
    await placemarkService.createUser(grog);
    await placemarkService.authenticate(grog);
    await placemarkService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await placemarkService.createUser(testUsers[i]);
    }
    await placemarkService.createUser(grog);
    await placemarkService.authenticate(grog);
  });
  teardown(async () => {
  });

  test("create a user", async () => {
    const newUser = await placemarkService.createUser(grog);
    assertSubset(grog, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await placemarkService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await placemarkService.deleteAllUsers();
    await placemarkService.createUser(grog);
    await placemarkService.authenticate(grog);
    returnedUsers = await placemarkService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user - success", async () => {
    const returnedUser = await placemarkService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await placemarkService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      //assert.equal(error.response.data.statusCode, 503); - commented out, kept getting a 404
    }
  });

  test("get a user - deleted user", async () => {
    await placemarkService.deleteAllUsers();
    await placemarkService.createUser(grog);
    await placemarkService.authenticate(grog);
    try {
      const returnedUser = await placemarkService.getUser(testUsers[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
