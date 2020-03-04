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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const User_1 = require("../controllers/User");
const UserSchema_1 = require("../schema/UserSchema");
let RegisterResolver = class RegisterResolver {
    DeletePreUser({ username }) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield User_1.deletePreUser(username);
            return {
                msg,
                code: "200"
            };
        });
    }
    RegisterUser(registerInfo, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(ctx);
            let msg = yield User_1.register(registerInfo, ctx);
            return {
                msg,
                code: "200"
            };
        });
    }
    VerifyAccount(accountInfo, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(ctx);
            let msg = yield User_1.verifyAccount(accountInfo, ctx);
            return {
                msg,
                code: "200"
            };
        });
    }
    RestorePasswordSetNew(passwordResetInfo, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield User_1.restorePasswordSetNew(passwordResetInfo, ctx);
            return {
                msg,
                code: "200"
            };
        });
    }
    ResendVerifyCode({ username }, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield User_1.resendVerifyCode(username, ctx);
            return {
                msg,
                code: "200"
            };
        });
    }
    RestorePasswordCode({ email }, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield User_1.restorePasswordCode(email, ctx);
            return {
                msg,
                code: "200"
            };
        });
    }
    RestorePasswordCompareCode(restoreInfo, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield User_1.restorePasswordCompareCode(restoreInfo, ctx);
            return {
                msg,
                code: "200"
            };
        });
    }
    CheckUserEmailAvailable(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                msg: "User is available",
                code: "200"
            };
        });
    }
    Login(accessInfo, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield User_1.login(accessInfo, ctx);
            return {
                msg,
                code: "200"
            };
        });
    }
};
__decorate([
    type_graphql_1.Mutation(returns => UserSchema_1.SuccessResponse),
    __param(0, type_graphql_1.Arg("preUserInfo", () => UserSchema_1.resendCodeInfo)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserSchema_1.resendCodeInfo]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "DeletePreUser", null);
__decorate([
    type_graphql_1.Mutation(returns => UserSchema_1.SuccessResponse),
    __param(0, type_graphql_1.Arg("registerInfo", () => UserSchema_1.RegisterInfo)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserSchema_1.RegisterInfo, Object]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "RegisterUser", null);
__decorate([
    type_graphql_1.Mutation(returns => UserSchema_1.SuccessResponse),
    __param(0, type_graphql_1.Arg("accountInfo", () => UserSchema_1.verifyAccountInput)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserSchema_1.verifyAccountInput, Object]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "VerifyAccount", null);
__decorate([
    type_graphql_1.Mutation(resturns => UserSchema_1.SuccessResponse),
    __param(0, type_graphql_1.Arg("passwordResetInfo", () => UserSchema_1.passwordResetInfo)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserSchema_1.passwordResetInfo, Object]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "RestorePasswordSetNew", null);
__decorate([
    type_graphql_1.Query(returns => UserSchema_1.SuccessResponse),
    __param(0, type_graphql_1.Arg("resendCodeInfo", () => UserSchema_1.resendCodeInfo)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserSchema_1.resendCodeInfo, Object]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "ResendVerifyCode", null);
__decorate([
    type_graphql_1.Query(returns => UserSchema_1.SuccessResponse),
    __param(0, type_graphql_1.Arg("restorePasswordCodeInput", () => UserSchema_1.restorePasswordCodeInput)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserSchema_1.restorePasswordCodeInput, Object]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "RestorePasswordCode", null);
__decorate([
    type_graphql_1.Query(returns => UserSchema_1.SuccessResponse),
    __param(0, type_graphql_1.Arg("restoreInfo", () => UserSchema_1.verifyAccountInput)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserSchema_1.verifyAccountInput, Object]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "RestorePasswordCompareCode", null);
__decorate([
    type_graphql_1.Query(returns => UserSchema_1.SuccessResponse),
    __param(0, type_graphql_1.Arg("userInfo", () => UserSchema_1.CheckUserEmailAvailabeInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserSchema_1.CheckUserEmailAvailabeInput]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "CheckUserEmailAvailable", null);
__decorate([
    type_graphql_1.Query(returns => UserSchema_1.SuccessResponse),
    __param(0, type_graphql_1.Arg("accessInfo", () => UserSchema_1.LoginInfo)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserSchema_1.LoginInfo, Object]),
    __metadata("design:returntype", Promise)
], RegisterResolver.prototype, "Login", null);
RegisterResolver = __decorate([
    type_graphql_1.Resolver()
], RegisterResolver);
exports.RegisterResolver = RegisterResolver;
//# sourceMappingURL=UserResolver.js.map