import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { PrivateRoute, PublicRoute } from "./utils/Route";
import { Logout } from "./pages/Logout";
import { ToastContainer } from "react-toastify";
import { Dashboard } from "./pages/Dashboard";
import { Register } from "./pages/Register";
import { Product } from "./pages/Product";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" exact element={<PublicRoute element={Login} />} />
          <Route
            path="/login"
            exact
            element={<PublicRoute element={Login} />}
          />
          <Route
            path="/register"
            exact
            element={<PublicRoute element={Register} />}
          />
          <Route
            path="/dashboard"
            exact
            element={<PrivateRoute element={Dashboard} />}
          />
          <Route
            path="/products"
            exact
            element={<PrivateRoute element={Product} />}
          />
          <Route exact path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
