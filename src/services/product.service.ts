import axios from "axios"
import type { Product } from "../types/product"



const API_URL = "https://fakestoreapi.com"

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const res = await axios.get(`${API_URL}/products`)
    return res.data
  },

  getById: async (id: string): Promise<Product> => {
    const res = await axios.get(`${API_URL}/products/${id}`)
    return res.data
  },
}
