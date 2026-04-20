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
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      {eventInputs.map((input) => (
        <EventInput
          key={input.name}
          {...input}
          register={register}
          errors={errors}
        />
      ))}
      <button className="cursor-pointer">Add Event</button>
    </form>
  );
};

export default EventAddForm;
