"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lang } from "@/app/types";
import { UserIcon, UsersIcon } from "@heroicons/react/24/solid";

type GuestNumberSelectProps = {
  lang: Lang;
  selectedGuests: number;
  setSelectedGuests: (value: number) => void;
};

export default function GuestNumberSelect({
  lang,
  selectedGuests,
  setSelectedGuests,
}: GuestNumberSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (value: number) => {
    setSelectedGuests(value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("guests", value.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">
        {lang === "bg" ? "Брой гости" : "Number of Guests"}
      </h2>
      <div className="flex gap-4 justify-center">
        {[1, 2, 3, 4].map((num) => (
          <button
            key={num}
            onClick={() => handleSelect(num)}
            className={`flex flex-col items-center w-full border border-indigo-500 rounded-lg p-1 sm:p-2 md:p-3
              hover:bg-indigo-50 dark:hover:bg-indigo-700 transition cursor-pointer
              ${
                selectedGuests === num ? "bg-indigo-100 dark:bg-indigo-800" : ""
              }`}
          >
            {num === 1 ? (
              <UserIcon className="w-7 h-7 text-indigo-500 mb-1" />
            ) : (
              <UsersIcon className="w-7 h-7 text-indigo-500 mb-1" />
            )}
            <span className="font-semibold text-sm whitespace-nowrap">
              {lang === "bg"
                ? `${num} ${num > 1 ? "гости" : "гост"}`
                : `${num} Guest${num > 1 ? "s" : ""}`}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
