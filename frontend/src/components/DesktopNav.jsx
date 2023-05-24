import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import logo from "../assets/logo.png";
import avater from "../assets/User-avatar.png";

import {
  useGetStaffQuery,
  useUpdateNotificationMutation,
} from "../api/staff/staffApi";

//redux
import {
  selectSidebarState,
  toggleSidebar,
  selectNotificationState,
  toggleNotification,
} from "../features/appSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthStatus } from "../features/authSlice";

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
import { FaRegBell, FaRegUser, FaBookReader } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { selectCurrentUser, logOut } from "../features/authSlice";

function DesktopNav({ children }) {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(selectSidebarState);
  const isNotificationOpen = useSelector(selectNotificationState);
  const signedOut = useSelector(selectAuthStatus);
  const navigate = useNavigate();
  const [updateNotification] = useUpdateNotificationMutation();
  const user = useSelector(selectCurrentUser);
  const { id } = useParams();
  const { currentData } = useGetStaffQuery(id);
  const isAdmin = Cookies.get("isAdmin")
    ? JSON.parse(Cookies.get("isAdmin"))
    : null;
  useEffect(() => {
    if (signedOut) {
      navigate("/");
    }
  }, [signedOut]);
  const handleClickNotification = (id, link) => {
    updateNotification({ id, viewed: true });
    navigate(link);
  };
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
          <Link
            to={`/vms/${id}/dashboard`}
            className="text-white font-bold text-xl"
          >
            <img
              src={logo}
              alt="Sovereignhouse"
              className="max-h-full h-full"
            />
          </Link>
        </ul>
        <ul className="flex gap-x-3">
          <DesktopTopNavItem
            text="my profile"
            path={`/vms/${id}/profile`}
            icon={<FaRegUser />}
          />

          <DesktopTopNavItem
            text="timesheet"
            path={`/vms/${id}/timesheet`}
            icon={<MdTimer />}
          />
          {/* <DesktopTopNavItem
            text="notification"
            path="/n"
            icon={<FaRegBell />}
          />  */}
          <div
            onClick={() => dispatch(toggleNotification())}
            className={
              "text-white block font-medium hover:text-mainColor rounded-md hover:bg-lightGreen cursor-pointer"
            }
          >
            <div
              className="flex p-2 items-center  flex-col justify-center 
      gap-y-1"
            >
              <button className="text-xl">
                <FaRegBell />
              </button>

              <p className="capitalize text-xs">notification</p>
            </div>
          </div>
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
        {/* Notification Dropdown */}
        <div
          className={`max-w-sm absolute top-16 right-0 bg-gray hidden md:block bg-opacity-50  backdrop-blur-md ${
            isNotificationOpen ? "h-[600px]" : "h-0"
          } transition-all duration-500 overflow-hidden overflow-y-scroll`}
        >
          <ul className="p-5 space-y-1">
            {currentData?.notifications?.length > 0 ? (
              currentData?.notifications?.map((notification) => (
                <li
                  onClick={() =>
                    handleClickNotification(notification.id, notification.path)
                  }
                  key={notification.id}
                  className={`p-3 ${
                    notification.viewed ? "hidden" : "block"
                  } hover:bg-mainColor hover:text-white first-letter:uppercase border border-mainColor`}
                >
                  <p className="">{notification.title}</p>
                  <p className="text-sm">{notification.content}</p>
                </li>
              ))
            ) : (
              <p>No notifications</p>
            )}{" "}
          </ul>
        </div>
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
            path={`/vms/${id}/dashboard`}
            icon={<GoDashboard />}
          />
          {/* <NavItem
            text={"mailbox"}
            path={`/vms/${id}/mailbox`}
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
          {isAdmin && (
            <>
              {" "}
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
                path={isAdmin ? `/vms/${id}/admin/shift` : `/vms/${id}/shift`}
                icon={<MdPendingActions />}
              />
            </>
          )}

          <NavItem
            text={"tasks"}
            path={`/vms/${id}/task`}
            icon={<VscTasklist />}
          />
          <NavItem
            text={"knowledge base"}
            path={`/vms/${id}/knowledge-base`}
            icon={<FaBookReader />}
          />
          {/* <NavItem
            text={"expenses"}
            path={`/vms/${id}/expense`}
            icon={<IoReceiptOutline />}
          />
          <NavItem
            text={"settings"}
            path="/settings"
            icon={<MdOutlineSettingsSuggest />}
          /> */}
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
