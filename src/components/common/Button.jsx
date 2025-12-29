export default function Button({ children, variant = "primary", ...props }) {
  const styles = {
    primary: "bg-blue-600 text-white",
    danger: "bg-red-600 text-white",
  };

  return (
    <button
      {...props}
      className={`px-4 py-2 rounded ${styles[variant]}`}
    >
      {children}
    </button>
  );
}
