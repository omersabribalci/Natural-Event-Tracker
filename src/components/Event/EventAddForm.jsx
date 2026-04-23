import React from "react";
import EventInput from "./EventInput";
import { eventInputs } from "../../data/eventInputs";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { addEvent, createCategories } from "../../actions/actions";
const EventAddForm = ({ dispatch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const onSubmit = (data) => {
    const newEventId = nanoid();
    const newEvent = { ...data, id: newEventId };
    dispatch(createCategories([newEvent.category]));
    dispatch(addEvent(newEvent));
    reset();
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
        Add New Event
      </h2>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {eventInputs.map((input) => (
          <div key={input.name} className="flex flex-col">
            <EventInput {...input} register={register} errors={errors} />
          </div>
        ))}

        <div className="md:col-span-2 mt-4 flex justify-end">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventAddForm;
