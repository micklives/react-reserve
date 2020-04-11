import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDb();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    // check user exists w email
    const user = await User.findOne({ email }).select("+password");
    // error if no user
    if (!user) {
      return res.status(404).send("No user exists with that email.");
    }
    // check pwd matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    // generate token
    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      // send token to client
      res.status(200).json(token);
    } else {
      res.status(401).send("Passwords do not match");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error logging in user");
  }
};
