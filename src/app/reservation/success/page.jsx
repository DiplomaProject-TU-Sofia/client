"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  return (
     
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-100 to-purple-50 overflow-hidden px-4">
      {/* Floating blobs */}
      <div className="absolute w-72 h-72 bg-pink-300 rounded-full opacity-30 blur-2xl animate-floating-slow top-[-100px] left-[-100px]" />
      <div className="absolute w-64 h-64 bg-purple-300 rounded-full opacity-30 blur-2xl animate-floating-slower bottom-[-80px] right-[-80px]" />
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="mb-6">
          {/* Success Icon (optional) */}
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl">
            ✓
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Reservation Confirmed
          </h1>
          <p className="mt-2 text-gray-600 text-sm">
            Thank you! Your reservation has been successfully submitted.
          </p>
          <p className="mt-2 text-gray-600 text-sm">
            You will receive email notification with your details now and once
            your reservation is near by!
          </p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
