import {
  registerService,
  loginService,
  detailService,
  updateService,
  imageService,
} from "../services/user/index.js";

export const userRegister = async (req, res) => {
  try {
    await registerService(req.body);
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: "Terdapat error pada proses registrasi",
      error: {
        path: err.meta.target,
        message: err.message,
      },
    });
  }

  return res.json({
    status: 0,
    message: "Registrasi berhasil silahkan login",
    data: null,
  });
};

export const userLogin = async (req, res) => {
  try {
    const user = await loginService(req.body);

    res.status(200).json({
      status: 0,
      message: "Login Sukses",
      data: user,
    });
  } catch (error) {
    res.status(401).json({
      status: 103,
      message: error.message,
      data: null,
    });
  }
};

export const userDetail = async (req, res) => {
  let user;

  try {
    user = await detailService(req.user);
  } catch (err) {
    return res.status(404).json({
      status: 404,
      result: "not found",
      message: "record data not found",
    });
  }

  return res.json({
    status: 0,
    message: "Sukses",
    data: user,
  });
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await updateService(req);
    res.status(200).json({
      status: 0,
      message: "Update Pofile berhasil",
      data: updatedUser,
    });
  } catch (error) {
    res.status(401).json({
      status: 103,
      result: "bad request",
      message: error.message,
    });
  }
};

export const userImage = async (req, res) => {
  try {
    const user = req.user;

    const updatedUser = await imageService(req);
    res.status(200).json({
      status: 0,
      message: "Update Profile Image berhasil",
      data: updatedUser,
    });
  } catch (error) {
    res.status(401).json({
      status: 103,
      result: "bad request",
      message: error.message,
    });
  }
};
