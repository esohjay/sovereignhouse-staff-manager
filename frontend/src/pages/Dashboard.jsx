import React from "react";

function Dashboard() {
  return (
    <article className="h-64 bg-white min-h-screen grid grid-cols-[2fr_1fr] gap-x-5 p-5">
      <article className="w-full bg-gray h-96 rounded-md shadow-lg"></article>
      <article className="w-full h-6 bg-red-50"></article>
    </article>
  );
}

export default Dashboard;
