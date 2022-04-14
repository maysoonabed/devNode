import { body } from "express-validator";
import validate from "../../../core/errorMiddleware.js";
import { findByEmail } from "../service.js";

const rules = [
  body("firstName").isLength({ min: 4, max: 20 }),
  body("lastName").isLength({ min: 4, max: 20 }),
  body("email")
    .isEmail()
    .withMessage("invalid email")
    .bail()
    .normalizeEmail()
    .custom(async (email) => {
      const user = await findByEmail(email);
      if (user) {
        return Promise.reject("email already exists");
      }
      return Promise.resolve();
    }),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "password should be at least 8 characters, 1 lowercase, 1 uppercase, 1 symbols, 1 numbers"
    ),
  body("date_of_birth")
    .isISO8601()
    .withMessage("Date of birth should be a valid ISO 8601 date.")
    .bail()
    .isBefore(
      new Date(
        new Date().setFullYear(new Date().getFullYear() - 18)
      ).toDateString()
    )
    .withMessage("Age can't be less than 18"),
];

export default validate(rules);
