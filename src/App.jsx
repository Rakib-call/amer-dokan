import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Category from "./pages/Category.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderConfirm from "./pages/OrderConfirm.jsx";
import AdminLogin from "./pages/admin/Login.jsx";
import AdminLayout from "./pages/admin/Layout.jsx";
import AdminProducts from "./pages/admin/Products.jsx";
import AdminOrders from "./pages/admin/Orders.jsx";
import AdminSettings from "./pages/admin/Settings.jsx";
import { SettingsProvider, useSettings } from "./context/SettingsContext.jsx";

function ShopLayout({ children }) {
  const { settings } = useSettings();
  return (
    <div className="min-h-screen bg-cream">
      <Header settings={settings} />
      {children}
      <Footer settings={settings} />
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <Routes>
        <Route path="/" element={<ShopLayout><Home /></ShopLayout>} />
        <Route path="/category/:slug" element={<ShopLayout><Category /></ShopLayout>} />
        <Route path="/product/:id" element={<ShopLayout><Product /></ShopLayout>} />
        <Route path="/cart" element={<ShopLayout><Cart /></ShopLayout>} />
        <Route path="/checkout" element={<ShopLayout><Checkout /></ShopLayout>} />
        <Route path="/order-confirm/:orderId" element={<ShopLayout><OrderConfirm /></ShopLayout>} />
        <Route path="/admin">
          <Route index element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>
      </Routes>
    </SettingsProvider>
  );
}
