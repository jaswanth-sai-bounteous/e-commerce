import { useEffect, useState } from "react"
import Button from "../components/ui/Button"
import { productService } from "../services/product.service"
import type { Product } from "../types/product"
import ProductCard from "@/components/ui/ProductCard"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    productService.getAll().then((data) => {
      const firstSix = data.slice(0, 6)
      setProducts(firstSix)
      setLoading(false)

      // Rotate image every 2 seconds
      let index = 0
      const interval = setInterval(() => {
        index = (index + 1) % firstSix.length
        setCurrentImageIndex(index)
      }, 2000)

      return () => clearInterval(interval) // Cleanup on unmount
    })
  }, [])

  return (
    <main>
      {/* Hero */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto grid grid-cols-1 gap-12 px-4 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Discover products <br /> that fit your style
            </h1>
            <p className="mt-4 max-w-md text-gray-600">
              Explore our curated collection of modern essentials and timeless classics.
            </p>
            <Button className="mt-6 px-6 py-3">Shop Now</Button>
          </div>

          <div className="flex justify-center">
            <div className="h-80 w-80 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
              {loading ? (
                <p>Loading...</p>
              ) : products.length > 0 ? (
                <img
                  src={products[currentImageIndex].image}
                  alt={products[currentImageIndex].title}
                  className="h-full w-full object-contain transition-all duration-500"
                />
              ) : (
                <p>No products</p>
              )}
            </div>
          </div>
        </div>
      </section>

       {/* Featured Products */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-6 text-3xl font-bold">Featured Products</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
