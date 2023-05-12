import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Cookies from "js-cookie";
import {
  selectCurrentUser,
  logOut,
  selectAuthStatus,
} from "../features/authSlice";

//redux
import {
  selectSidebarState,
  toggleSidebar,
  toggleDropdown,
  selectDropdownState,
} from "../features/appSlice";
import { useSelector, useDispatch } from "react-redux";
import { useGetStaffQuery } from "../api/staff/staffApi";

//components
import NavItem from "./NavItem";
import NavBtn from "./NavBtn";

//icons
import { VscChromeClose } from "react-icons/vsc";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoDashboard } from "react-icons/go";
import { VscTasklist } from "react-icons/vsc";
import { IoReceiptOutline } from "react-icons/io5";
import {
  MdTimer,
  MdOutlineSettingsSuggest,
  MdLogout,
  MdOutlineEventBusy,
} from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { FaRegBell, FaRegUser, FaEnvelope, FaUserCog } from "react-icons/fa";

function MobileNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSidebarOpen = useSelector(selectSidebarState);
  const isDropdownOpen = useSelector(selectDropdownState);
  const signedOut = useSelector(selectAuthStatus);

  const { id } = useParams();
  const isAdmin = Cookies.get("isAdmin")
    ? JSON.parse(Cookies.get("isAdmin"))
    : null;
  const { currentData } = useGetStaffQuery(id);
  useEffect(() => {
    if (signedOut) {
      navigate("/login");
    }
  }, [signedOut]);
  return (
    <nav className="bg-mainColor px-5 lg:px-9 flex items-center justify-between h-16 relative md:hidden">
      <ul className="flex gap-x-3">
        {/* Sidebar trigger */}
        <button
          className="text-white border-none text-2xl"
          onClick={() => dispatch(toggleSidebar())}
        >
          <GiHamburgerMenu />
        </button>
        <Link
          to={`/vms/${id}/dashboard`}
          className="text-white font-bold text-xl"
        >
          <img src={logo} alt="Sovereignhouse" className="max-h-full h-full" />
        </Link>
      </ul>
      <ul className="flex justify-around items-center gap-x-3 md:hidden">
        <button className="text-white border-none text-xl">
          <FaRegBell />
        </button>
        {/* Dropdown trigger */}
        <button
          className="text-white border-none text-xl"
          onClick={() => dispatch(toggleDropdown())}
        >
          <SlOptionsVertical />
        </button>
      </ul>
      {/* Dropdown */}
      <div
        className={`w-full absolute top-16 left-0 bg-gray md:hidden bg-opacity-50  backdrop-blur-md ${
          isDropdownOpen ? "h-80" : "h-0"
        } transition-all duration-500 overflow-hidden`}
      >
        <nav className="grid grid-cols-2 p-5 place-items-center gap-3 h-full w-full ">
          <NavBtn
            icon={<FaRegUser />}
            text="my profile"
            path={`/vms/${id}/profile`}
          />
          <NavBtn
            icon={<FaUserCog />}
            text="edit profile"
            path={`/vms/${id}/profile/edit`}
          />
          <NavBtn
            icon={<MdTimer />}
            text="timesheets"
            path={`/vms/${id}/timesheet`}
          />
          <NavBtn
            icon={<MdLogout />}
            text="logout"
            path=""
            action={() => dispatch(logOut())}
          />
        </nav>
      </div>
      {/* Sidebar */}
      <aside
        className={`h-screen  bg-gray absolute p-5 w-4/5 top-0 ${
          isSidebarOpen ? "left-0" : "-left-full"
          //   showNav ? "w-4/5 md:w-64 animate-fade" : "w-0 animate-fade"
          //   showNav ? "block animate-contentSlideIn" : "hidden"
        } transition-all duration-500 overflow-hidden`}
      >
        <div className="flex justify-between w-full mb-5">
          <p className="capitalize text-mainColor text-lg font-bold">
            {currentData?.fullName}
          </p>
          <button
            className="text-red-500 border-none text-xl "
            onClick={() => dispatch(toggleSidebar())}
          >
            <VscChromeClose />
          </button>
        </div>
        <nav className="w-full">
          <NavItem
            text={"dashboard"}
            path={`/vms/${id}/dashboard`}
            icon={<GoDashboard />}
          />
          {/* <NavItem
            text={"mailbox"}
            path={`/vms/${id}/dashboard`}
            icon={<FaEnvelope />}
          /> */}
          <NavItem
            text={"timesheet"}
            path={
              isAdmin
                ? `/vms/${id}/admin/all-staff-timesheets`
                : `/vms/${id}/timesheet`
            }
            icon={<MdTimer />}
          />
          <NavItem
            text={"leave"}
            path={isAdmin ? `/vms/${id}/admin/leave` : `/vms/${id}/leave`}
            icon={<MdOutlineEventBusy />}
          />
          <NavItem
            text={"tasks"}
            path={`/vms/${id}/task`}
            icon={<VscTasklist />}
          />
          {/* <NavItem
            text={"expenses"}
            path="/expenses"
            icon={<IoReceiptOutline />}
          />
          <NavItem
            text={"settings"}
            path="/settings"
            icon={<MdOutlineSettingsSuggest />}
          /> */}
        </nav>
      </aside>
    </nav>
  );
}

export default MobileNav;
