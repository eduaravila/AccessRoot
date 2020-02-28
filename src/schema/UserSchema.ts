import { ObjectType, Field, InputType, Directive, ID } from "type-graphql";
import {
  IsJWT,
  Matches,
  MinLength,
  MaxLength,
  IsEmail,
  Min,
  Max
} from "class-validator";
import mongoose from "mongoose";

import {
  IsEmailAvailable,
  IsUserAvailable,
  UserIsRegistered,
  PreUserIsRegistered,
  isAdminPassword
} from "../utils/validators/UserValidations";
import user_model from "../models/User/User";

@ObjectType()
export class SuccessResponse {
  @Field(type => String)
  msg?: string;

  @Field(type => String)
  code?: string;
}

@InputType()
export class verifyAccountInput {
  @Field(type => String)
  @MinLength(6)
  code: string;

  @Field(type => String)
  @IsJWT()
  token: string;
}

@InputType()
export class RegisterInfo {
  @Field(type => String)
  @MinLength(1)
  @MaxLength(15)
  @IsUserAvailable({ message: "$value is already registered! 🙅‍♂️" })
  username: string;

  @Field(type => String)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,}/, {
    message:
      "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number ❗"
  })
  password: string;

  @Field(type => String)
  @isAdminPassword({ message: "$value this value is not valid! 💁‍♀️" })
  adminPassword: string;

  @Field(type => String)
  @IsEmail()
  @IsEmailAvailable({ message: "$value is already registered! 💁‍♀️" })
  email: string;
}

@InputType()
export class passwordResetInfo {
  @Field(type => String)
  @MinLength(6)
  code: string;

  @Field(type => String)
  @IsJWT()
  token: string;

  @Field(type => String)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,}/, {
    message:
      "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number ❗"
  })
  password: string;
}

@InputType()
export class LoginInfo {
  @Field(type => String)
  @UserIsRegistered({
    message: "$value username | email is not still registered 👎"
  })
  user: string;

  @Field(type => String)
  password: string;
}

@InputType()
export class resendCodeInfo {
  @Field(type => String)
  @PreUserIsRegistered({ message: "User is not registered" })
  username: string;
}

@InputType()
export class restorePasswordCodeInput {
  @Field(type => String)
  @IsEmail()
  @UserIsRegistered({
    message: "$value username | email is not still registered 👎"
  })
  email: string;
}

@InputType()
export class CheckUserEmailAvailabeInput {
  @Field(type => String, { nullable: true })
  @IsEmail()
  @IsEmailAvailable({
    message: "$value email  already registered 👎"
  })
  email: string;

  @Field(type => String, { nullable: true })
  @IsUserAvailable({
    message: "$value username already registered👎"
  })
  username: string;
}

@Directive(`@key(fields:"_id")`)
@ObjectType()
export class User {
  @Field(type => String)
  _id: string;

  @Field(type => String, { nullable: true })
  username: string;

  @Field(type => String, { nullable: true })
  password: string;

  @Field(type => String, { nullable: true })
  created_at: string;

  @Field(type => String, { nullable: true })
  updated_at: string;

  @Field(type => ID, { nullable: true })
  created_by: mongoose.Types.ObjectId;

  @Field(type => ID, { nullable: true })
  updated_by: mongoose.Types.ObjectId;
}

export async function resolveUserReference(
  reference: Pick<User, "_id">
): Promise<User> {
  let result = await user_model.findOne({ _id: reference._id });

  return result;
}
