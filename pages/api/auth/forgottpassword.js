import checkAuth from "@/middleware/checkAuth";
import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";
import { parseForm } from "@/utils/parseForm";

import bcrypt from "bcryptjs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function apiHandler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const data = await parseForm(req);
        const payload = data?.field;
        console.log(payload);

        let user = await User.findOne({ phone: payload.phone });
        if (user) {
          if (payload.otp === "0000") {
            user.password = bcrypt.hashSync(
              payload.password,
              bcrypt.genSaltSync(10)
            );

            await user.save();
            res
              .status(200)
              .json({ success: true, message: "Changed password" });
          } else {
            res.status(404).json({ success: false, message: "Invalid OTP" });
          }
        } else {
          res.status(404).json({ success: false, message: "User not found" });
        }
      } catch (err) {
        console.log(err);
        if (err && err.code == 11000) {
          console.log(err);
          res.status(200).json({ success: false, duplicate: true });
        } else {
          console.log(err);
          res.status(400).json({ success: false, duplicate: false });
        }
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
