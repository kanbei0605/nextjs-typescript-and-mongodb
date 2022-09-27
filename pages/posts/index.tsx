import Link from "next/link";
import { IPost } from "src/Models/Post";
import { useEffect, useState } from "react";
import Header from "src/components/Header";
import { withAuthSync, logout } from "../../utils/auth";

const Usuarios = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    const asyncGetPosts = async () => {
      const { origin } = window.location;
      const data = await fetch(origin + "/api/posts");
      const posts = await data.json();
      return posts;
    };
    if (window) {
      asyncGetPosts()
        .then((posts) => {
          setPosts(posts);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onRemove = async (_id: string) => {
    const data = {
      id: _id,
    };
    try {
      const response = await fetch("/api/posts/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        getPosts();
      } else if (response.status === 409) {
        // setFieldError("That email is already taken.");
      } else {
        // setFieldError("Registration failed.");
        console.log("Registration failed.");
      }
    } catch (err) {
      console.log("You have an error in your code or there are network issues");
    }
  };

  const mappedPosts = posts.reverse().map((post, i) => (
    <div
      className="p-4 rounded-md text-sm w-full sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/6 border-2 m-1 overflow-auto"
      key={i}
    >
      <b className="my-2">Title: {post.title}</b>
      <br />
      <p className="my-4">Content: {post.content}</p>
      <div className="flex space-x-2">
        <Link href={`/posts/edit/${post._id}`}>
          <button className="px-4 py-2 mt-4 text-white bg-green-500 rounded-lg hover:bg-teal-500">
            Edit
          </button>
        </Link>
        <button
          className="px-2 py-2 mt-4 text-white bg-red-500 rounded-lg hover:bg-teal-500"
          onClick={() => onRemove(post._id)}
        >
          Remove
        </button>
      </div>
    </div>
  ));

  return (
    <div>
      <Header>Total Items: {posts.length}</Header>
      <div className="flex space-x-4">
        <div
          className="bg-gray-600 inline-block px-2 py-1 text-white cursor-pointer"
          onClick={logout}
        >
          Logout
        </div>
        <Link href="/posts/create">
          <div className="bg-blue-500 inline-block px-2 py-1 text-white cursor-pointer">
            Add one
          </div>
        </Link>
      </div>
      <div className="py-4 flex flex-wrap overflow-y-scroll h-auto my-4 border-4 rounded-md">
        {mappedPosts}
      </div>
    </div>
  );
};

export default withAuthSync(Usuarios);
