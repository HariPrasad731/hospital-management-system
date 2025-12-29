import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", patients: 400 },
  { month: "Feb", patients: 300 },
  { month: "Mar", patients: 500 },
  { month: "Apr", patients: 450 },
  { month: "May", patients: 600 },
  { month: "Jun", patients: 550 },
  { month: "Jul", patients: 700 },
  { month: "Aug", patients: 650 },
  { month: "Sep", patients: 720 },
  { month: "Oct", patients: 680 },
  { month: "Nov", patients: 750 },
  { month: "Dec", patients: 800 },
];

export default function PatientStatsChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">
          Patient Statistics
        </h3>

        <select className="border rounded-md px-3 py-1 text-sm">
          <option>Year 2024</option>
          <option>Year 2023</option>
        </select>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="patients"
              stroke="#059669"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
              animationDuration={1200}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
