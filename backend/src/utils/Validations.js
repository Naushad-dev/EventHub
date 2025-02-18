import { check, validationResult } from "express-validator";
export const SignUpValidation = [
  // Validation rules
  check("name").notEmpty().withMessage("Enter Valid Name").trim(),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid Email")
    .trim()
    .escape(),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .trim(),

  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    console.log("user validation is ....");

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.array(),
      });
    }
    next();
  },
];

export const LoginValidation = [
  // Validation rules
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid Email")
    .trim()
    .escape(),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .trim(),

  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "error",
        errors: errors.array(),
      });
    }
    next();
  },
];

export const eventValidation = [
  check("eventName")
    .notEmpty()
    .withMessage("Event Name is Required")
    .isLength({ max: 50 })
    .trim(),
  check("description")
    .notEmpty()
    .withMessage("Description Name is Required")
    .isLength({ max: 300 })
    .trim(),
  check("targetAudience").notEmpty(),
  check("eventType").notEmpty(),
  check("address").notEmpty(),

  //middleware to handle validation
  (req, res, next) => {
    const errors = validationResult(req);
    console.log("error while validating ", errors);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
