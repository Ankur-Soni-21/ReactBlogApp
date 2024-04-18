import { useState, useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/auth/authSlice";
import authService from "./appwrite/auth";

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
    <>
      <h1 className="min-h-screen ">Test</h1>
    </>
  ) : null;
}

export default App;
