import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function SignUp({ setIsAuth, setIsSigningUp }) {
  const cookies = new Cookies();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const signUp = (event) => {
    event.preventDefault(); // Prevent the default form submission
    Axios.post("http://localhost:3001/signup", user).then((res) => {
      const { token, userId, firstName, lastName, username, hashedPassword } =
        res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true);
    });
  };

  return (
    <>
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Sign Up
            </h1>
          </div>

          <div className="mt-5">
            <form onSubmit={signUp}>
              <div className="grid gap-y-4">
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      className="py-3 px-4 block w-full border-gray-300 border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required
                      onChange={(event) => {
                        setUser({ ...user, firstName: event.target.value });
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      className="py-3 px-4 block w-full border-gray-300 border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      onChange={(event) => {
                        setUser({ ...user, lastName: event.target.value });
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Username"
                      name="username"
                      className="py-3 px-4 block w-full border-gray-300 border rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      required
                      onChange={(event) => {
                        setUser({ ...user, username: event.target.value });
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
                        setUser({ ...user, password: event.target.value });
                      }}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <p className="text-center mt-4">
              Already have an account?{" "}
              <button
                onClick={() => setIsSigningUp(false)}
                className="text-blue-600 underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
