import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function Login({ setIsAuth, setIsSigningUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const cookies = new Cookies();
  const login = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:3001/login", {
      username,
      password,
    }).then((res) => {
      const { firstName, lastName, username, token, userId } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      setIsAuth(true);
    });
  };
  return (
    <>
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Login
            </h1>
          </div>

          <div className="mt-5">
            <form onSubmit={login}>
              <div className="grid gap-y-4">
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Username"
                      name="username"
                      className="py-3 px-4 block w-full border-gray-300 border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      className="py-3 px-4 block w-full border-gray-300 border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Login
                </button>
              </div>
            </form>
            <p className="text-center mt-4">
              Don't have an account?{" "}
              <button
                onClick={() => setIsSigningUp(true)}
                className="text-blue-600 underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
