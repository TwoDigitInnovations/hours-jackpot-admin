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

  switch (method) {
    case "POST":
      try {
        const data = await parseForm(req);
        const payload = data?.field;
        console.log(payload);
        if (payload?.otp === "0000") {
          let user = await User.find({
            phone: payload.phone,
          });
          if (!user.length) {
            let user = new User({
              firstname: payload.firstname,
              lastname: payload.lastname,
              password: payload.password,
              type: payload.type,
              phone: payload.phone,
            });
            user.password = user.encryptPassword(payload.password);
            await user.save();
            res.status(200).json({ success: true, phone: user.phone });
          } else {
            res.status(404).json({
              success: false,
              message: "Phone number already exists.",
            });
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
