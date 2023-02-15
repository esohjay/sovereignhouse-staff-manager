import React from "react";
import { Outlet } from "react-router-dom";

function Landing() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default Landing;
