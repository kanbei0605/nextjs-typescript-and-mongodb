import { useState } from "react";
import Link from 'next/link';

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onLogin = (e) => {
		e.preventDefault();
    console.log("onLogin");
  };
  return (
    <>
      <div className="flex items-center justify-center bg-gray-100 px-2">
        <div className="px-8 py-6 text-left my-4 bg-white shadow-lg sm:w-1/2 w-full">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-blue-600"
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
          <h3 className="text-2xl font-bold text-center">
            Login to your account
          </h3>
          <form onSubmit={onLogin}>
            <div className="mt-4">
              <div>
                <label className="block">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {/* <label className="text-red-500">{errors.emailnotfound}</label> */}
              </div>
              <div className="mt-4">
                <label className="block">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {/* <label className="text-red-500">{errors.password}</label> */}
              </div>
              <div className="flex items-baseline justify-between">
                <button
                  type="submit"
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-teal-500"
                >
                  Login
                </button>
                <Link href="/register">Create One</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
