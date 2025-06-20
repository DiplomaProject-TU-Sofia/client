"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-100 to-purple-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-6xl font-bold text-pink-500">404</h1>
        <h2 className="text-xl font-semibold text-gray-800 mt-2">Page Not Found</h2>
        <p className="mt-2 text-sm text-gray-500">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-6 w-full py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}