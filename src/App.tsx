import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import MainLayout from "./components/layout/MainLayout"


const Home = lazy(() => import("./pages/Home"))
const PLP = lazy(() => import("./pages/PLP"))
const PDP = lazy(() => import("./pages/PDP"))
const Cart = lazy(() => import("./pages/Cart"))
const Checkout = lazy(() => import("./pages/Checkout"))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<PLP />} />
            <Route path="/products/:id" element={<PDP />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
