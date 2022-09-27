import { NextApiRequest, NextApiResponse } from "next";
import mongodb from "mongodb";
import { Post } from "src/Models/index";
import { connectToDatabase } from "src/utils";

export default async function deletePost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;
  if (req.method === "POST") {
    const query = { _id: new mongodb.ObjectID(id) };
    try {
      await connectToDatabase();
      await Post.deleteOne(query).then(() => {
				res.status(200).send("success");
			}).catch(err => {
				console.log(err);
			});
    } catch (err) {
      console.log(err);
      res.status(500).send("error");
    }
  } else {
    res.status(405).json({ messagge: "Method not allowed" });
  }
}
