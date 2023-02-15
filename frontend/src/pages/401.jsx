import React from "react";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <section className="w-full grid place-items-center h-screen">
      <div className="w-full bg-gray h-64 max-w-md shadow-md">
        <h3>Access denied</h3>
        <button onClick={() => navigate("/admin")}>Dashboard</button>
      </div>
    </section>
  );
}

export default Unauthorized;
