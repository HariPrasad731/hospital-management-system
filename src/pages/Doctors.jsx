import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const doctorsData = [
  {
    id: 1,
    name: "Dr. Ramesh Kumar",
    specialization: "Cardiologist",
    availability: "Available",
  },
  {
    id: 2,
    name: "Dr. Suma Reddy",
    specialization: "Dentist",
    availability: "Unavailable",
  },
  {
    id: 3,
    name: "Dr. Arjun Rao",
    specialization: "Orthopedic",
    availability: "Available",
  },
  {
    id: 4,
    name: "Dr. Lakshmi Devi",
    specialization: "General Physician",
    availability: "Available",
  },
];

export default function Doctors() {
  const [doctors] = useState(doctorsData);
  const [searchParams] = useSearchParams();

  const search = (searchParams.get("search") || "").toLowerCase();

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search) ||
      doc.specialization.toLowerCase().includes(search)
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Doctors
      </h2>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filteredDoctors.length === 0 ? (
          <p className="p-4 text-gray-500">
            No doctors found
          </p>
        ) : (
          filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="flex justify-between items-center p-4 border-b last:border-b-0"
            >
              {/* Doctor Info */}
              <div>
                <p className="font-medium text-gray-800">
                  {doc.name}
                </p>
                <p className="text-sm text-gray-500">
                  {doc.specialization}
                </p>
              </div>

              {/* Availability */}
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  doc.availability === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {doc.availability}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
