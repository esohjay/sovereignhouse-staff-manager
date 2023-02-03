import { useState } from "react";
import { Outlet } from "react-router-dom";
import MobileNav from "./components/MobileNav";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MobileNav />
      <main className="bg-bodyImg h-screen">
        <Outlet />
      </main>
    </>
  );
}

export default App;
