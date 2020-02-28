const dotenv = require("dotenv");
dotenv.config({ path: ".env.dev" });
const connect_db = require("../src/DB/index").default;

test("The database is connected succesfully", async () => {
  let msg = await connect_db();
  console.log(msg);

  await expect(connect_db()).resolves.toEqual({
    msg: "Data base conected"
  });
});
