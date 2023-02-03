import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

//redux
import { selectSidebarState, toggleSidebar } from "../features/appSlice";
import { useSelector, useDispatch } from "react-redux";

//components
import NavItem from "./NavItem";
import DesktopTopNavItem from "./DesktopTopNavItem";

//icons
import { VscChromeClose } from "react-icons/vsc";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoDashboard } from "react-icons/go";
import { VscTasklist } from "react-icons/vsc";
import { IoReceiptOutline } from "react-icons/io5";
import { MdTimer, MdOutlineSettingsSuggest, MdLogout } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import {
  FaRegBell,
  FaRegUser,
  FaHome,
  FaEnvelope,
  FaUserCog,
} from "react-icons/fa";

function DesktopNav({ children }) {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(selectSidebarState);
  return (
    <>
      <nav
        className="bg-mainColor px-5 lg:px-9 hidden items-center justify-between h-16  md:flex
      fixed top-0 left-0 w-full"
      >
        <ul className="flex gap-x-3">
          {/* Sidebar trigger */}
          <button
            className="text-white border-none text-2xl"
            onClick={() => dispatch(toggleSidebar())}
          >
            <GiHamburgerMenu />
          </button>
          <Link to="/" className="text-white font-bold text-xl">
            <img
              src={logo}
              alt="Sovereignhouse"
              className="max-h-full h-full"
            />
          </Link>
        </ul>
        <ul className="flex gap-x-3">
          <DesktopTopNavItem text="my profile" path="/" icon={<FaRegUser />} />
          <DesktopTopNavItem
            text="notification"
            path="/n"
            icon={<FaRegBell />}
          />
          <DesktopTopNavItem text="timesheet" path="/n" icon={<MdTimer />} />
          <DesktopTopNavItem text="logout" path="/n" icon={<MdLogout />} />
        </ul>
      </nav>
      <section className="flex w-full gap-x-4 p-2">
        <nav className="w-64 bg-gray h-screen shadow-sm fixed left-0 top-16"></nav>
        <section className="w-full ml-64 mt-[70px]">{children}</section>
      </section>
    </>
  );
}

export default DesktopNav;
