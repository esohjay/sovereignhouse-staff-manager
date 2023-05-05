import React from "react";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <section className="w-full grid place-items-center h-screen">
      <div className="w-full bg-mainColor h-64 max-w-md shadow-md grid place-items-center">
        <h3 className="text-white">Access denied</h3>
        <button
          onClick={() => navigate(-1)}
          className="text-mainColor bg-white px-5 py-3 rounded-md"
        >
          Back
        </button>
      </div>
    </section>
  );
}

export default Unauthorized;
