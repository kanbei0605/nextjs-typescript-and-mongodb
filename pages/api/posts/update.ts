import { NextApiRequest, NextApiResponse } from "next";
import mongodb from "mongodb";
import { IPost } from "src/Models/Post";
import { Post } from "src/Models/index";
import { connectToDatabase } from "src/utils";

export default async function update(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, title, content } = req.body;
  if (req.method === "PUT") {
    try {
      await connectToDatabase();
      await Post.updateOne(
        { _id: new mongodb.ObjectID(id) },
        { $set: { title, content } }
      )
        .then((response) => {
          res.status(200).json({ message: "success" });
          // return { status: "ok" };
        })
        .catch((error) => {
          return {
            status: "error",
            message: error.toString(),
          };
        });
    } catch (err) {
      res.status(500).send("error");
    }
  } else {
    res.status(405).json({ messagge: "Method not allowed" });
  }
}
