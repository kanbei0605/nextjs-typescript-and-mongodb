import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "src/Models/index";
import { IUser } from "src/Models/User";
import { connectToDatabase } from "src/utils";
import jwt from "jsonwebtoken";
require("dotenv").config();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  try {
    await connectToDatabase();

    // Try to find email
    let user = await User.findOne({ email: email });

    // If no email doesn't exist
    if (!user) {
      res.status(404).json({ message: "No user found" });
    } else {
      // Compare user-entered password to stored hash
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign(
          { email: user.email, _id: user._id },
          process.env.jwtSecret,
          { expiresIn: 86400 }
        ); // 1 day token
        // Send all-clear with _id as token
        res.status(200).json({ token: token, userData: user });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    }
  } catch (err) {
    const { response } = err;
    response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(500).json({ message: err.message });
  }

  // Disconnect from database
};
