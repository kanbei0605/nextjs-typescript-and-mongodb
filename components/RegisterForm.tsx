import { useState } from "react";
import Router from "next/router";
import Link from "next/link";
import { login } from "../utils/auth";

const RegisterForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fieldError, setFieldError] = useState<string>("");

  const onRegister = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        Router.push("/");
      } else if (response.status === 409) {
        setFieldError("That email is already taken.");
      } else {
        setFieldError("Registration failed.");
        console.log("Registration failed.");
      }
    } catch (err) {
      console.error(
        "You have an error in your code or there are network issues.",
        err
      );
      // setNetworkErrors(true);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center bg-gray-100 px-2">
        <div className="px-8 py-6 mx-4 my-4 text-left bg-white shadow-lg sm:w-1/2 w-full">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-center">Join us</h3>
          <form onSubmit={onRegister}>
            <div className="flex justify-center mt-2">
              <span className="text-red-600 font-semibold">{fieldError}</span>
            </div>
            <div className="mt-4">
              <div>
                <label className="block">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="mt-4">
                <label className="block">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex mb-2">
                <button
                  type="submit"
                  className="w-full px-6 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-teal-500"
                >
                  Create Account
                </button>
              </div>
              <Link href="/">Already have an account?</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
