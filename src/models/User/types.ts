import mongoose, { Model } from "mongoose";

type errorOrBool = boolean | never;

enum roleEmun {
  User = "user",
  Moderator = "moderator",
  Admin = "admin",
  Root = "root"
}

export interface UserModelType extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  role: roleEmun;
  created_by: mongoose.Types.ObjectId;
  updated_by: mongoose.Types.ObjectId;
  location: {
    country: {
      type: string;
    };
    region: {
      type: string;
    };
    city: {
      type: string;
    };
    timezone: {
      type: string;
    };
    ll: {
      type: Array<number>;
    };
  };
}

export interface UserModelStaticsType extends Model<UserModelType> {
  check_email_availability: (email: string) => Promise<errorOrBool>;
  user_or_email_registered: (user: string) => Promise<errorOrBool>;
  user_exist: (username: string) => Promise<errorOrBool>;
  email_is_registered: (email: string) => Promise<errorOrBool>;
  checkPassword: (email: string, pass: string) => Promise<errorOrBool>;
  update_password: (email: string, pass: string) => Promise<errorOrBool>;
}

export interface PreUserModelStaticsType extends Model<UserModelType> {
  check_email_availability: (email: string) => Promise<errorOrBool>;
  user_exist: (username: string) => Promise<errorOrBool>;
  email_is_registered: (email: string) => Promise<errorOrBool>;
}
