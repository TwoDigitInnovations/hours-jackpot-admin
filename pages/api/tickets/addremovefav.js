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
  await checkAuth(req, res, ["USER", "ADMIN"]);
  if (!req.user) {
    return;
  }

  switch (method) {
    case "POST":
      try {
        console.log(req.headers.authorization);
        let data = await parseForm(req);
        let payload = data?.field;
        console.log(payload);
        let favdata = {};
        const t = await Ticket.findById(payload.ticket_id);
        // if (payload.fav === "1") {
        let message = "Added to favorite";
        if (t?.fav?.includes(req.user._id)) {
          favdata = { $pull: { fav: req.user._id } };
          message = "Removed to favorite";
          // return res
          //   .status(400)
          //   .json({ success: false, message: "Already added to favorite" });
        } else {
          favdata = { $push: { fav: req.user._id } };
        }
        // } else if (payload.fav === "0") {
        //   favdata = { $pull: { fav: req.user._id } };
        // }
        const updatedData = await Ticket.findByIdAndUpdate(
          payload.ticket_id,
          favdata,
          {
            new: true,
            upsert: true,
          }
        );

        res.status(200).json({
          success: true,
          data: updatedData,
          message,
        });
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
