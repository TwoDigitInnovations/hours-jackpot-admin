import checkAuth from "@/middleware/checkAuth";
import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";
import { parseForm } from "@/utils/parseForm";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function apiHandler(req, res) {
  const { method } = req;

  await dbConnect();
  await checkAuth(req, res, ["USER", "ADMIN"]);
  if (!req.user) {
    return;
  }

  switch (method) {
    case "POST":
      try {
        let data = await parseForm(req);
        let payload = data?.field;
        let u = await User.findById(req.user._id);
        if (u.phone !== payload.phone) {
          if (!payload?.otp) {
            let ran_otp = Math.floor(1000 + Math.random() * 9000);
            return res.status(200).json({
              success: true,
              otpRequired: true,
              message: "OTP sent to your phone number",
            });
          } else if (payload?.otp === "0000") {
            let user = await User.findByIdAndUpdate(req.user._id, payload, {
              new: true,
              upsert: true,
            });

            return res.status(200).json({
              success: true,
              data: user,
              message: "Profile updated",
              otpRequired: false,
            });
          } else {
            return res
              .status(404)
              .json({ success: false, message: "Invalid OTP" });
          }
        } else {
          let user = await User.findByIdAndUpdate(req.user._id, payload, {
            new: true,
            upsert: true,
          });

          res
            .status(200)
            .json({
              success: true,
              data: user,
              message: "Profile updated",
              otpRequired: false,
            });
        }
      } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, duplicate: false });
      }
      break;

    case "GET":
      try {
        let tic = await User.findById(req.user._id);
        delete tic._doc.password;
        res.status(200).json({ success: true, data: tic });
      } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, duplicate: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
