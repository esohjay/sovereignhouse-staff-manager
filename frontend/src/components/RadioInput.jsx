import React from "react";

function RadioInput({ register, name, label, errors, optionValues }) {
  return (
    <div className="mb-3">
      <p className="capitalize font-medium mb-1 block text-sm">{label}</p>
      {optionValues.map((option) => (
        <div key={option.id} className="flex w-full items-center mb-1 gap-x-3">
          <input
            type="radio"
            {...register(name.toLowerCase(), { required: true })}
            id={option.value}
            value={option.value}
            className="accent-mainColor"
          />
          <label
            htmlFor={option.value}
            className="capitalize font-medium  text-sm"
          >
            {option.label}
          </label>
        </div>
      ))}

      {errors && errors[name] && (
        <span className="text-red-500">this field is required</span>
      )}
    </div>
  );
}

export default RadioInput;
