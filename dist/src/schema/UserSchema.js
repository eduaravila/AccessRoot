"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const UserValidations_1 = require("../utils/validators/UserValidations");
const User_1 = __importDefault(require("../models/User/User"));
let SuccessResponse = class SuccessResponse {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], SuccessResponse.prototype, "msg", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], SuccessResponse.prototype, "code", void 0);
SuccessResponse = __decorate([
    type_graphql_1.ObjectType()
], SuccessResponse);
exports.SuccessResponse = SuccessResponse;
let verifyAccountInput = class verifyAccountInput {
};
__decorate([
    type_graphql_1.Field(type => String),
    class_validator_1.MinLength(6),
    __metadata("design:type", String)
], verifyAccountInput.prototype, "code", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    class_validator_1.IsJWT(),
    __metadata("design:type", String)
], verifyAccountInput.prototype, "token", void 0);
verifyAccountInput = __decorate([
    type_graphql_1.InputType()
], verifyAccountInput);
exports.verifyAccountInput = verifyAccountInput;
let RegisterInfo = class RegisterInfo {
};
__decorate([
    type_graphql_1.Field(type => String),
    class_validator_1.MinLength(1),
    class_validator_1.MaxLength(15),
    UserValidations_1.IsUserAvailable({ message: "$value is already registered! 🙅‍♂️" }),
    __metadata("design:type", String)
], RegisterInfo.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    class_validator_1.Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,}/, {
        message: "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number ❗"
    }),
    __metadata("design:type", String)
], RegisterInfo.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    UserValidations_1.isAdminPassword({ message: "$value this value is not valid! 💁‍♀️" }),
    __metadata("design:type", String)
], RegisterInfo.prototype, "adminPassword", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    class_validator_1.IsEmail(),
    UserValidations_1.IsEmailAvailable({ message: "$value is already registered! 💁‍♀️" }),
    __metadata("design:type", String)
], RegisterInfo.prototype, "email", void 0);
RegisterInfo = __decorate([
    type_graphql_1.InputType()
], RegisterInfo);
exports.RegisterInfo = RegisterInfo;
let passwordResetInfo = class passwordResetInfo {
};
__decorate([
    type_graphql_1.Field(type => String),
    class_validator_1.MinLength(6),
    __metadata("design:type", String)
], passwordResetInfo.prototype, "code", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    class_validator_1.IsJWT(),
    __metadata("design:type", String)
], passwordResetInfo.prototype, "token", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    class_validator_1.Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,}/, {
        message: "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number ❗"
    }),
    __metadata("design:type", String)
], passwordResetInfo.prototype, "password", void 0);
passwordResetInfo = __decorate([
    type_graphql_1.InputType()
], passwordResetInfo);
exports.passwordResetInfo = passwordResetInfo;
let LoginInfo = class LoginInfo {
};
__decorate([
    type_graphql_1.Field(type => String),
    UserValidations_1.UserIsRegistered({
        message: "$value username | email is not still registered 👎"
    }),
    __metadata("design:type", String)
], LoginInfo.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], LoginInfo.prototype, "password", void 0);
LoginInfo = __decorate([
    type_graphql_1.InputType()
], LoginInfo);
exports.LoginInfo = LoginInfo;
let resendCodeInfo = class resendCodeInfo {
};
__decorate([
    type_graphql_1.Field(type => String),
    UserValidations_1.PreUserIsRegistered({ message: "User is not registered" }),
    __metadata("design:type", String)
], resendCodeInfo.prototype, "username", void 0);
resendCodeInfo = __decorate([
    type_graphql_1.InputType()
], resendCodeInfo);
exports.resendCodeInfo = resendCodeInfo;
let restorePasswordCodeInput = class restorePasswordCodeInput {
};
__decorate([
    type_graphql_1.Field(type => String),
    class_validator_1.IsEmail(),
    UserValidations_1.UserIsRegistered({
        message: "$value username | email is not still registered 👎"
    }),
    __metadata("design:type", String)
], restorePasswordCodeInput.prototype, "email", void 0);
restorePasswordCodeInput = __decorate([
    type_graphql_1.InputType()
], restorePasswordCodeInput);
exports.restorePasswordCodeInput = restorePasswordCodeInput;
let CheckUserEmailAvailabeInput = class CheckUserEmailAvailabeInput {
};
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    class_validator_1.IsEmail(),
    UserValidations_1.IsEmailAvailable({
        message: "$value email  already registered 👎"
    }),
    __metadata("design:type", String)
], CheckUserEmailAvailabeInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    UserValidations_1.IsUserAvailable({
        message: "$value username already registered👎"
    }),
    __metadata("design:type", String)
], CheckUserEmailAvailabeInput.prototype, "username", void 0);
CheckUserEmailAvailabeInput = __decorate([
    type_graphql_1.InputType()
], CheckUserEmailAvailabeInput);
exports.CheckUserEmailAvailabeInput = CheckUserEmailAvailabeInput;
let User = class User {
};
__decorate([
    type_graphql_1.Field(type => String),
    __metadata("design:type", String)
], User.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "created_at", void 0);
__decorate([
    type_graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "updated_at", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], User.prototype, "created_by", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.default.Types.ObjectId)
], User.prototype, "updated_by", void 0);
User = __decorate([
    type_graphql_1.Directive(`@key(fields:"_id")`),
    type_graphql_1.ObjectType()
], User);
exports.User = User;
function resolveUserReference(reference) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield User_1.default.findOne({ _id: reference._id });
        return result;
    });
}
exports.resolveUserReference = resolveUserReference;
//# sourceMappingURL=UserSchema.js.map