import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { productService } from "../services/product.service"
import type { Product } from "../types/product"
import Button from "../components/ui/Button"
import { useCart } from "@/context/CartContext"


export default function PDP() {
  const { id } = useParams<{ id: string }>()
  const { addToCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) return

    setLoading(true)
    productService.getById(id).then((data) => {
      setProduct(data)
      setLoading(false)
    })
  }, [id])

  if (loading)
    return <p className="container mx-auto px-4 py-12">Loading...</p>

  if (!product)
    return <p className="container mx-auto px-4 py-12">Product not found.</p>

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <img
          src={product.image}
          alt={product.title}
          className="mx-auto max-h-[400px] w-full object-contain"
        />
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <p className="mt-6 text-2xl font-semibold">
            ${product.price.toFixed(2)}
          </p>

          <Button
            className="mt-8 px-6 py-3"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </main>
  )
}

