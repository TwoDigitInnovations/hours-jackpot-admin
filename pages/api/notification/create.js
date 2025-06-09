import checkAuth from "@/middleware/checkAuth";
import Notification from "@/models/notification";
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
                console.log(payload);
                let notify = new Notification(payload);
                let t = await notify.save();
                res
                    .status(200)
                    .json({ success: true, data: t, message: "Notification sent" });

            } catch (err) {
                console.log(err);
                res.status(400).json({ success: false, duplicate: false });
            }
            break;

        case "GET":
            try {
                let tic = await Notification.find();
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
 