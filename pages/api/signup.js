import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import Cart from "../../models/Cart";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // validate
    if (!isLength(name, { min: 3, max: 20 })) {
      return res.status(422).send("Name 3-20 chars");
    } else if (!isLength(password, { min: 3, max: 20 })) {
      return res.status(422).send("Password 3-20 chars");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email must be valid");
    }
    // check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exists with email ${email}`);
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: hash,
    }).save();
    // create cart for new user
    await new Cart({ user: newUser._id }).save();
    // create token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // send token
    res.status(201).json(token);
  } catch {
    res.status(500).send("Error signing up user. Please try again later");
  }
};
