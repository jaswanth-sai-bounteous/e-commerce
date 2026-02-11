import { useCart } from "@/context/CartContext"
import { Link } from "react-router-dom"


export default function Navbar() {
  const { cart } = useCart()

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="text-2xl font-bold">
          Ecom
        </Link>

        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-gray-700">
            Shop
          </Link>
          <Link to="/products" className="hover:text-gray-700">
            Categories
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative hover:text-gray-700"
          >
            🛒 Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}
