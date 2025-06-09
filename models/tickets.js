"use strict";

import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    image: {
      type: String
    },
    title: {
      type: String,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    winning_price: {
      type: Number,
    },
    ticket_price: {
      type: Number,
    },
    tooltip: {
      type: String,
    },
    currency: {
      type: String,
    },
    currency_symbol: {
      type: String,
    },
    fav: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);
ticketSchema.set("toJSON", {
  getters: true,
  virtuals: false,
  transform: (doc, ret, options) => {
    delete ret.__v;
    return ret;
  },
});

export default mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);
