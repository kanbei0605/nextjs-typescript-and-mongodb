import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IPost } from "src/Models/Post";
import Header from "src/components/Header";
import Input from "src/components/Input";
import Router from "next/router";
import Link from "next/link";

export interface IItem {
  title: string;
  content: string;
}

export default function edit() {
  const router = useRouter();
  const _id = router.query["id"];
  const [post, setPost] = useState<IItem>({
    title: "",
    content: "",
  });

  useEffect(() => {
    const dt = {
      id: _id,
    };
    const asyncGetPost = async () => {
      const { origin } = window.location;
      const data = await fetch(origin + "/api/posts/getbyid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dt),
      });
      const posts = await data.json();
      return posts;
    };
    if (window) {
      asyncGetPost()
        .then((post) => {
          setPost(post);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [_id]);

  const updatePost = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handlePostDelivery = async (e: FormEvent) => {
    e.preventDefault();
    const dt = {
      id: _id,
      title: post.title,
      content: post.content
    };
    const asyncUpdate = async () => {
      const { origin } = window.location;
      const data = await fetch(origin + "/api/posts/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dt),
      });
      const posts = await data.json();
      return posts;
    };
    if (window) {
      asyncUpdate()
        .then((post) => {
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Header>Edit item</Header>
      <form
        onSubmit={handlePostDelivery}
        className="flex flex-wrap w-full md:w-64 items-center justify-center space-y-2"
      >
        <div className="w-full">
          <Input
            value={post.title}
            name="title"
            onChange={updatePost}
            placeholder="Title"
          />
        </div>
        <div className="w-full">
          <textarea
            placeholder="Content"
            className="border-2 border-gray-300 w-full px-3 py-1.5 rounded-md shadow-md focus:border-gray-400 resize-none"
            name="content"
            value={post.content}
            onChange={updatePost}
          ></textarea>
        </div>
        <div className="w-full text-center">
          <Link href="/posts">
            <button className="px-3 py-1.5 bg-gray-600 text-white rounded-md mr-2">
              Back
            </button>
          </Link>
          <button className="px-3 py-1.5 bg-blue-400 text-white rounded-md">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
