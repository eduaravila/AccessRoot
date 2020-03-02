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
const randomatic_1 = __importDefault(require("randomatic"));
const apollo_server_express_1 = require("apollo-server-express");
const User_1 = __importDefault(require("../models/User/User"));
const PreUser_1 = __importDefault(require("../models/User/PreUser"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const mailer_1 = require("../utils/mailer");
const PreUser_2 = __importDefault(require("../models/User/PreUser"));
exports.register = ({ username, password, email }, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { country = " ", region = "", city = "", timezone = "", ll = [] } = context.ipInfo;
        let new_user = new PreUser_1.default({
            username,
            email,
            password,
            location: {
                country,
                region,
                city,
                timezone,
                ll
            }
        });
        //? random verification code
        let code = randomatic_1.default("0", 6);
        let token = new jwt_1.default({ username, code });
        yield token.create_token("15m");
        yield mailer_1.verification_email(process.env.ADMIN_EMAIL, username, code);
        yield new_user.save();
        //? save the user in a temporal table
        return Promise.resolve(token.token);
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError(error);
    }
});
exports.verifyAccount = ({ code, token }, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let localToken = yield jwt_1.default.validateToken(token);
        let tokenData = yield jwt_1.default.decrypt_data(localToken)();
        let userInfo = yield PreUser_1.default.findOne({
            username: tokenData.username
        });
        if (!userInfo) {
            throw new Error("AUTORIZATION ERROR");
        }
        if (code === tokenData.code) {
            let { username, email, password, location } = userInfo;
            yield new User_1.default({
                username,
                email,
                password,
                location
            }).save();
            yield PreUser_1.default.deleteOne({ username });
            return Promise.resolve("Welcome to ecolote");
        }
        return Promise.reject("INVALID-CODE");
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError(error);
    }
});
exports.resendVerifyCode = (username, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let code = randomatic_1.default("0", 6);
        let user = yield PreUser_1.default.findOne({ username });
        let { email } = user;
        let token = new jwt_1.default({ username, code });
        yield token.create_token("15m");
        yield mailer_1.verification_email(process.env.ADMIN_EMAIL, username, code);
        return Promise.resolve(token.token);
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError(error);
    }
});
exports.login = ({ user, password }, { body }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = yield User_1.default.findOne({
            $or: [{ username: user }, { email: user }]
        });
        let token = new jwt_1.default({ userId: userId._id.toString(), role: userId.role });
        yield token.create_token("21d");
        return Promise.resolve(token.token);
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError(error);
    }
});
exports.restorePasswordCode = (email, { body }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let code = randomatic_1.default("0", 6);
        let user = yield User_1.default.findOne({ email });
        console.log(body);
        if (!user) {
            throw new Error("AUTORIZATION ERROR");
        }
        let { username } = user;
        let token = new jwt_1.default({ username, code, restore: "true" });
        yield token.create_token("15m");
        yield mailer_1.password_reset_mail(email, username, code);
        return Promise.resolve(token.token);
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError(error);
    }
});
exports.restorePasswordCompareCode = ({ code, token }, { body }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let localToken = yield jwt_1.default.validateToken(token);
        let tokenData = yield jwt_1.default.decrypt_data(localToken)();
        console.log(code, localToken, tokenData);
        let userInfo = yield User_1.default.findOne({
            username: tokenData.username
        });
        if (!userInfo) {
            throw new Error("AUTORIZATION ERROR");
        }
        if (code === tokenData.code && tokenData.restore === "true") {
            return Promise.resolve("Valid code you can continue 😻");
        }
        return Promise.reject("INVALID-CODE");
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError(error);
    }
});
exports.restorePasswordSetNew = ({ code, token, password }, { body }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let localToken = yield jwt_1.default.validateToken(token);
        let tokenData = yield jwt_1.default.decrypt_data(localToken)();
        let userInfo = yield User_1.default.findOne({
            username: tokenData.username
        });
        if (!userInfo) {
            throw new Error("AUTORIZATION ERROR");
        }
        if (code === tokenData.code && tokenData.restore === "true") {
            yield User_1.default.update_password(userInfo.email, password);
            return Promise.resolve("The password has been changed succesfully 🐲");
        }
        return Promise.reject("INVALID-CODE");
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError(error);
    }
});
exports.deletePreUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userInfo = yield PreUser_2.default.findOneAndDelete({
            username
        });
        return Promise.resolve("Temp account deleted 😊");
    }
    catch (error) {
        throw new apollo_server_express_1.ApolloError(error);
    }
});
//# sourceMappingURL=User.js.map