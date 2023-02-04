import { useState } from "react";
import { Outlet } from "react-router-dom";
import MobileNav from "../components/MobileNav";
import DesktopNav from "../components/DesktopNav";
import { useSelector } from "react-redux";
import { selectSidebarState } from "../features/appSlice";

function Home() {
  const isSidebarOpen = useSelector(selectSidebarState);

  return (
    <>
      <MobileNav />
      <DesktopNav />
      <section
        className={`bg-bodyImg md:mt-[70px] md:bg-black min-h-screen ${
          !isSidebarOpen ? "md:ml-64" : "md:ml-0"
        } transition-all duration-150`}
      >
        <Outlet />
      </section>
    </>
  );
}

export default Home;
