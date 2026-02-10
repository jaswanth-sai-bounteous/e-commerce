import { FC } from "react"
import { Link } from "react-router-dom"
import type { Product } from "../../types/product"

interface ProductCardProps {
  product: Product
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition"
    >
      <img
        src={product.image}
        alt={product.title}
        className="mx-auto h-48 w-auto object-contain"
      />
      <h3 className="mt-4 text-sm font-medium text-gray-900 line-clamp-2">{product.title}</h3>
      <p className="mt-2 text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
    </Link>
  )
}

export default ProductCard
