import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import BatsPage from "./pages/BatsPage";
import BallsPage from "./pages/BallsPage";
import KitsPage from "./pages/KitsPage";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Profile from "./pages/Profile";



const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);
const AdminLayout = ({ children }) => <>{children}</>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/bats"
          element={
            <Layout>
              <BatsPage />
            </Layout>
          }
        />
        <Route
          path="/balls"
          element={
            <Layout>
              <BallsPage />
            </Layout>
          }
        />
        <Route
          path="/kits"
          element={
            <Layout>
              <KitsPage />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
        <Route
          path="/checkout"
          element={
            <Layout>
              <Checkout />
            </Layout>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Layout>
              <ProductDetailsPage />
            </Layout>
          }
        />
     
<Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route
          path="*"
          element={
            <Layout>
              <p className="text-red-500 text-center py-20 flex items-center justify-center">
                Page not found
              </p>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
