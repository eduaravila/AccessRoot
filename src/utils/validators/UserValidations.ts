import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import bc from "bcrypt";

import preUserModel from "../../models/User/PreUser";
import UserModel from "../../models/User/User";

@ValidatorConstraint({ async: true })
export class EmailIsAvailableConstraint
  implements ValidatorConstraintInterface {
  validate(email: any, args: ValidationArguments) {
    return preUserModel
      .check_email_availability(email)
      .then(e => e)
      .catch(e => {
        throw e;
      });
  }
}

export const IsEmailAvailable = (validationOpts: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOpts,
      constraints: [],
      validator: EmailIsAvailableConstraint
    });
  };
};

@ValidatorConstraint({ async: true })
export class UserIsAvailableConstraint implements ValidatorConstraintInterface {
  validate(user: any, args: ValidationArguments) {
    return preUserModel
      .user_exist(user)
      .then(e => !e)
      .catch(e => {
        throw e;
      });
  }
}

export const IsUserAvailable = (validationOpts: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOpts,
      constraints: [],
      validator: UserIsAvailableConstraint
    });
  };
};

@ValidatorConstraint({ async: true })
export class PreUserIsRegisteredConstraint
  implements ValidatorConstraintInterface {
  validate(user: any, args: ValidationArguments) {
    return preUserModel
      .user_exist(user)
      .then(e => e)
      .catch(e => {
        throw e;
      });
  }
}

export const PreUserIsRegistered = (validationOpts: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOpts,
      constraints: [],
      validator: PreUserIsRegisteredConstraint
    });
  };
};

@ValidatorConstraint({ async: true })
export class UserIsRegisteredConstraint
  implements ValidatorConstraintInterface {
  validate(user: any, args: ValidationArguments) {
    return UserModel.user_or_email_registered(user)
      .then(e => e)
      .catch(e => {
        throw e;
      });
  }
}

export const UserIsRegistered = (validationOpts: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
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

const compare_password = async (pass: string) => {
  let comparacion = await bc.compare(pass, process.env.MAKE_ADMIN_PASSWORD);
  if (!!comparacion) {
    return Promise.resolve(true);
  } else {
    return Promise.resolve(false);
  }
};

@ValidatorConstraint({ async: true })
export class isAdminPasswordConstraint implements ValidatorConstraintInterface {
  validate(pass: any, args: ValidationArguments) {
    return compare_password(pass);
  }
}

export const isAdminPassword = (validationOpts: ValidationOptions) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOpts,
      constraints: [],
      validator: isAdminPasswordConstraint
    });
  };
};
