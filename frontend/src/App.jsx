import { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Nav />
      <main className="bg-bodyImg h-screen">
        <Outlet />
      </main>
    </>
  );
}

export default App;
