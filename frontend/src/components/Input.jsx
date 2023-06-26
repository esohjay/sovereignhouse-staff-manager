import React from "react";

function Input({ register, name, label, errors, required, description }) {
  return (
    <div className="mb-3">
      <label
        htmlFor={name}
        className="capitalize font-medium mb-1 block text-sm"
      >
        {label}
      </label>
      {description && <p className="my-1 text-sm">{description}</p>}
      <input
        type="text"
        {...register(name, { required })}
        className="p-2 rounded-md mb-2 block bg-white w-full focus:outline-none border border-slate-300"
      />
      {errors && errors[name] && (
        <span className="text-red-500">{errors[name]?.message}</span>
      )}
    </div>
  );
}
Input.defaultProps = {
  required: true,
};
export default Input;
