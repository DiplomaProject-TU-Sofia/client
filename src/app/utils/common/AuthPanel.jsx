"use client";

import React from "react";
import { useState } from "react";

import Image from "next/image";
import GoogleLoginButton from "./GoogleLoginButton";
import AppleLoginButton from "./AppleLoginButton";

import { handleLogIn, handleRegister } from "../services/auth";

export default function AuthPanel ({ setIsLoggedIn }) {
  const [isVisible, setVisible] = useState(false);
    const [registerView, setRegisterView] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleRegisterView = () => {
    setEmail("");
    setPassword("");
    setRegisterView(!registerView);
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
            <div className="p-10 flex flex-col justify-center items-center gap-5 text-[#BEAB96] font-mono">
              {registerView ? (
                <>
                  <div>
                    <h1 className="text-3xl font-mono p-5">Register</h1>
                    <hr />
                  </div>
                  <div className="flex flex-col font-mono gap-10">
                    <div className="flex flex-col items-center font-mono gap-5 mt-5">
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
                        <button onClick={handleRegister} className="bg-[#BEAB96] font-mono text-white p-4 rounded-xl w-[15vw]">
                          Register
                        </button>
                      </div>
                    </div>

                    <hr />
                    <div className="flex flex-row justify-around gap-10">
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
                      <div className="flex items-center justify-center flex-row gap-2">
                        <input className="w-8 h-8" type="checkbox" />
                        <label className="text-xl font-mono">Remember me</label>
                      </div>
                      <button onClick={handleLogIn} className="bg-[#BEAB96] font-mono text-white p-4 rounded-xl w-[15vw]">
                        Log In
                      </button>
                    </div>

                    <hr />
                    <div className="flex flex-row justify-between">
                      <AppleLoginButton />
                      <GoogleLoginButton />
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
    </>
  );
}
