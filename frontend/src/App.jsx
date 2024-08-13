import "./App.css";
import RootLayout from "./layouts/Rootlayout";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AddProduct from "./pages/AddNewProduct";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ShopList from "./components/ShopList";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

//stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripeApiKey = loadStripe(
  "pk_test_51JXUPNLs3WLhYCTdb6263j1MdZgKdGAIcneTvUokHLpJl4d5dsVdRQ5AxyIKdnAeI2vA8pPOddH5s5rFkZ2x78ZS008FJnKsVC"
);

import { useEffect } from "react";
import { clearUserInfo } from "./redux/features/Auth/authSlice ";
import RequiredAuth from "./layouts/RequiredAuth";
import RequiredAdminAuth from "./layouts/RequiredAdminAuth";
import Dashboard from "./pages/DashBoard";
import AddCategories from "./pages/AddCategories";
import Payment from "./components/Payment";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="details/:id" element={<Detail />} />
      <Route path="cart" element={<Cart />} />
      <Route path="contact" element={<Contact />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/shop-list" element={<ShopList />} />

      <Route element={<RequiredAuth />}>
        <Route path="/checkout" element={<Checkout />} />
        {stripeApiKey && (
          <Route
            path="/payment"
            element={
              <Elements stripe={stripeApiKey}>
                <Payment />
              </Elements>
            }
          />
        )}
        <Route path="/user/dashboard" element={<Dashboard />}></Route>
        <Route path="/user" element={<RequiredAdminAuth role={"admin"} />}>
          <Route path="/user/dashboard" element={<Dashboard />}>
            <Route
              path="/user/dashboard/add-product"
              element={<AddProduct />}
            />
            <Route
              path="/user/dashboard/add-categories"
              element={<AddCategories />}
            />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      const { exp } = jwtDecode(token);
      const checkTokenValidation = () => {
        if (exp < Date.now() / 1000) {
          alert("Your session has been expire! Login again to continue");
          dispatch(clearUserInfo());
          // navigate("/login");
        }
      };
      const interval = setInterval(checkTokenValidation, 3000);
      return () => clearInterval(interval);
    }
  }, [token]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
