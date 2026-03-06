"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Lang } from "@/app/types";

type CitizenshipSelectProps = {
  lang: Lang;
  setLang: (value: Lang) => void;
};

export default function CitizenshipSelect({
  lang,
  setLang,
}: CitizenshipSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (value: Lang) => {
    setLang(value);
    // Update the URL query param without refreshing
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", value); // key matches your usage
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">
        {lang === "bg" ? "Националност" : "Nationality"}
      </h2>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => handleSelect("bg")}
          className={`flex flex-col items-center w-full border border-indigo-500 rounded-lg p-4 
            hover:bg-indigo-50 dark:hover:bg-indigo-700 transition cursor-pointer
            ${lang === "bg" ? "bg-indigo-100 dark:bg-indigo-800" : ""}`}
        >
          <Image
            width={90}
            height={54}
            src="/flags/BG.png"
            alt="Bulgarian Flag"
            className="my-2"
          />
          <span className="font-semibold text-sm">България</span>
        </button>
        <button
          onClick={() => handleSelect("en")}
          className={`flex flex-col items-center w-full border border-indigo-500 rounded-lg p-4 
     hover:bg-indigo-50 dark:hover:bg-indigo-700 transition cursor-pointer
     ${lang === "en" ? "bg-indigo-100 dark:bg-indigo-800" : ""}`}
        >
          <Image
            width={90}
            height={54}
            src="/flags/EN.png"
            alt="Foreign Flag"
            className="my-2"
          />
          <span className="font-semibold text-sm">Foreign</span>
        </button>
      </div>
    </div>
  );
}
