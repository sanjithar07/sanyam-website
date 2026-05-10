import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Admin from "./pages/Admin";
import ProductFlanges from "./pages/ProductFlanges";
import ProductCouplings from "./pages/ProductCouplings";
import ProductNozzles from "./pages/ProductNozzles";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/products/flanges" element={<ProductFlanges />} />
          <Route path="/products/couplings" element={<ProductCouplings />} />
          <Route path="/products/nozzles" element={<ProductNozzles />} />
        </Routes>
      </BrowserRouter>
      <Toaster theme="dark" richColors position="bottom-left" />
    </div>
  );
}

export default App;
