import Joi from "joi";

export default async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .trim()
      .messages({
        "string.email": "Parameter email tidak sesuai format",
      })
      .optional(),
    first_name: Joi.string().trim().optional(),
    last_name: Joi.string().trim().optional(),
    profile_picture: Joi.string().trim().optional(),
  });

  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    let errMessages = {};

    if (err.details) {
      err.details.map((value) => {
        errMessages[value.context.key] = value.message;
      });
    }

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
