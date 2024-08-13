import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Sidenavigation() {
  const { user } = useSelector((state) => state.auth);
  // console.log("Side Navigation.....", user);
  return (
    <>
      <div className="col-lg-3 col-md-4">
        {/* <!-- Price Start --> */}
        <h5 className="section-title position-relative text-uppercase mb-3">
          <span className="bg-secondary pr-3">Admin Navigation</span>
        </h5>
        <div className="bg-light p-4 mb-30">
          <div className="list-group">
            {user && user.role === "admin" ? (
              <>
                <Link
                  to={`/user/dashboard/add-categories`}
                  class="list-group-item list-group-item-action"
                >
                  Add Category
                </Link>
                <Link
                  to={`/user/dashboard/add-product`}
                  class="list-group-item list-group-item-action"
                >
                  Add Product
                </Link>
              </>
            ) : (
              ""
            )}

            <a href="#" className="list-group-item list-group-item-action">
              A third link item
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              A fourth link item
            </a>
            <a
              href="#"
              className="list-group-item list-group-item-action disabled"
              tabindex="-1"
              aria-disabled="true"
            >
              A disabled link item
            </a>
          </div>
        </div>

        {/* <!-- Size End --> */}
      </div>
    </>
  );
}

export default Sidenavigation;
