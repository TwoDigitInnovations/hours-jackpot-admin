"use strict";

import mongoose from "mongoose";

const bcrypt = require("bcryptjs");
//const pointSchema = new mongoose.Schema({
//     type: {
//         type: String,
//         enum: ['Point'],
//         required: true
//     },
//     coordinates: {
//         type: [Number],
//         required: true
//     }
// });
const userSchema = new mongoose.Schema(
  {
    lastname: {
      type: String,
    },
    firstname: {
      type: String,
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    fullname: {
      type: String,
    },
    dob: {
      type: Date,
    },
    nationality: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.set("toJSON", {
  getters: true,
  virtuals: false,
  transform: (doc, ret, options) => {
    delete ret.__v;
    return ret;
  },
});

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
userSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.password);
};
export default mongoose.models.User || mongoose.model("User", userSchema);
