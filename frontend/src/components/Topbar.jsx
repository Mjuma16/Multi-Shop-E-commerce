import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "../redux/features/Auth/authSlice ";
import { useNavigate } from "react-router-dom";
function Topbar() {
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearUserInfo());
    navigate("/login");
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row bg-secondary py-1 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center h-100">
              <a className="text-body mr-3" href="">
                About
              </a>
              <a className="text-body mr-3" href="">
                Contact
              </a>
              <a className="text-body mr-3" href="">
                Help
              </a>
              <a className="text-body mr-3" href="">
                FAQs
              </a>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <div className="btn-group">
                {user && token ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-sm btn-light dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      Hi, {user.fullName}
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <Link className="dropdown-item" to="/user/dashboard">
                        Dashboard
                      </Link>
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn btn-sm btn-light dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      My Account
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <Link className="dropdown-item" to="/login">
                        Sign in
                      </Link>
                      <Link className="dropdown-item" to="/register">
                        Sign up
                      </Link>
                    </div>
                  </>
                )}

                <div className="dropdown-menu dropdown-menu-right"></div>
              </div>
            </div>
            <div className="d-inline-flex align-items-center d-block d-lg-none">
              <a href="" className="btn px-0 ml-2">
                <i className="fas fa-heart text-dark"></i>
                <span
                  className="badge text-dark border border-dark rounded-circle"
                  style={{ paddingBottom: "2px" }}
                >
                  0
                </span>
              </a>
              <a href="" className="btn px-0 ml-2">
                <i className="fas fa-shopping-cart text-dark"></i>
                <span
                  className="badge text-dark border border-dark rounded-circle"
                  style={{ paddingBottom: "2px" }}
                >
                  0
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
          <div className="col-lg-4">
            <Link to="/" className="text-decoration-none">
              <span className="h1 text-uppercase text-primary bg-dark px-2">
                Multi
              </span>
              <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
                Shop
              </span>
            </Link>
          </div>
          <div className="col-lg-4 col-6 text-left">
            <form action="">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products"
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-transparent text-primary">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4 col-6 text-right">
            <p className="m-0">Customer Service</p>
            <h5 className="m-0">03112233456</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;
