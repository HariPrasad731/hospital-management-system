import { useRole } from "../context/RoleContext";
import StatCard from "../components/cards/StatCard";
import PatientStatsChart from "../components/charts/PatientStatsChart";
import {
  FaCalendarCheck,
  FaPhoneAlt,
  FaUserMd,
  FaUsers,
} from "react-icons/fa";

/* ---------------- ADMIN DASHBOARD ---------------- */
function AdminView() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Appointments"
          value="1,250"
          icon={<FaCalendarCheck />}
          trend="4.5%"
        />
        <StatCard
          title="Call Consultancy"
          value="1,002"
          icon={<FaPhoneAlt />}
          trend="3.2%"
        />
        <StatCard
          title="Surgeries"
          value="60"
          icon={<FaUserMd />}
          trend="2.1%"
          trendType="down"
        />
        <StatCard
          title="Total Patients"
          value="1,835"
          icon={<FaUsers />}
          trend="6.8%"
        />
      </div>

      {/* Chart + Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-4 md:p-6 shadow-sm overflow-x-auto">
          <PatientStatsChart />
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
          <h3 className="font-semibold mb-4">
            Today’s Schedule
          </h3>

          <ul className="space-y-3 text-sm">
            <li className="flex justify-between gap-4">
              <span className="text-gray-500">
                09:00 AM
              </span>
              <span>Dentist Meetup</span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="text-gray-500">
                11:30 AM
              </span>
              <span>Cardiology Check</span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="text-gray-500">
                02:00 PM
              </span>
              <span>Surgery Review</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------------- DOCTOR DASHBOARD ---------------- */
function DoctorView() {
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm max-w-xl">
      <h2 className="text-lg md:text-xl font-semibold mb-4">
        Doctor Dashboard
      </h2>

      <ul className="space-y-3 text-sm md:text-base">
        <li>09:00 AM – Patient Checkup</li>
        <li>11:00 AM – Surgery</li>
        <li>02:00 PM – Follow-up</li>
      </ul>
    </div>
  );
}

/* ---------------- RECEPTION DASHBOARD ---------------- */
function ReceptionView() {
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm max-w-xl">
      <h2 className="text-lg md:text-xl font-semibold mb-4">
        Reception Dashboard
      </h2>

      <ul className="space-y-3 text-sm md:text-base">
        <li>Register new patient</li>
        <li>Schedule appointments</li>
        <li>Billing assistance</li>
      </ul>
    </div>
  );
}

/* ---------------- MAIN DASHBOARD ---------------- */
export default function Dashboard() {
  const { role } = useRole();

  if (role === "Doctor") return <DoctorView />;
  if (role === "Receptionist") return <ReceptionView />;

  return <AdminView />;
}
