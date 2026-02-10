import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "./components/layout/MainLayout"
import Home from "./pages/Home"
import PLP from "./pages/PLP"
import PDP from "./pages/PDP"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<PLP />} />
          <Route path="/products/:id" element={<PDP />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
