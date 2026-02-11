import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./components/layout/MainLayout"
import Home from "./pages/Home"
import PLP from "./pages/PLP"
import PDP from "./pages/PDP"
 import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<PLP />} />
          <Route path="/products/:id" element={<PDP />} />
         

<Route path="/cart" element={<Cart />} />
  <Route path="/checkout" element={<Checkout />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
