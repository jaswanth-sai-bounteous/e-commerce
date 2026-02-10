import { useEffect, useState } from "react"
import ProductCard from "../components/ui/ProductCard"
import { productService } from "../services/product.service"
import type { Product } from "../types/product"

export default function PLP() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    productService.getAll().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">All Products</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  )
}
