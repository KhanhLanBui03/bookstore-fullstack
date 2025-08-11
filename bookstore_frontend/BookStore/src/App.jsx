


import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./layouts/header-footer/Header";
import Footer from "./layouts/header-footer/Footer";
import Advertisement from "./layouts/header-footer/Advertisement";
import HomePage from "./layouts/homepage/HomePage"
import { getAllBook } from "./api/BookAPI";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AllBook from "./product/components/AllBook";
import AboutBookstore from "./layouts/about/AboutBookstore";
import { Provider } from "react-redux";
import store from "./features/store";
import PopupAd from "./layouts/popupad/PopupAd";
import BookDetail from "./product/components/BookDetail";
import Register from "./layouts/user/Register";
import ActivateAccount from "./layouts/user/ActivateAccount";
import Login from "./layouts/user/Login";
import Test from "./layouts/user/Test";
import BookForm_Admin from "./layouts/admin/BookForm";
import BookForm from "./layouts/admin/BookForm";
import RequireAdmin from "./layouts/admin/RequireAdmin";
import AdminDashboard from "./layouts/admin/DashBoard/DashBoard";
import Sidebar from "./layouts/admin/DashBoard/Sidebar";
import BookAdmin from "./layouts/admin/BookAdmin";
import BookManagement from "./layouts/admin/BookAdmin";
;
function App() {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);

  getAllBook().then().catch();

  const [keySearch, setKeySearch] = useState('');
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    
     <Provider store={store}>
      <main>
        <Advertisement />
        <PopupAd />

        {/* Header chỉ hiển thị khi không phải trang admin */}
        {!isAdminRoute && <Header keySearch={keySearch} setKeySearch={setKeySearch} />}

        <div style={{ display: isAdminRoute ? "flex" : "block", minHeight: "100vh" }}>
          {/* Sidebar chỉ hiển thị khi là trang admin */}
          {isAdminRoute && <Sidebar />}
          
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/all-book" element={<AllBook keySearch={keySearch} />} />
              <Route path="/about" element={<AboutBookstore />} />
              <Route path="/:categoryId" element={<AllBook keySearch={keySearch} />} />
              <Route path="/book/:bookId" element={<BookDetail />} />
              <Route path="/register" element={<Register />} />
              <Route path="/activate/:email/:activateId" element={<ActivateAccount />} />
              <Route path="/login" element={<Login />} />
              <Route path="/test" element={<Test />} />
              <Route path="/admin/book-form" element={<BookForm_Admin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<BookManagement />} />
            </Routes>
          </div>
        </div>

        {/* Footer chỉ hiển thị khi không phải trang admin */}
        {!isAdminRoute && <Footer />}
      </main>
    </Provider>
    
  );
}


export default App
