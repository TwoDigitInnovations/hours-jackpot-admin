const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const whatsappSchema = new Schema(
  {
    number: {
      type: "string",
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default module.exports = mongoose.models.Wapp || mongoose.model("Wapp", whatsappSchema);;
