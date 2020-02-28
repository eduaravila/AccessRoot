"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
const User_1 = __importDefault(require("./User"));
const PReUser_schema = new mongoose_1.default.Schema({
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: "15m" } // ? deleted in automatic if the user not continue with the registration process
    },
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
PReUser_schema.pre("save", function (next) {
    if (this.isModified("password")) {
        console.log(this.get("password"));
        bcrypt_1.default.genSalt(10, (err, salt) => {
            bcrypt_1.default.hash(this.get("password"), salt, (err, hash) => {
                if (err) {
                    console.log({
                        err,
                        mensaje: "Error al encriptar la password"
                    });
                }
                else {
                    console.log(hash);
                    this.set({ password: hash });
                    next();
                }
            });
        });
    }
    else {
        console.log(" no modificado");
        next();
    }
});
PReUser_schema.statics.check_email_availability = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let find_email = yield this.findOne({ email });
            let find_email_user = yield User_1.default.findOne({ email });
            if (!find_email && !find_email_user) {
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
PReUser_schema.statics.user_exist = function (username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user_finded = yield this.findOne({ username });
            let user_finded_user = yield User_1.default.findOne({ username });
            if (user_finded || user_finded_user) {
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        }
        catch (error) {
            return Promise.reject(error);
        }
    });
};
PReUser_schema.statics.email_is_registered = function (email) {
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
const pre_user_model = mongoose_1.default.model("pre_user", PReUser_schema);
exports.default = pre_user_model;
//# sourceMappingURL=PreUser.js.map