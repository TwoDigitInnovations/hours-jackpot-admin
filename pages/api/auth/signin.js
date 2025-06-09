import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";
import { parseForm } from "@/utils/parseForm";
import jwt from "jsonwebtoken";
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
        if (payload?.otp === "0000") {
          let user = await User.findOne({
            phone: payload.phone,
          });
          if (user) {
            console.log(user, payload.password, user?.password);
            const validPassword = await bcrypt.compareSync(
              payload.password,
              user.password
            );
            // const validPassword = user.isValidPassword(payload.password);
            const d = {
              type: user.type,
              _id: user._id,
            };
            if (validPassword) {
              const token = jwt.sign({ user: d }, process.env.NEXT_SECRET, {
                algorithm: "HS256",
                expiresIn: "7d",
                issuer: "service",
                audience: "service.in",
              });
              const data = {
                token,
                ...user?._doc,
              };
              delete data.password;
              res.status(200).json({ success: true, data });
            } else {
              res
                .status(404)
                .json({ success: false, message: "Invalid password" });
            }
          } else {
            res.status(404).json({ success: false, message: "User not found" });
          }
        } else {
          res.status(404).json({ success: false, message: "Invalid OTP" });
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
