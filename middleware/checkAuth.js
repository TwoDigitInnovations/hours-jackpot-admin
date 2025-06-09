import jwt from "jsonwebtoken";

async function checkAuth(req, res, types) {
  //   return new Promise((resolve, reject) => {
  let token = req?.headers?.authorization?.split(" ")[1];
  const user = jwt.decode(token, process.env.NEXT_SECRET);
  if (user && types.includes(user.user.type)) {
    req.user = user.user;
    return req;
  } else {
    return res.status(401).json({ success: false, message: "Unautorized" });
  }
  //   });
}

export default checkAuth;
