"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <ThemeToggle />
      <div className="text-center max-w-md bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg">
        <h1 className="text-6xl mb-4">😢</h1>
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Oops! Page not found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The page you are looking for does not exist. Maybe try one of the
          links below?
        </p>
        <Link
          href="/"
          className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
