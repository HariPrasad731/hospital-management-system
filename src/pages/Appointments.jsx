import { useEffect, useState } from "react";

const STORAGE_KEY = "hms_appointments";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patient, setPatient] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setAppointments(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = () => {
    if (!patient.trim()) return;

    setAppointments([
      ...appointments,
      {
        id: Date.now(),
        patient,
        status: "Pending",
      },
    ]);

    setPatient("");
  };

  const updateStatus = (id, status) => {
    setAppointments(
      appointments.map((a) =>
        a.id === id ? { ...a, status } : a
      )
    );
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          placeholder="Patient name"
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={addAppointment}
          className="bg-emerald-600 text-white px-4 rounded"
        >
          Book
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        {appointments.map((a) => (
          <div
            key={a.id}
            className="flex justify-between items-center p-4 border-b"
          >
            <span>{a.patient}</span>

            <select
              value={a.status}
              onChange={(e) =>
                updateStatus(a.id, e.target.value)
              }
              className="border rounded px-2 py-1"
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
