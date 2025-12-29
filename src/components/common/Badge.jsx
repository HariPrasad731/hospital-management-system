export default function Badge({ text, color }) {
  const colors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Confirmed: "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-2 py-1 rounded text-sm ${colors[color]}`}>
      {text}
    </span>
  );
}
