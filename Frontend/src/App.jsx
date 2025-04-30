import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Checkout from "./pages/Checkout.jsx";
import { SignUpPage } from "./pages/auth/SignUpPage.jsx";
import SignInPage from "./pages/auth/SignInPage.jsx";
import { OrderConfirmation } from "./pages/OrderConfirmation.jsx";
import { MyOrders } from "./pages/MyOrders.jsx";
import LandingPage from "./pages/LandingPage.jsx";

function App() {
  return (
    <>
      <div className="min-h-screen bg-zinc-100">
        <Header />
        <Routes>
          <Route path ="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/myOrders" element={<MyOrders />} />
          <Route path="/auth/signup" element={<SignUpPage />} />
          <Route path="/auth/signin" element={<SignInPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
