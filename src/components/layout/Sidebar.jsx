import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck,
  FaFileInvoice,
  FaTimes,
} from "react-icons/fa";
import { useRole } from "../../context/RoleContext";

export default function Sidebar({ open, onClose }) {
  const { role } = useRole();

  const links = [
    {
      to: "/",
      label: "Dashboard",
      icon: <FaChartPie />,
      roles: ["Admin", "Doctor", "Receptionist"],
    },
    {
      to: "/patients",
      label: "Patients",
      icon: <FaUserInjured />,
      roles: ["Admin", "Receptionist"],
    },
    {
      to: "/doctors",
      label: "Doctors",
      icon: <FaUserMd />,
      roles: ["Admin", "Receptionist"],
    },
    {
      to: "/appointments",
      label: "Appointments",
      icon: <FaCalendarCheck />,
      roles: ["Admin", "Doctor", "Receptionist"],
    },
    {
      to: "/billing",
      label: "Billing",
      icon: <FaFileInvoice />,
      roles: ["Admin", "Receptionist"],
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 bg-gradient-to-b from-emerald-700 to-emerald-900 text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="px-6 py-5 text-2xl font-bold flex items-center justify-between">
          🏥 Hospital HMS
          <button
            className="md:hidden"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        {/* Nav */}
        <nav className="mt-4 flex-1 flex flex-col gap-1 px-3">
          {links
            .filter((l) => l.roles.includes(role))
            .map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                  }`
                }
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            ))}
        </nav>
      </aside>
    </>
  );
}
