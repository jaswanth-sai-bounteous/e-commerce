
import { useCart } from "@/context/CartContext"
import { useNavigate } from "react-router-dom"

export default function Cart() {
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart, total } =
    useCart()
  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <p className="text-gray-600">Your cart is empty.</p>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {/* Cart Items */}
      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
          >
            {/* Product Info */}
            <div>
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <p className="text-gray-600">
                ${item.price.toFixed(2)} × {item.quantity}
              </p>
              <p className="font-medium mt-1">
                Subtotal: ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                −
              </button>

              <span className="font-medium">{item.quantity}</span>

              <button
                onClick={() =>
                  addToCart({
                    id: item.id,
                    title: item.title,
                    price: item.price
                  })
                }
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className="mt-10 border-t pt-6 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear Cart
        </button>

        <div className="text-right">
          <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
          <button
            onClick={() => navigate("/checkout")} // ✅ Navigate to checkout
            className="mt-3 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </main>
  )
}
