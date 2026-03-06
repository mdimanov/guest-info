"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Apartment } from "@/app/types";
import Welcome from "@/components/Welcome";
import CitizenshipSelect from "@/components/CitizenshipSelect";
import ThemeToggle from "@/components/ThemeToggle";
import GuestNumberSelect from "@/components/GuestsNumberSelect";
import GuestForm from "@/components/GuestForm";
import { useLang } from "./context/LangContext";

export default function Home() {
  const searchParams = useSearchParams();
  const { lang, setLang } = useLang();

  const initialApartment = searchParams.get("apartment") as Apartment | null;
  const [apartment, setApartment] = useState<Apartment>(
    initialApartment ?? Apartment.Delux
  );

  const initialGuests = parseInt(searchParams.get("guests") || "1", 10);
  const [selectedGuests, setSelectedGuests] = useState(
    initialGuests >= 1 && initialGuests <= 4 ? initialGuests : 1
  );

  const [currentGuestIndex, setCurrentGuestIndex] = useState(1);

  const handleNext = () => {
    if (currentGuestIndex < selectedGuests) {
      setCurrentGuestIndex((prev) => prev + 1);
    } else {
      // All guests submitted, redirect handled inside GuestForm
    }
  };

  return (
    <main className="min-h-screen bg-gray-950/5 dark:bg-gray-900 dark:text-gray-100 transition-colors flex flex-col items-center justify-center gap-8 p-4">
      <div className="w-full flex flex-col gap-5 max-w-lg rounded-lg bg-white px-6 py-8 shadow-xl dark:bg-gray-800 transition-colors">
        <ThemeToggle />
        <Welcome
          lang={lang}
          apartment={apartment}
          setApartment={setApartment}
        />
        <CitizenshipSelect lang={lang} setLang={setLang} />
        <GuestNumberSelect
          lang={lang}
          selectedGuests={selectedGuests}
          setSelectedGuests={setSelectedGuests}
        />
        <GuestForm
          lang={lang}
          apartment={apartment}
          setCurrentGuestIndex={setCurrentGuestIndex}
          currentGuestIndex={currentGuestIndex}
          totalGuests={selectedGuests}
          onNext={handleNext} // This will increment the guest index
        />
      </div>
    </main>
  );
}
