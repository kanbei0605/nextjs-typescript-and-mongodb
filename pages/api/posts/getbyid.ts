import { NextApiRequest, NextApiResponse } from "next";
import mongodb from "mongodb";
import { IPost } from "src/Models/Post";
import { Post } from "src/Models/index";
import { connectToDatabase } from "src/utils";

export default async function getByID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;
  if (req.method === "POST") {
    const query = { _id: new mongodb.ObjectID(id) };
    try {
      await connectToDatabase();
      const post: IPost = await Post.findOne(query);
      console.log(post);
      res.json(post)
    } catch (err) {
      console.log(err);
      res.status(500).send("error");
    }
  } else {
    res.status(405).json({ messagge: "Method not allowed" });
  }
}
