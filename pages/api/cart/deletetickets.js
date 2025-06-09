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
    case "DELETE":
      try {
        let data = await parseForm(req);
        let payload = data?.field;
        console.log(payload);
        await Cart.findByIdAndDelete(payload.id);
        res
          .status(200)
          .json({ success: true, message: "Ticket deleted to cart" });
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
