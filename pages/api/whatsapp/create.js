import checkAuth from "@/middleware/checkAuth";
import Wapp from "@/models/whatsapp";
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
        payload.user = req.user._id;

     //   console.log(payload);
        if (payload.id) {
          const updatedData = await Wapp.findByIdAndUpdate(
            payload.id,
            payload,
            { new: true, upsert: true }
          );
          return res.status(200).json({
            success: true,
            data: updatedData,
            message: "Whatsapp number updated",
          });
        } else {
          let tic = new Wapp(payload);
          let t = await tic.save();
          res
            .status(200)
            .json({ success: true, data: t, message: "Whatsapp number added" });
        }
      } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, duplicate: false });
      }
      break;

    case "GET":
      try {
        let tic = await Wapp.find();
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
