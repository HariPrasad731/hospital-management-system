export default function StatCard({
  title,
  value,
  icon,
  trend,
  trendType = "up",
}) {
  return (
    <div
      className="bg-white rounded-xl p-5 shadow-sm
      transition-all duration-300 ease-out
      hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex items-center justify-between">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          {icon}
        </div>

        <span
          className={`text-sm font-medium ${
            trendType === "up"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {trendType === "up" ? "↑" : "↓"} {trend}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800">
          {value}
        </h2>
      </div>
    </div>
  );
}
