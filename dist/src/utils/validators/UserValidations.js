"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const class_validator_1 = require("class-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const PreUser_1 = __importDefault(require("../../models/User/PreUser"));
const User_1 = __importDefault(require("../../models/User/User"));
let EmailIsAvailableConstraint = class EmailIsAvailableConstraint {
    validate(email, args) {
        return PreUser_1.default
            .check_email_availability(email)
            .then(e => e)
            .catch(e => {
            throw e;
        });
    }
};
EmailIsAvailableConstraint = __decorate([
    class_validator_1.ValidatorConstraint({ async: true })
], EmailIsAvailableConstraint);
exports.EmailIsAvailableConstraint = EmailIsAvailableConstraint;
exports.IsEmailAvailable = (validationOpts) => {
    return (object, propertyName) => {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOpts,
            constraints: [],
            validator: EmailIsAvailableConstraint
        });
    };
};
let UserIsAvailableConstraint = class UserIsAvailableConstraint {
    validate(user, args) {
        return PreUser_1.default
            .user_exist(user)
            .then(e => !e)
            .catch(e => {
            throw e;
        });
    }
};
UserIsAvailableConstraint = __decorate([
    class_validator_1.ValidatorConstraint({ async: true })
], UserIsAvailableConstraint);
exports.UserIsAvailableConstraint = UserIsAvailableConstraint;
exports.IsUserAvailable = (validationOpts) => {
    return (object, propertyName) => {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOpts,
            constraints: [],
            validator: UserIsAvailableConstraint
        });
    };
};
let PreUserIsRegisteredConstraint = class PreUserIsRegisteredConstraint {
    validate(user, args) {
        return PreUser_1.default
            .user_exist(user)
            .then(e => e)
            .catch(e => {
            throw e;
        });
    }
};
PreUserIsRegisteredConstraint = __decorate([
    class_validator_1.ValidatorConstraint({ async: true })
], PreUserIsRegisteredConstraint);
exports.PreUserIsRegisteredConstraint = PreUserIsRegisteredConstraint;
exports.PreUserIsRegistered = (validationOpts) => {
    return (object, propertyName) => {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOpts,
            constraints: [],
            validator: PreUserIsRegisteredConstraint
        });
    };
};
let UserIsRegisteredConstraint = class UserIsRegisteredConstraint {
    validate(user, args) {
        return User_1.default.user_or_email_registered(user)
            .then(e => e)
            .catch(e => {
            throw e;
        });
    }
};
UserIsRegisteredConstraint = __decorate([
    class_validator_1.ValidatorConstraint({ async: true })
], UserIsRegisteredConstraint);
exports.UserIsRegisteredConstraint = UserIsRegisteredConstraint;
exports.UserIsRegistered = (validationOpts) => {
    return (object, propertyName) => {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOpts,
            constraints: [],
            validator: UserIsRegisteredConstraint
        });
    };
};
// const cript_password = (word: string) => {
//   bc.genSalt(10, (err, salt) => {
//     bc.hash(word, salt, (err, hash) => {
//       if (err) {
//         console.log({
//           err,
//           mensaje: "Error al encriptar la password"
//         });
//       } else {
//         console.log(hash);
//       }
//     });
//   });
// };
const compare_password = (pass) => __awaiter(void 0, void 0, void 0, function* () {
    let comparacion = yield bcrypt_1.default.compare(pass, process.env.MAKE_ADMIN_PASSWORD);
    if (!!comparacion) {
        return Promise.resolve(true);
    }
    else {
        return Promise.resolve(false);
    }
});
let isAdminPasswordConstraint = class isAdminPasswordConstraint {
    validate(pass, args) {
        return compare_password(pass);
    }
};
isAdminPasswordConstraint = __decorate([
    class_validator_1.ValidatorConstraint({ async: true })
], isAdminPasswordConstraint);
exports.isAdminPasswordConstraint = isAdminPasswordConstraint;
exports.isAdminPassword = (validationOpts) => {
    return (object, propertyName) => {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOpts,
            constraints: [],
            validator: isAdminPasswordConstraint
        });
    };
};
//# sourceMappingURL=UserValidations.js.map