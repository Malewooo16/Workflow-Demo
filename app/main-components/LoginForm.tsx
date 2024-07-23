"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setLoading(true);

    const signInData = await signIn("credentials", {
      username: userName,
      password: password,
      redirect: false,
    });
    if (signInData?.error) {
      setLoading(false);
      setErrorMessage("Login Error!! Please check credentials");
    } else {
      router.push("/workflows");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center py-6  w-4/5 2xl:w-1/4 sm:w-3/5 md:w-2/5 card-bordered bg-base-200  ">
      <div className="flex flex-col justify-center mb-4">
        <Image
          className="w-30 rounded-full"
          src="/wma-logo.png"
          alt={"logo"}
          height={150}
          width={150}
        />
        <h2 className="text-center text-3xl mt-3">
          {" "}
          Elegant <br /> Workflow{" "}
        </h2>
      </div>
      {errorMessage && (
        <div className=" p-4">
          {" "}
          <p className="text-error text-lg text-center">
            {" "}
            {errorMessage}{" "}
          </p>{" "}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="join join-vertical md:w-[300px]">
          <div className="form-control w-full max-w-xs join-item">
            <label className="label">Username</label>
            <input
              type="text"
              placeholder="Type here"
              className="input  w-full max-w-xs focus:outline-0 focus:border-gray-500 "
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-control w-full max-w-xs join-item mb-4">
            <label className="label">Password</label>
            <input
              type="password"
              placeholder="Type here"
              className="input  w-full max-w-xs focus:outline-0 focus:border-gray-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!loading ? (
            <button className="btn  my-4 bg-base-300" type="submit">
              {" "}
              Login{" "}
            </button>
          ) : (
            <button className="btn  my-4 bg-base-300">
              {" "}
              <span className="loading loading-bars loading-sm"></span>{" "}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
