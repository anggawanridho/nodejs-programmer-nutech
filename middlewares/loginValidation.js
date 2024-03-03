import Joi from "joi";

export default async (req, res, next) => {
  const validate = Joi.object({
    email: Joi.string().required().empty().email().trim().messages({
      "string.email": "Parameter email tidak sesuai format",
    }),
    password: Joi.string()
      .required()
      .empty()
      .min(8)
      .max(128)
      .trim()
      .pattern(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,24}$/,
        "password"
      )
      .messages({
        "any.required":
          "Password must be 8-128 characters long, and include at least one uppercase letter, one number, and one special character.",
      }),
  });

  try {
    await validate.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    let errMessages = {};

    err.details.map((value) => {
      errMessages[value.context.key] = value.message;
    });

    // Extract the first error message
    const firstErrorMessage = Object.values(errMessages)[0];

    return res.status(400).json({
      status: 102,
      message: firstErrorMessage,
      data: null,
    });
  }
  return next();
};
