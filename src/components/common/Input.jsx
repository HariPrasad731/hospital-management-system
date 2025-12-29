export default function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm">{label}</label>}
      <input {...props} className="border rounded px-3 py-2" />
    </div>
  );
}
