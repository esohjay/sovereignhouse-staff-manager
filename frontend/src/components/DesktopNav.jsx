import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import avater from "../assets/User-avatar.png";

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
import useAuth from "../hooks/useAuth";
import { selectCurrentUser, logOut } from "../features/authSlice";

function DesktopNav({ children }) {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(selectSidebarState);
  const user = useSelector(selectCurrentUser);
  // const { user } = useAuth();
  console.log(user);
  return (
    <>
      <nav
        className="bg-mainColor px-5 lg:px-9 hidden items-center justify-between h-16  md:flex
      fixed top-0 left-0 w-full z-30"
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
          <div
            onClick={() => dispatch(logOut())}
            className={
              "text-white block font-medium hover:text-mainColor rounded-md hover:bg-lightGreen cursor-pointer"
            }
          >
            <div
              className="flex p-2 items-center  flex-col justify-center 
      gap-y-1"
            >
              <button className="text-xl">
                <MdLogout />{" "}
              </button>

              <p className="capitalize text-xs">logout</p>
            </div>
          </div>
          {/* <DesktopTopNavItem text="logout" path="/n" icon={<MdLogout />} /> */}
        </ul>
      </nav>
      <section className="hidden w-full  relative gap-x-4 md:flex">
        <nav
          className={`w-64 bg-gray h-screen  shadow-sm fixed top-16 ${
            !isSidebarOpen ? "left-0" : "-left-full"
          } transition-all duration-150 p-5`}
        >
          <div className=" flex items-center gap-x-3 mb-8">
            <figure className="h-8 w-8 rounded-full">
              <img
                src={avater}
                alt="user"
                className="h-full w-full max-h-full max-w-full rounded-full"
              />
            </figure>
            <p className="capitalize text-mainColor text-lg font-semibold">
              {user?.fullName}
            </p>
          </div>
          <form className="mb-7">
            <input
              type="text"
              placeholder="Search"
              className="block border rounded-md bg-white p-2 focus:outline-none"
            />
          </form>
          <p className="uppercase text-slate-600 font-medium text-xs mb-7">
            main menu
          </p>
          <NavItem text={"dashboard"} path="/" icon={<GoDashboard />} />
          <NavItem text={"mailbox"} path="/mailbox" icon={<FaEnvelope />} />
          <NavItem
            text={"timesheet & leave"}
            path="/timesheet"
            icon={<MdTimer />}
          />
          <NavItem text={"HRM"} path="/admin/staff" icon={<FaRegUser />} />
          <NavItem
            text={"Recruitment"}
            path="/admin/recruitment"
            icon={<FaRegUser />}
          />
          <NavItem text={"shifts"} path="/shifts" icon={<VscTasklist />} />
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
        {/* <section
          className={`w-full  mt-[70px] bg-black h-screen ${
            !isSidebarOpen ? "ml-64" : "ml-0"
          } transition-all duration-150`}
        >
          {children}
        </section> */}
      </section>
    </>
  );
}

export default DesktopNav;
