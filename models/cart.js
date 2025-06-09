"use strict";

import mongoose from "mongoose";
import User from "@/models/user";
import Ticket from "@/models/tickets";

const cartSchema = new mongoose.Schema(
  {
    cartItemId: {
      type: mongoose.Types.ObjectId,
      ref: "Cart",
    },
    ticket: {
      type: mongoose.Types.ObjectId,
      ref: "Ticket",
    },
    qty: {
      type: Number,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
cartSchema.set("toJSON", {
  getters: true,
  virtuals: false,
  transform: (doc, ret, options) => {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
