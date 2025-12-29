import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaPlus,
  FaBars,
} from "react-icons/fa";
import { useRole } from "../../context/RoleContext";

/* Static doctors data (used for search routing) */
const doctorsData = [
  { name: "Dr. Ramesh Kumar", specialization: "Cardiologist" },
  { name: "Dr. Suma Reddy", specialization: "Dentist" },
  { name: "Dr. Arjun Rao", specialization: "Orthopedic" },
  { name: "Dr. Lakshmi Devi", specialization: "General Physician" },
];

export default function Header({ setSidebarOpen }) {
  const navigate = useNavigate();
  const { role, setRole } = useRole();

  const [query, setQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  /* Close dropdowns on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Keyboard accessibility (ESC key) */
  useEffect(() => {
    const escHandler = (e) => {
      if (e.key === "Escape") {
        setShowMobileSearch(false);
        setShowNotifications(false);
        setShowProfile(false);
      }
    };
    document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, []);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    navigate("/");
  };

  const logout = () => {
    setShowProfile(false);
    setRole("Admin");
    navigate("/");
  };

  /* SEARCH LOGIC (Patients + Doctors) */
  const handleSearch = (e) => {
    if (e.key !== "Enter" || !query.trim()) return;

    const q = query.toLowerCase();

    const patients =
      JSON.parse(localStorage.getItem("hms_patients")) || [];

    if (patients.some((p) => p.name.toLowerCase().includes(q))) {
      navigate(`/patients?search=${query}`);
      return;
    }

    if (
      doctorsData.some(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialization.toLowerCase().includes(q)
      )
    ) {
      navigate(`/doctors?search=${query}`);
      return;
    }

    navigate(`/patients?search=${query}`);
  };

  return (
    <header className="bg-white border-b px-4 md:px-6 py-4 flex items-center justify-between relative">
      {/* LEFT */}
      <div className="flex items-center gap-4 min-w-0">
        {/* ☰ Mobile sidebar */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <FaBars size={20} />
        </button>

        <h1 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
          Hospital Management System
        </h1>

        {/* Desktop Search */}
        <div className="relative hidden md:block">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search patients or doctors..."
            className="pl-10 pr-4 py-2 border rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Search patients or doctors"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Mobile Search Icon */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setShowMobileSearch(true)}
          aria-label="Open search"
        >
          <FaSearch />
        </button>

        {(role === "Admin" || role === "Receptionist") && (
          <button
            onClick={() => navigate("/patients")}
            className="hidden md:flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700"
          >
            <FaPlus size={12} />
            Add Patient
          </button>
        )}

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <FaBell
            className="text-gray-600 cursor-pointer"
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
            aria-label="Notifications"
          />
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
              <p className="px-4 py-2 text-sm font-semibold border-b">
                Notifications
              </p>
              <div className="px-4 py-2 text-sm text-gray-600">
                No new notifications
              </div>
            </div>
          )}
        </div>

        {/* Role Switch */}
        <select
          value={role}
          onChange={handleRoleChange}
          className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          aria-label="Select role"
        >
          <option value="Admin">Admin</option>
          <option value="Doctor">Doctor</option>
          <option value="Receptionist">Receptionist</option>
        </select>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <FaUserCircle
            size={28}
            className="text-gray-600 cursor-pointer"
            onClick={() => setShowProfile(!showProfile)}
            aria-label="Profile menu"
          />
          {showProfile && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-50">
              <button
                onClick={() => {
                  setShowProfile(false);
                  navigate("/");
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE SEARCH DROPDOWN */}
      {showMobileSearch && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-24"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white w-11/12 max-w-md rounded-lg p-4 shadow-lg">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                handleSearch(e);
                if (e.key === "Enter") setShowMobileSearch(false);
              }}
              placeholder="Search patients or doctors..."
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Search patients or doctors"
            />

            <button
              onClick={() => setShowMobileSearch(false)}
              className="mt-3 text-sm text-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
