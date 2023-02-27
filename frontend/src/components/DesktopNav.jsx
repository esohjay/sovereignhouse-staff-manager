import React from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";

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
import {
  MdTimer,
  MdOutlineSettingsSuggest,
  MdLogout,
  MdOutlineWorkspaces,
  MdPendingActions,
  MdOutlineEventBusy,
} from "react-icons/md";
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
  const { id } = useParams();
  const isAdmin = Cookies.get("isAdmin")
    ? JSON.parse(Cookies.get("isAdmin"))
    : null;

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
          <DesktopTopNavItem
            text="timesheet"
            path={`/vms/${id}/timesheet`}
            icon={<MdTimer />}
          />
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
          {/* <div className=" flex items-center gap-x-3 mb-8">
            <figure className="h-5 w- rounded-full">
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
          </form> */}
          <p className="uppercase text-slate-600 font-medium text-xs mb-7">
            main menu
          </p>
          <NavItem
            text={"dashboard"}
            path={`/admin/${id}/dashboard`}
            icon={<GoDashboard />}
          />
          <NavItem
            text={"mailbox"}
            path={`/vms/${id}/mailbox`}
            icon={<FaEnvelope />}
          />
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
            text={"HRM"}
            path={`/vms/${id}/admin/staff`}
            icon={<FaRegUser />}
          />
          <NavItem
            text={"Recruitment"}
            path={`/vms/${id}/admin/recruitment`}
            icon={<MdOutlineWorkspaces />}
          />
          <NavItem
            text={"shifts"}
            path={`/vms/${id}/admin/shift`}
            icon={<MdPendingActions />}
          />
          <NavItem
            text={"tasks"}
            path={`/vms/${id}/task`}
            icon={<VscTasklist />}
          />
          <NavItem
            text={"expenses"}
            path={`/vms/${id}/expense`}
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
