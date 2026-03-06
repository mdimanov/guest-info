"use client";

import { Lang, Apartment } from "@/app/types";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type GuestFormProps = {
  lang: Lang;
  apartment: Apartment;
  setCurrentGuestIndex: (value: number) => void;
  currentGuestIndex: number;
  totalGuests: number;
  onNext: () => void;
};

export default function GuestForm({
  lang,
  apartment,
  setCurrentGuestIndex,
  currentGuestIndex,
  totalGuests,
  onNext,
}: GuestFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget; // save form reference

    const formData = new FormData(form);
    const guest = {
      fullName: formData.get("fullName"),
      egn: formData.get("egn"),
      idNumber: formData.get("idNumber"),
      birthDate: formData.get("birthDate"),
      citizenship: lang === "bg" ? "Българин" : formData.get("citizenship"),
      sex: formData.get("sex"),
      apartment,
    };

    const res = await fetch("/api/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(guest),
    });

    if (res.ok) {
      if (currentGuestIndex < totalGuests) {
        onNext(); // go to next guest

        // Only reset if form exists
        if (form) form.reset();
        setLoading(false);
      } else {
        setCurrentGuestIndex(1); // reset current guest index after submitting the form
        router.push("/thank-you"); // last guest
      }
    } else {
      alert(
        lang === "bg" ? "Неуспешно изпращане" : "Failed to submit guest info"
      );
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">
        {lang === "bg"
          ? `Адресна карта – Гост ${currentGuestIndex} от ${totalGuests}`
          : `Personal Information – Guest ${currentGuestIndex} of ${totalGuests}`}
      </h2>

      {/* Full Name */}
      <input
        type="text"
        name="fullName"
        placeholder={lang === "bg" ? "Пълно име" : "Full name"}
        required
        className="w-full border border-indigo-500 dark:bg-gray-700 dark:text-gray-100 p-3 rounded-lg focus:ring focus:outline-none"
      />

      {/* ID / Document Number */}
      <input
        type="text"
        name="idNumber"
        placeholder={lang === "bg" ? "Лична карта №" : "Document number"}
        required
        className="w-full border border-indigo-500 dark:bg-gray-700 dark:text-gray-100 p-3 rounded-lg focus:ring focus:outline-none"
      />

      {/* Citizenship input only for foreign */}
      {lang !== "bg" && (
        <input
          type="text"
          name="citizenship"
          placeholder="Citizenship"
          required
          className="w-full border border-indigo-500 dark:bg-gray-700 dark:text-gray-100 p-3 rounded-lg focus:ring focus:outline-none"
        />
      )}

      {/* EGN only for Bulgarian */}
      {lang === "bg" && (
        <input
          type="text"
          name="egn"
          placeholder="ЕГН"
          required
          className="w-full border border-indigo-500 dark:bg-gray-700 dark:text-gray-100 p-3 rounded-lg focus:ring focus:outline-none"
        />
      )}

      {/* Birth date & Sex */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="font-semibold text-sm mb-1">
            {lang === "bg" ? "Дата на раждане" : "Birth date"}
          </label>
          <input
            type="date"
            name="birthDate"
            required
            className="w-full border border-indigo-500 dark:bg-gray-700 dark:text-gray-100 p-3 rounded-lg focus:ring focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-sm mb-1">
            {lang === "bg" ? "Пол" : "Sex"}
          </label>
          <div className="flex gap-4 h-12.5 items-center">
            <label className="flex font-medium text-sm items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sex"
                value="male"
                required
                className="accent-indigo-500"
              />
              <span>{lang === "bg" ? "Мъж" : "Male"}</span>
            </label>

            <label className="flex font-medium text-sm items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sex"
                value="female"
                required
                className="accent-indigo-500"
              />
              <span>{lang === "bg" ? "Жена" : "Female"}</span>
            </label>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-500 cursor-pointer text-white px-4 py-2 rounded-lg w-full"
      >
        {loading
          ? lang === "bg"
            ? "Изпращане..."
            : "Submitting..."
          : currentGuestIndex < totalGuests
          ? lang === "bg"
            ? "Изпрати и продължи"
            : "Submit and Next"
          : lang === "bg"
          ? "Изпрати и завърши"
          : "Submit and Finish"}
      </button>
    </form>
  );
}
