import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(404).json({
      status: 404,
      message: "Token tidak ditemukan, anda harus login terlebih dahulu",
      data: null,
    });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({
        status: 108,
        message: "Token tidak tidak valid atau kadaluwarsa",
        data: null,
      });
    req.user = decoded;
    req.token = token;
    next();
  });
};
