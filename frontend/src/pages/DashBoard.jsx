import React from "react";
import SideNavigation from "../components/SideNavigation";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <div className="container-fluid">
        <div className="row px-xl-5">
          <SideNavigation />
          {/* <!-- Shop Product Start --> */}
          <div className="col-lg-9 col-md-8">
            <div className="row pb-3">
              <Outlet />
            </div>
          </div>
          {/* <!-- Shop Product End --> */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
