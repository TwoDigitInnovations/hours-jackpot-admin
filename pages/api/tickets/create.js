import checkAuth from "@/middleware/checkAuth";
import Ticket from "@/models/tickets";
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
  await checkAuth(req, res, ["ADMIN"]);
  if (!req.user) {
    return;
  }

  switch (method) {
    case "POST":
      try {
        console.log(req.headers.authorization);
        let data = await parseForm(req);
        let payload = data?.field;
        // console.log(payload);
        if (payload.id) {
          const updatedData = await Ticket.findByIdAndUpdate(
            payload.id,
            payload,
            { new: true, upsert: true }
          );
          return res.status(200).json({
            success: true,
            data: updatedData,
            message: "Ticket updated",
          });
        } else {
          let tic = new Ticket(payload);
          let t = await tic.save();
          res.status(200).json({ success: true, data: t });
        }
      } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, duplicate: false });
      }
      break;

    case "GET":
      try {
        let tic = await Ticket.find();
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
