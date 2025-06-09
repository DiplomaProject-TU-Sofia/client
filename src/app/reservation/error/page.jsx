import React from 'react'

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <p className="text-lg text-gray-700">
        We’re sorry, but an unexpected error has occurred.
      </p>
    </div>
  );
}