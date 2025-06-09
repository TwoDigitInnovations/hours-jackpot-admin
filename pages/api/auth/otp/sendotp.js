import corsAuth from "@/middleware/corsAuth";
import corsChecked, { middleware } from "@/middleware/corsChecked";
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
  console.log(method);
  // corsAuth(req, res);
  // (async (req, res) => {
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const data = await parseForm(req);
        const payload = data?.field;
        console.log(payload);
        let user = await User.findOne({
          phone: payload.phone,
        });
        console.log(user);
        //for signup
        if (payload.type === "signup") {
          if (user) {
            return res.status(404).json({
              success: false,
              message: "Phone number already exists.",
            });
          } else {
            let ran_otp = Math.floor(1000 + Math.random() * 9000);
            return res.status(200).json({
              success: true,
              message: "OTP sent to your phone number",
            });
          }
        } else if (payload.type === "signin") {
          ///for login
          if (user) {
            console.log(user, payload.password, user?.password);
            const validPassword = await bcrypt.compareSync(
              payload.password,
              user.password
            );
            if (validPassword) {
              let ran_otp = Math.floor(1000 + Math.random() * 9000);
              return res.status(200).json({
                success: true,
                message: "OTP sent to your phone number",
              });
            } else {
              res
                .status(404)
                .json({ success: false, message: "Invalid password" });
            }
          } else {
            return res.status(404).json({
              success: false,
              message: "User not found",
            });
          }
        } else {
          // forgot password
          if (user) {
            let ran_otp = Math.floor(1000 + Math.random() * 9000);
            return res.status(200).json({
              success: true,
              message: "OTP sent to your phone number",
            });
          } else {
            return res.status(404).json({
              success: false,
              message: "User not found",
            });
          }
        }
      } catch (err) {
        console.log(err);
        if (err && err.code == 11000) {
          console.log(err);
          return res.status(200).json({ success: false, duplicate: true });
        } else {
          console.log(err);
          return res.status(400).json({ success: false, duplicate: false });
        }
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
  // });
}
