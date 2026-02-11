"use client" // If using Next.js App Router

import { createContext, useContext, useReducer, useEffect } from "react"
import type { ReactNode } from "react"

// ------------------------
// Types
// ------------------------
export interface Product {
  id: number
  title: string
  price: number
}

export interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  decreaseQuantity: (id: number) => void
  clearCart: () => void
  total: number
}

// ------------------------
// Context
// ------------------------
const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

// ------------------------
// Actions
// ------------------------
type CartAction =
  | { type: "ADD"; payload: Product }
  | { type: "REMOVE"; payload: number }
  | { type: "DECREASE"; payload: number }
  | { type: "CLEAR" }

// ------------------------
// Reducer
// ------------------------
const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case "ADD": {
      const existing = state.find(item => item.id === action.payload.id)
      if (existing) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...state, { ...action.payload, quantity: 1 }]
    }

    case "REMOVE":
      return state.filter(item => item.id !== action.payload)

    case "DECREASE":
      return state
        .map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)

    case "CLEAR":
      return []

    default:
      return state
  }
}

// ------------------------
// LocalStorage Key
// ------------------------
const STORAGE_KEY = "my_cart"

// ------------------------
// Provider
// ------------------------
export const CartProvider = ({ children }: CartProviderProps) => {
  // Load from localStorage initially
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  // Actions
  const addToCart = (product: Product) =>
    dispatch({ type: "ADD", payload: product })

  const removeFromCart = (id: number) =>
    dispatch({ type: "REMOVE", payload: id })

  const decreaseQuantity = (id: number) =>
    dispatch({ type: "DECREASE", payload: id })

  const clearCart = () =>
    dispatch({ type: "CLEAR" })

  // Total calculation
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, decreaseQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  )
}

// ------------------------
// Hook
// ------------------------
export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}
