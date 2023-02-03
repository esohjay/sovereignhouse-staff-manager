import { useState } from "react";
import { Outlet } from "react-router-dom";
import MobileNav from "./components/MobileNav";
import DesktopNav from "./components/DesktopNav";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MobileNav />

      <main className="bg-bodyImg h-screen">
        <DesktopNav>
          <Outlet />
        </DesktopNav>
      </main>
    </>
  );
}

export default App;
