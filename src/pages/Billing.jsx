import { useEffect, useState } from "react";

const servicesData = [
  { id: 1, name: "Consultation", price: 500 },
  { id: 2, name: "X-Ray", price: 1200 },
  { id: 3, name: "Blood Test", price: 800 },
];

export default function Billing() {
  const [patientName, setPatientName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [services, setServices] = useState(
    JSON.parse(localStorage.getItem("hms_billing")) ||
      servicesData.map((s) => ({ ...s, qty: 0 }))
  );

  const billDate = new Date().toLocaleDateString();

  useEffect(() => {
    localStorage.setItem("hms_billing", JSON.stringify(services));
  }, [services]);

  const handleQtyChange = (id, qty) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, qty: Number(qty) } : s
      )
    );
  };

  const totalAmount = services.reduce(
    (sum, s) => sum + s.qty * s.price,
    0
  );

  const handleCheckout = () => {
    if (!patientName.trim()) {
      alert("Please enter patient name");
      return;
    }
    if (totalAmount === 0) {
      alert("Please select at least one service");
      return;
    }
    if (!paymentMethod) {
      alert("Please select payment method");
      return;
    }

    const billData = {
      patientName,
      billDate,
      services,
      totalAmount,
      paymentMethod,
    };

    localStorage.setItem(
      "hms_last_bill",
      JSON.stringify(billData)
    );

    alert("Payment successful!");

    setPatientName("");
    setPaymentMethod("");
    setServices(
      servicesData.map((s) => ({ ...s, qty: 0 }))
    );
    localStorage.removeItem("hms_billing");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Billing
      </h2>

      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 space-y-6 max-w-4xl">
        {/* Patient Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Patient Name
            </label>
            <input
              value={patientName}
              onChange={(e) =>
                setPatientName(e.target.value)
              }
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter patient name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Bill Date
            </label>
            <input
              value={billDate}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-medium mb-2">
            Invoice
          </h3>

          {/* 🔑 Responsive Table Wrapper */}
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full text-sm border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-2">
                    Service
                  </th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id} className="border-t">
                    <td className="p-2">
                      {s.name}
                    </td>
                    <td className="p-2 text-center">
                      ₹{s.price}
                    </td>
                    <td className="p-2 text-center">
                      <input
                        type="number"
                        min="0"
                        value={s.qty}
                        onChange={(e) =>
                          handleQtyChange(
                            s.id,
                            e.target.value
                          )
                        }
                        className="w-20 border rounded px-2 py-1"
                      />
                    </td>
                    <td className="p-2 text-center">
                      ₹{s.qty * s.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">
                Select payment method
              </option>
              <option>Cash</option>
              <option>Card</option>
              <option>UPI</option>
            </select>
          </div>

          <div className="text-left md:text-right">
            <p className="text-gray-600 text-sm">
              Total
            </p>
            <p className="text-2xl font-semibold">
              ₹{totalAmount}
            </p>
          </div>
        </div>

        {/* Checkout */}
        <div className="flex justify-end">
          <button
            onClick={handleCheckout}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 w-full md:w-auto"
          >
            Checkout & Pay
          </button>
        </div>
      </div>
    </div>
  );
}
