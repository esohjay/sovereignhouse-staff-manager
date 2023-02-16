import React from "react";
import { Outlet } from "react-router-dom";

function Landing() {
  return (
    <main className="font-regular">
      <Outlet />
    </main>
  );
}

export default Landing;
