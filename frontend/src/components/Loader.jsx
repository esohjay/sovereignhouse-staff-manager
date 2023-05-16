import React from "react";

function Loader({ text, textColor }) {
  return (
    <article className="flex gap-3 bg-white p-5 rounded-md  w-fit ">
      <div
        className={`inline-block text-${textColor} h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status"
      ></div>
      <strong className={`text-${textColor}`}>{text}</strong>
    </article>
  );
}
Loader.defaultProps = {
  text: "Please wait...",
  textColor: "mainColor",
};
export default Loader;
