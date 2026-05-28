import React from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { Usercontext } from "../../context/Usercontext";

const DashboardLayout = ({ children, activeMenu }) => {

  const { user } = React.useContext(Usercontext);
  return (
    <div>
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-1.5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
