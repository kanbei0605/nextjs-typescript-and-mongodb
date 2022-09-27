import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "src/components/Header";
import Input from "src/components/Input";
import toast from 'react-hot-toast';
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

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (post.title === "" || post.content === "") {
      toast.error("Wrong Input");
      return;
    }
    const dt = {
      id: _id,
      title: post.title,
      content: post.content
    };

    try {
      const response = await fetch("/api/posts/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dt),
      });
      if (response.status === 200) {
        toast.success("Updated successfully");
      } else if (response.status === 409) {
        toast.error("Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("You have an error in your code or there are network issues");
    }
  };

  return (
    <div>
      <Header>Edit item</Header>
      <form
        onSubmit={handleUpdate}
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
