import mongoose, { Schema } from "mongoose";
import bc from "bcrypt";
import moment from "moment";
import { UserModelStaticsType, UserModelType } from "./types";

const User_schema: Schema = new mongoose.Schema({
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
  role: {
    type: String,
    default: "admin",
    enum: ["user", "moderator", "admin", "root"]
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

User_schema.statics.check_email_availability = async function(email: string) {
  try {
    let find_email = await this.findOne({ email });
    if (!find_email) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  } catch (error) {
    return Promise.reject(error);
  }
};

//? user exist in the DB
User_schema.statics.user_exist = async function(username: string) {
  try {
    let user_finded = await this.findOne({ username });
    if (user_finded) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  } catch (error) {
    return Promise.reject(error);
  }
};

User_schema.statics.user_or_email_registered = async function(user: string) {
  try {
    let resultado = await this.findOne({
      $or: [{ username: user }, { email: user }]
    });
    if (resultado) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

User_schema.statics.email_is_registered = async function(email: string) {
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

User_schema.statics.checkPassword = async function(
  email: string,
  pass: string
) {
  try {
    let resultado = await this.findOne({
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
      let comparacion = await bc.compare(pass, resultado.password);

      if (!!comparacion && !!resultado) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    } else {
      return Promise.resolve(new Error("The email is not registered"));
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

User_schema.statics.update_password = async function(
  email: string,
  pass: string
) {
  try {
    bc.genSalt(10, async (err, salt) => {
      bc.hash(pass, salt, async (err, hash) => {
        if (err) {
          throw err;
        } else {
          console.log(hash);
          let nuevo = await this.findOneAndUpdate(
            { email },
            { password: hash },
            {
              useFindAndModify: false
            }
          );
          if (nuevo) {
            return Promise.resolve(nuevo);
          } else {
            throw Error("User not found");
          }
        }
      });
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

const user_model = mongoose.model<UserModelType, UserModelStaticsType>(
  "user",
  User_schema
);

export default user_model;
