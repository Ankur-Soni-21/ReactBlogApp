import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/auth/authSlice";
import authService from "./appwrite/auth";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header></Header>
        <main>Hello</main>
        <Footer></Footer>
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}

export default App;
