import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";

const STORAGE_KEY = "hms_patients";

const MEDICAL_HISTORY = [
  "Diabetes",
  "Hypertension",
  "Asthma",
  "Heart Disease",
  "Thyroid",
];

const emptyForm = {
  firstName: "",
  lastName: "",
  gender: "",
  phone: "",
  dob: "",
  maritalStatus: "",
  street: "",
  city: "",
  state: "",
  insurance: "",
  medicalHistory: [],
};

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const search = (searchParams.get("search") || "").toLowerCase();

  /* Load */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setPatients(JSON.parse(stored));
  }, []);

  /* Save */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
  }, [patients]);

  /* Search */
  const filteredPatients = patients.filter((p) =>
    `${p.firstName} ${p.lastName} ${p.phone}`
      .toLowerCase()
      .includes(search)
  );

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setOpen(true);
  };

  const openEdit = (patient) => {
    setEditingId(patient.id);
    setForm({
      ...patient,
      ...patient.address,
    });
    setError("");
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const toggleHistory = (item) => {
    setForm((prev) => ({
      ...prev,
      medicalHistory: prev.medicalHistory.includes(item)
        ? prev.medicalHistory.filter((h) => h !== item)
        : [...prev.medicalHistory, item],
    }));
  };

  const savePatient = () => {
    if (!form.firstName || !form.phone) {
      setError("First name and phone are required");
      return;
    }

    const patientData = {
      id: editingId || Date.now(),
      firstName: form.firstName,
      lastName: form.lastName,
      gender: form.gender,
      phone: form.phone,
      dob: form.dob,
      maritalStatus: form.maritalStatus,
      insurance: form.insurance,
      medicalHistory: form.medicalHistory,
      address: {
        street: form.street,
        city: form.city,
        state: form.state,
      },
    };

    if (editingId) {
      setPatients(
        patients.map((p) =>
          p.id === editingId ? patientData : p
        )
      );
    } else {
      setPatients([...patients, patientData]);
    }

    setOpen(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  const deletePatient = (id) => {
    if (!window.confirm("Delete this patient?")) return;
    setPatients(patients.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <button
        onClick={openAdd}
        className="bg-emerald-600 text-white px-4 py-2 rounded"
      >
        + Add Patient
      </button>

      <div className="bg-white rounded-xl shadow-sm">
        {filteredPatients.length === 0 ? (
          <p className="p-4 text-gray-500">No patients found</p>
        ) : (
          filteredPatients.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center p-4 border-b"
            >
              <div>
                <p className="font-medium">
                  {p.firstName} {p.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {p.gender} • {p.phone}
                </p>
              </div>

              <div className="flex gap-4 text-sm">
                <button
                  onClick={() => openEdit(p)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePatient(p.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editingId ? "Edit Patient" : "Add Patient"}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
            <Input
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

          <Input
            type="date"
            label="Date of Birth"
            name="dob"
            value={form.dob}
            onChange={handleChange}
          />

          {/* Gender */}
          <div>
            <p className="text-sm font-medium">Gender</p>
            <div className="flex gap-4">
              {["Male", "Female"].map((g) => (
                <label key={g} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={form.gender === g}
                    onChange={handleChange}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          {/* Marital */}
          <div>
            <p className="text-sm font-medium">Marital Status</p>
            <div className="flex gap-4 flex-wrap">
              {["Single", "Married", "Divorced", "Widow"].map(
                (m) => (
                  <label
                    key={m}
                    className="flex items-center gap-1"
                  >
                    <input
                      type="radio"
                      name="maritalStatus"
                      value={m}
                      checked={form.maritalStatus === m}
                      onChange={handleChange}
                    />
                    {m}
                  </label>
                )
              )}
            </div>
          </div>

          {/* Address */}
          <Input
            label="Street"
            name="street"
            value={form.street}
            onChange={handleChange}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
            />
            <Input
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Insurance Name"
            name="insurance"
            value={form.insurance}
            onChange={handleChange}
          />

          {/* Medical History */}
          <div>
            <p className="text-sm font-medium">
              Past Medical History
            </p>
            <div className="grid grid-cols-2 gap-2">
              {MEDICAL_HISTORY.map((h) => (
                <label
                  key={h}
                  className="flex items-center gap-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={form.medicalHistory.includes(
                      h
                    )}
                    onChange={() => toggleHistory(h)}
                  />
                  {h}
                </label>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            onClick={savePatient}
            className="w-full bg-emerald-600 text-white py-2 rounded"
          >
            {editingId ? "Update Patient" : "Save Patient"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
