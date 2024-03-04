import { getBannerService } from "../services/banner/index.js";
import { getInfoService } from "../services/service/index.js";

export const informationAllBanner = async (req, res) => {
  try {
    const data = await getBannerService(req);
    return res.status(200).json({
      status: 0,
      message: "Sukses",
      data: data,
    });
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: "Terdapat error pada proses get banner",
      error: {
        message: err.message,
      },
    });
  }
};

export const informationServices = async (req, res) => {
  try {
    const data = await getInfoService(req);
    return res.status(200).json({
      status: 0,
      message: "Sukses",
      data: data,
    });
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: "Terdapat error pada proses get info service",
      error: {
        message: err.message,
      },
    });
  }
};
