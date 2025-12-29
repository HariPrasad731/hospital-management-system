import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";

const STORAGE_KEY = "hms_patients";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  /* Load */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setPatients(JSON.parse(stored));
  }, []);

  /* Save */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
  }, [patients]);

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingId(null);
    setName("");
    setError("");
    setOpen(true);
  };

  const openEdit = (patient) => {
    setEditingId(patient.id);
    setName(patient.name);
    setError("");
    setOpen(true);
  };

  const savePatient = () => {
    if (!name.trim()) {
      setError("Patient name is required");
      return;
    }

    if (editingId) {
      setPatients(
        patients.map((p) =>
          p.id === editingId ? { ...p, name } : p
        )
      );
    } else {
      setPatients([...patients, { id: Date.now(), name }]);
    }

    setOpen(false);
    setName("");
    setEditingId(null);
  };

  const deletePatient = (id) => {
    if (!window.confirm("Delete this patient?")) return;
    setPatients(patients.filter((p) => p.id !== id));
  };

  return (
    <div>
      <button
        onClick={openAdd}
        className="mb-4 bg-emerald-600 text-white px-4 py-2 rounded"
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
              <span>{p.name}</span>

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

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editingId ? "Edit Patient" : "Add Patient"}
      >
        <Input
          label="Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={savePatient}
          className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update" : "Save"}
        </button>
      </Modal>
    </div>
  );
}
