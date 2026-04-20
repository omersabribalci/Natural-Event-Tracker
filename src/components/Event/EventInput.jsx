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
      <label htmlFor="" className="flex flex-col">
        {label}
        <input
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
        <p className="text-red-500">{errors[name]?.message}</p>
      </label>
    </>
  );
};

export default EventInput;
