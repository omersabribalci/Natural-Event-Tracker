import React from "react";

const EventInput = ({
  label,
  placeholder,
  type,
  name,
  register,
  errors,
  value,
  message,
}) => {
  return (
    <>
      <label className="flex flex-col gap-1.5 w-full mb-4 group">
        <span className="text-sm font-semibold text-slate-700 ml-1 transition-colors group-focus-within:text-emerald-600">
          {label}
        </span>
        <input
          className={`px-4 py-2.5 bg-white border rounded-lg outline-none transition-all duration-200 
            ${
              errors[name]
                ? "border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-500"
                : "border-slate-200 focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 shadow-sm"
            } placeholder:text-slate-400 text-slate-800`}
          type={type}
          placeholder={placeholder}
          name={name}
          {...register(name, {
            required: {
              value: value,
              message: message,
            },
          })}
        />
        {errors[name] && (
          <p className="text-red-500 text-xs font-medium mt-1 ml-1 animate-in fade-in slide-in-from-top-1">
            {errors[name]?.message}
          </p>
        )}
      </label>
    </>
  );
};

export default EventInput;
