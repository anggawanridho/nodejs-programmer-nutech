import express from "express";
import {
  userRegister,
  userLogin,
  userDetail,
  updateUser,
  userImage,
  // deleteuser,
  // verifyUser,
  // fetchAllUser,
  // updatePass,
  // resetPass,
  // verifyEmail,
} from "../controllers/userController.js";
import {
  registerMiddleware,
  loginValidation,
  verifyToken,
  updateMiddleware,
} from "../middlewares/index.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// public routes
router.post("/register", registerMiddleware, userRegister);
router.post("/login", loginValidation, userLogin);

// protected routes
router.get("/profile", verifyToken, userDetail);
router.put("/profile/update", [verifyToken, updateMiddleware], updateUser);
router.put(
  "/profile/image",
  [verifyToken, upload.single("profile_image")],
  userImage
);

export default router;
