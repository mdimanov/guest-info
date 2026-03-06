"use client";
import { useLang } from "../context/LangContext";
import ThemeToggle from "@/components/ThemeToggle";

export default function ThankYouPage() {
  const { lang } = useLang();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <ThemeToggle />
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          {lang === "bg" ? "Благодарим Ви!" : "Thank you!"}
        </h1>

        <p className="text-lg text-gray-400 dark:text-gray-300 mb-4">
          {lang === "bg"
            ? "Информацията беше успешно изпратена."
            : "Information submitted successfully."}
        </p>

        <p className="text-xl font-medium my-5 text-gray-900 dark:text-white mb-6">
          {lang === "bg"
            ? "Благодарим, че ни помогнахте! Така всичко върви гладко и приятно. 🏡"
            : "Thanks for helping! This keeps everything running smoothly and enjoyable. 🏡"}
        </p>

        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {lang === "bg"
            ? "Желаем Ви чудесен престой и много щастливи моменти по време на Вашето време в красивия"
            : "We wish you a wonderful stay and many happy moments during your time in beautiful"}{" "}
          <span className="font-semibold">Burgas</span> 🌊☀️
        </p>
      </div>
    </main>
  );
}
