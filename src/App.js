import { useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import AddEditItem from "./pages/AddEditItem";
import SingleItem from "./pages/SingleItem";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import TagItems from "./pages/TagItems";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/items/search" element={<Home />} />
          <Route path="/items/tag/:tag" element={<TagItems />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/addItem"
            element={
              <PrivateRoute>
                <AddEditItem />
              </PrivateRoute>
            }
          />
          <Route
            path="/editItem/:id"
            element={
              <PrivateRoute>
                <AddEditItem />
              </PrivateRoute>
            }
          />
          <Route
            path="/item/:id"
            element={
              <PrivateRoute>
                <SingleItem />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
