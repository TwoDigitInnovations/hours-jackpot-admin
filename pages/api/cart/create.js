import checkAuth from "@/middleware/checkAuth";
import Cart from "@/models/cart";
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

        console.log(payload);
        let tic = new Cart(payload);
        let t = await tic.save();
        res
          .status(200)
          .json({ success: true, data: t, message: "Added to cart" });
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
