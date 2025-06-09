const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
    {
        howItWorks: {
            type: "string",
        },
        termsAndConditions: {
            type: "string",
        },
    },
    {
        timestamps: true,
    }
);

export default module.exports = mongoose.models.Content || mongoose.model("Content", notificationSchema);;
