"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import GoogleLoginButton from "./GoogleLoginButton";

import { logIn, register } from "../services/auth";
import { toast, ToastContainer } from "react-toastify";
import Loader from "./Loader";

export default function AuthPanel({ setIsLoggedIn, isVisible, setVisible }) {
  const [registerView, setRegisterView] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();

  const router = useRouter();

  useEffect(() => {
    if (data != undefined) {
      setVisible(false);
      setEmail("");
      setPassword("");
      setIsLoggedIn(true);
      if (data.role === "Admin") router.push("/admin");
      if (data.role === "Worker") router.push(`/appointment`);
      setLoading(false);
      //only token and role , need id
    }
  }, [data]);

  const toggleRegisterView = () => {
    setEmail("");
    setPassword("");
    setRegisterView(!registerView);
  };

  const handleLogIn = async () => {
    if (
      email != undefined &&
      email != "" &&
      password != undefined &&
      password != ""
    ) {
      setLoading(true);
      await logIn(email, password, setData, toast).then(() => { 
          toast.success("Successfully logged in")
      });
    } else {
      toast.info("Please fill all fields");
    }
  };

  const handleRegister = async () => {
    if (
      firstName != undefined &&
      firstName != "" &&
      lastName != undefined &&
      lastName != "" &&
      email != undefined &&
      email != "" &&
      password != undefined &&
      password != "" &&
      confirmPassword != undefined &&
      confirmPassword != ""
    ) {
      setLoading(true);
      const status = await register(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        toast
      ).then(() => {
        setLoading(false);
      });
      if (status === 200) {
        setRegisterView(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } else {
      toast.info("Please fill all fields");
    }
  };

  return (
    <>
      <Image
        className="hover:bg-[#C6B6A7] rounded-full cursor-pointer"
        onClick={() => setVisible(true)}
        src={"/assets/user.svg"}
        width={30}
        height={20}
        alt="logo"
      />
      {isVisible ? (
        <>
          <div className="z-20 fixed top-0 right-0 w-[40vw] h-[100vh] bg-white animate-fadeIn">
            <ToastContainer/>
            <div className="p-10 flex flex-col justify-center items-center gap-5 text-[#BEAB96] font-mono">
              {registerView ? (
                <>
                  <div>
                    <h1 className="text-3xl font-mono p-5">Register</h1>
                    <hr />
                  </div>
                  <div className="flex flex-col font-mono">
                    <div className="grid grid-cols-2 items-center font-mono gap-5 mt-5">
                      <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="border-2 font-mono border-gray p-4 rounded-xl w-[15vw]"
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="border-2 font-mono border-gray p-4 rounded-xl w-[15vw]"
                        placeholder="Last Name"
                      />
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-2 font-mono border-gray p-4 rounded-xl w-[15vw]"
                        placeholder="Email Address"
                      />
                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-2 font-mono border-gray p-4 rounded-xl w-[15vw]"
                        placeholder="Password"
                      />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border-2 font-mono border-gray p-4 rounded-xl w-[15vw]"
                        placeholder="Confirm Password"
                      />
                      <div className="flex flex-row justify-between items-center">
                        <button
                          onClick={handleRegister}
                          className="bg-[#BEAB96] font-mono text-white p-4 rounded-xl w-[15vw]"
                        >
                          Register
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-row mt-5 justify-around">
                      <label className="text-xl font-mono">
                        Already have an account ?
                      </label>
                      <label
                        className="text-xl font-mono underline cursor-pointer"
                        onClick={toggleRegisterView}
                      >
                        Proceed to Login
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h1 className="text-3xl font-mono p-10">
                      Log into your account
                    </h1>
                    <hr />
                  </div>
                  <div className="flex flex-col font-mono gap-10">
                    <div className="flex flex-row font-mono gap-5 mt-5">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-2 font-mono border-gray p-4 rounded-xl w-[15vw]"
                        placeholder="Email Address"
                      />
                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-2 font-mono border-gray p-4 rounded-xl w-[15vw]"
                        placeholder="Password"
                      />
                    </div>

                    <div className="flex flex-row justify-between items-center">
                      <GoogleLoginButton/>
                      <button
                        onClick={handleLogIn}
                        className="bg-[#BEAB96] font-mono text-white p-4 rounded-xl w-[15vw]"
                      >
                        Log In
                      </button>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <label className="text-xl font-mono">
                        Don't have an account ?
                      </label>
                      <label
                        className="text-xl font-mono underline cursor-pointer"
                        onClick={toggleRegisterView}
                      >
                        Register now
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div
            className="z-30 absolute top-0 right-[40vw] hover:cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <Image
              src={"/assets/close.svg"}
              width={25}
              height={20}
              alt="logo"
            />
          </div>
          <div
            className="fixed z-20 h-[100vh] w-[60vw] right-[40vw] top-0 bg-black bg-opacity-50 animate-fadeIn"
            onClick={() => setVisible(false)}
          ></div>
        </>
      ) : null}
      {isLoading ? <Loader /> : null}
    </>
  );
}
