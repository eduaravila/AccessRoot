import mongoose, { Schema } from "mongoose";
import bc from "bcrypt";
import moment from "moment";
import userModel from "./User";

import { PreUserModelStaticsType, UserModelType } from "./types";

const PReUser_schema: Schema = new mongoose.Schema({
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
    default: moment().format("YYYY-MM-DD/HH:mm:ZZ")
  },
  updated_at: {
    type: String,
    required: true,
    default: moment().format("YYYY-MM-DD/HH:mm:ZZ")
  },
  created_by: {
    type: mongoose.Types.ObjectId,
    ref: "user"
    // required: true
  },
  updated_by: {
    type: mongoose.Types.ObjectId,
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

PReUser_schema.pre("save", function(next) {
  if (this.isModified("password")) {
    console.log(this.get("password"));
    bc.genSalt(10, (err, salt) => {
      bc.hash(this.get("password"), salt, (err, hash) => {
        if (err) {
          console.log({
            err,
            mensaje: "Error al encriptar la password"
          });
        } else {
          console.log(hash);
          this.set({ password: hash });

          next();
        }
      });
    });
  } else {
    console.log(" no modificado");
    next();
  }
});

PReUser_schema.statics.check_email_availability = async function(
  email: string
) {
  try {
    let find_email = await this.findOne({ email });
    let find_email_user = await userModel.findOne({ email });
    if (!find_email && !find_email_user) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  } catch (error) {
    return Promise.reject(error);
  }
};

//? user exist in the DB
PReUser_schema.statics.user_exist = async function(username: string) {
  try {
    let user_finded = await this.findOne({ username });
    let user_finded_user = await userModel.findOne({ username });
    if (user_finded || user_finded_user) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  } catch (error) {
    return Promise.reject(error);
  }
};

PReUser_schema.statics.email_is_registered = async function(email: string) {
  try {
    let resultado = await this.findOne({ email });
    if (resultado) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const pre_user_model = mongoose.model<UserModelType, PreUserModelStaticsType>(
  "pre_user",
  PReUser_schema
);

export default pre_user_model;
