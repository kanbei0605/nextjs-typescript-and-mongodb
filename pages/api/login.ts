import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "src/Models/index";
import { IUser } from "src/Models/User";
import { connectToDatabase } from "src/utils";

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
        // Send all-clear with _id as token
        res.status(200).json({ token: user._id.toString() });
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
