import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="text-2xl font-bold">
          Ecom
        </Link>
        <nav className="flex space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-gray-700">
            Shop
          </Link>
          <Link to="/products" className="hover:text-gray-700">
            Categories
          </Link>
        </nav>
      </div>
    </header>
  )
}
