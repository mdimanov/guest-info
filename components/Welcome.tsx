import { Apartment, Lang } from "@/app/types";
import { useRouter, useSearchParams } from "next/navigation";

type WelcomeProps = {
  lang: Lang;
  apartment: Apartment;
  setApartment: (value: Apartment) => void;
};

export default function Welcome({
  lang,
  apartment,
  setApartment,
}: WelcomeProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (value: Apartment) => {
    setApartment(value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("apartment", value.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
        {lang === "bg" ? "Добре дошли!" : "Welcome!"}
      </h1>

      <div className="text-center text-gray-500 dark:text-gray-400">
        <p className="font-extralight text-sm pb-2">
          {lang === "bg"
            ? "За да бъде престоят Ви напълно спокоен и приятен, Министерството на туризма на България изисква да регистрираме данните на всеки гост. Моля, отделете минутка да попълните информацията по-долу."
            : "To ensure a smooth and pleasant stay, the Bulgarian Ministry of Tourism requires us to register the details of every guest. Please take a quick moment to fill in the information below."}
        </p>

        <p className="font-extralight text-sm pb-4">
          {lang === "bg"
            ? "Благодарим Ви, че ни помагате да направим Вашето посещение още по-приятно! 🌟"
            : "Thank you for helping us keep everything running perfectly during your visit! 🌟"}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">
          {lang === "bg" ? "Вашият апартамент" : "Your Apartment"}
        </h2>
        <div className="relative w-full">
          <select
            value={apartment ?? ""}
            onChange={(e) => handleSelect(e.target.value as Apartment)}
            className="
            w-full 
            border border-indigo-500 
            rounded-lg p-3 pr-10 
            bg-indigo-100 
            dark:bg-indigo-800
            text-gray-900
            dark:text-gray-100
            dark:border-indigo-400
            focus:outline-none focus:ring-1 focus:ring-indigo-500
            appearance-none
            cursor-pointer
          "
          >
            <option value={Apartment.Delux}>Dimanov 1 Delux</option>
            <option value={Apartment.Downtown}>Dimanov 2 Downtown</option>
          </select>

          {/* Custom Arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
