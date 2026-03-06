"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState } from "react";

type Guest = {
  id: string;
  fullName: string;
  egn?: string;
  idNumber?: string;
  birthDate: string;
  sex: string;
  citizenship: string;
  apartment: string;
  createdAt: string;
};

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filterApartment, setFilterApartment] = useState<string>("all");

  useEffect(() => {
    fetch("/api/guests")
      .then((res) => res.json())
      .then(setGuests)
      .catch(console.error);
  }, []);

  // Filter guests based on selected apartment
  const filteredGuests =
    filterApartment === "all"
      ? guests
      : guests.filter((g) => g.apartment === filterApartment);

  return (
    <main className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <ThemeToggle />
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        Списък с гости
      </h1>

      {/* Filter */}
      <div className="max-w-xl mb-4 flex gap-4 items-center">
        <label className="font-semibold text-gray-900 dark:text-white">
          Покажи:
        </label>
        <select
          value={filterApartment}
          onChange={(e) => setFilterApartment(e.target.value)}
          className="border border-indigo-500 rounded-lg p-2 dark:bg-gray-800 dark:text-gray-100"
        >
          <option value="all">Всички</option>
          <option value="delux">Апартамент Диманов 1 Delux</option>
          <option value="downtown">Апартамент Диманов 2 Downtown</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-w-8xl shadow-xl mx-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Име</th>
              <th className="px-4 py-2">ЕГН</th>
              <th className="px-4 py-2">Документ №</th>
              <th className="px-4 py-2">Роден на</th>
              <th className="px-4 py-2">Пол</th>
              <th className="px-4 py-2">Гражданство</th>
              <th className="px-4 py-2">Апартамент</th>
              <th className="px-4 py-2">Добавен на</th>
            </tr>
          </thead>
          <tbody>
            {filteredGuests.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-4 text-gray-500">
                  Не са открити гости
                </td>
              </tr>
            ) : (
              filteredGuests.map((guest) => (
                <tr
                  key={guest.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-4 py-2 text-gray-900 dark:text-white">
                    {guest.fullName}
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-white text-center">
                    {guest.egn || "-"}
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-white text-center">
                    {guest.idNumber || "-"}
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-white text-center">
                    {new Date(guest.birthDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-white text-center">
                    {guest.sex === "male"
                      ? "Мъж"
                      : guest.sex === "female"
                      ? "Жена"
                      : "-"}
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-white text-center">
                    {guest.citizenship}
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-white text-center">
                    {guest.apartment
                      ? guest.apartment.charAt(0).toUpperCase() +
                        guest.apartment.slice(1)
                      : "-"}
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-white text-center">
                    {guest.createdAt
                      ? new Date(guest.createdAt).toLocaleDateString("en-GB")
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
