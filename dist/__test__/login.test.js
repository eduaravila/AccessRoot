var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: ".env.dev" });
const connect_db = require("../src/DB/index").default;
test("The database is connected succesfully", (done) => __awaiter(this, void 0, void 0, function* () {
    try {
        let msg = yield connect_db();
        console.log(msg);
        yield expect(connect_db()).resolves.toEqual({
            msg: "Data base conected"
        });
        done();
    }
    catch (error) {
        done(error);
    }
}));
afterAll((done) => __awaiter(this, void 0, void 0, function* () {
    yield mongoose.connection.close();
    done();
}));
//# sourceMappingURL=login.test.js.map