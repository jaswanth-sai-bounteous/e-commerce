import { useState } from "react"
import { useCart } from "@/context/CartContext"

export default function Checkout() {
  const { cart, total, clearCart } = useCart()

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    paymentMethod: "cod"
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!form.email.includes("@")) newErrors.email = "Valid email required"
    if (!form.address.trim()) newErrors.address = "Address is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    // Normally you'd call API here
    alert("Order placed successfully!")

    clearCart()
  }

  if (cart.length === 0) {
    return (
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="mt-4 text-gray-600">Your cart is empty.</p>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
      
      {/* Checkout Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold">Shipping Details</h2>

        {/* Full Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">Shipping Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>

        {/* Payment Options */}
        <div>
          <label className="block mb-2 font-medium">Payment Method</label>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={form.paymentMethod === "cod"}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={form.paymentMethod === "card"}
                onChange={handleChange}
              />
              Credit/Debit Card
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={form.paymentMethod === "upi"}
                onChange={handleChange}
              />
              UPI
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
        >
          Place Order
        </button>
      </form>

      {/* Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg shadow space-y-4">
        <h2 className="text-2xl font-bold">Order Summary</h2>

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between text-sm border-b pb-2"
          >
            <span>
              {item.title} × {item.quantity}
            </span>
            <span>
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}

        <div className="flex justify-between font-semibold text-lg pt-4">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </main>
  )
}
