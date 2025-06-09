import checkAuth from "@/middleware/checkAuth";
import Book from "@/models/book";
import dbConnect from "@/utils/dbConnect";
import { parseForm } from "@/utils/parseForm";
import Cart from "@/models/cart";

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

        case "GET":
            try {
                let tic = await Book.find({
                    active: true,
                }).populate("ticket");

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
