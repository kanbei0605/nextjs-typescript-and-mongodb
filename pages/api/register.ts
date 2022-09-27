import { NextApiRequest, NextApiResponse } from "next";
import { User } from "src/Models/index";
import { IUser } from "src/Models/User";
import { connectToDatabase } from "src/utils";

export default async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectToDatabase();
      const body: IUser = JSON.parse(req.body);
      const newPost = new User(body);
      const saved = await newPost.save();
      res.send(saved);
    } catch (err) {
      console.log(err);
      res.status(500).send("error");
    }
  } else {
    res.status(405).json({ messagge: "Method not allowed" });
  }
}
