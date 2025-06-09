const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
    {
        notification: {
            type: "string",
        },
        users: [{ type: mongoose.Types.ObjectId, ref: "User" }]
    },
    {
        timestamps: true,
    }
);

export default module.exports = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);;
