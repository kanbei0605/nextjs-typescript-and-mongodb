import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { User } from "src/Models/index";
import { IUser } from "src/Models/User";
import { connectToDatabase } from "src/utils";

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password } = req.body;

  if (req.method === "POST") {
    try {
      await connectToDatabase();

      // Check for email conflict
      const emailConflict = await User.findOne({
        email: email,
      });

      if (emailConflict) {
        res.status(409).json({ message: "Email already taken" });
      } else {
        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser: IUser = new User({
					email: email,
					name: name,
					password: passwordHash
				});
				const saved = await newUser.save();

        // Send all-clear with _id as token
        // res.status(200).json({ token: saved.insertedId.toString() });
				res.send(saved);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("error");
    }
  } else {
    res.status(405).json({ messagge: "Method not allowed" });
  }
}
