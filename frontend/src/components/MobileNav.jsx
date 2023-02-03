import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/logo.png";

//redux
import {
  selectSidebarState,
  toggleSidebar,
  toggleDropdown,
  selectDropdownState,
} from "../features/appSlice";
import { useSelector, useDispatch } from "react-redux";

//components
import NavItem from "./NavItem";
import NavBtn from "./NavBtn";

//icons
import { VscChromeClose } from "react-icons/vsc";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoDashboard } from "react-icons/go";
import { VscTasklist } from "react-icons/vsc";
import { IoReceiptOutline } from "react-icons/io5";
import { MdTimer, MdOutlineSettingsSuggest, MdLogout } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { FaRegBell, FaRegUser, FaEnvelope, FaUserCog } from "react-icons/fa";

function MobileNav() {
  const [showNav, setShowNav] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(selectSidebarState);
  const isDropdownOpen = useSelector(selectDropdownState);
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
        <Link to="/" className="text-white font-bold text-xl">
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
        className={`w-full absolute top-16 left-0 bg-gray  bg-opacity-50  backdrop-blur-md ${
          isDropdownOpen ? "h-80" : "h-0"
        } transition-all duration-500 overflow-hidden`}
      >
        <nav className="grid grid-cols-2 p-5 place-items-center gap-3 h-full w-full ">
          <NavBtn icon={<FaRegUser />} text="my profile" path="/profile" />
          <NavBtn icon={<FaUserCog />} text="edit profile" path="/" />
          <NavBtn icon={<MdTimer />} text="timesheets" path="/" />
          <NavBtn icon={<MdLogout />} text="logout" path="/logout" />
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
            olusoji daramola
          </p>
          <button
            className="text-red-500 border-none text-xl "
            onClick={() => dispatch(toggleSidebar())}
          >
            <VscChromeClose />
          </button>
        </div>
        <nav className="w-full">
          <NavItem text={"dashboard"} path="/" icon={<GoDashboard />} />
          <NavItem text={"mailbox"} path="/mailbox" icon={<FaEnvelope />} />
          <NavItem
            text={"timesheet & leave"}
            path="/timesheet"
            icon={<MdTimer />}
          />
          <NavItem text={"tasks"} path="/tasks" icon={<VscTasklist />} />
          <NavItem
            text={"expenses"}
            path="/expenses"
            icon={<IoReceiptOutline />}
          />
          <NavItem
            text={"settings"}
            path="/settings"
            icon={<MdOutlineSettingsSuggest />}
          />
        </nav>
      </aside>
    </nav>
  );
}

export default MobileNav;
