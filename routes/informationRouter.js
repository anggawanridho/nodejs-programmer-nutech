import express from "express";
import {
  informationAllBanner,
  informationServices,
} from "../controllers/informationController.js";

const router = express.Router();

/* GET balance listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// public routes
router.get("/banner", informationAllBanner);
router.get("/services", informationServices);

export default router;
