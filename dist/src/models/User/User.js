"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const moment_1 = __importDefault(require("moment"));
const User_schema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: true,
        default: moment_1.default().format("YYYY-MM-DD/HH:mm:ZZ")
    },
    role: {
        type: String,
        default: "admin",
        enum: ["user", "moderator", "admin", "root"]
    },
    updated_at: {
        type: String,
        required: true,
        default: moment_1.default().format("YYYY-MM-DD/HH:mm:ZZ")
    },
    created_by: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "user"
        // required: true
    },
    updated_by: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "user"
        // required: true
    },
    location: {
        country: {
            type: String
        },
        region: {
            type: String
        },
        city: {
            type: String
        },
        timezone: {
            type: String
        },
        ll: {
            type: Array
        }
    }
});
// User_schema.pre("save", function(next) {
//   if (this.isModified("password")) {
//     console.log(this.get("password"));
//     bc.genSalt(20, (err, salt) => {
//       bc.hash(this.get("password"), salt, (err, hash) => {
//         if (err) {
//           console.log({
//             err,
//             mensaje: "Error al encriptar la password"
//           });
//         } else {
//           console.log(hash);
//           this.set({ password: hash });
//           next();
//         }
//       });
//     });
//   } else {
//     console.log(" no modificado");
//     next();
//   }
// });
User_schema.statics.check_email_availability = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let find_email = yield this.findOne({ email });
            if (!find_email) {
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        }
        catch (error) {
            return Promise.reject(error);
        }
    });
};
//? user exist in the DB
User_schema.statics.user_exist = function (username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user_finded = yield this.findOne({ username });
            if (user_finded) {
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        }
        catch (error) {
            return Promise.reject(error);
        }
    });
};
User_schema.statics.user_or_email_registered = function (user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let resultado = yield this.findOne({
                $or: [{ username: user }, { email: user }]
            });
            if (resultado) {
                return Promise.resolve(true);
            }
            else {
                return Promise.resolve(false);
            }
        }
        catch (error) {
            return Promise.reject(error);
        }
    });
};
User_schema.statics.email_is_registered = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let resultado = yield this.findOne({ email });
            if (resultado) {
                return Promise.resolve(true);
            }
            else {
                return Promise.resolve(false);
            }
        }
        catch (error) {
            return Promise.reject(error);
        }
    });
};
User_schema.statics.checkPassword = function (email, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let resultado = yield this.findOne({
                $or: [
                    {
                        email
                    },
                    {
                        username: email
                    }
                ]
            });
            if (!!resultado) {
                let comparacion = yield bcrypt_1.default.compare(pass, resultado.password);
                if (!!comparacion && !!resultado) {
                    return Promise.resolve(true);
                }
                else {
                    return Promise.resolve(false);
                }
            }
            else {
                return Promise.resolve(new Error("The email is not registered"));
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
};
User_schema.statics.update_password = function (email, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            bcrypt_1.default.genSalt(10, (err, salt) => __awaiter(this, void 0, void 0, function* () {
                bcrypt_1.default.hash(pass, salt, (err, hash) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log(hash);
                        let nuevo = yield this.findOneAndUpdate({ email }, { password: hash }, {
                            useFindAndModify: false
                        });
                        if (nuevo) {
                            return Promise.resolve(nuevo);
                        }
                        else {
                            throw Error("User not found");
                        }
                    }
                }));
            }));
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
};
const user_model = mongoose_1.default.model("user", User_schema);
exports.default = user_model;
//# sourceMappingURL=User.js.map