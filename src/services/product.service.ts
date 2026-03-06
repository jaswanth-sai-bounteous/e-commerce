import axios from "axios"
import type { Product } from "../types/product"



const API_URL = "https://ecom-backend-withpg-2.onrender.com"

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const res = await axios.get(`${API_URL}/products`)

    return res.data.products.map((p: any) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description,
      category: p.category,
      image: p.product_img   // map backend field → frontend field
    }))
  },

  getById: async (id: string): Promise<Product> => {
    const res = await axios.get(`${API_URL}/products/${id}`)
    return res.data
  },
}
