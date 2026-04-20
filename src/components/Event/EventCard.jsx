import React from "react";
import { deleteEvent } from "../../actions/actions";

const EventCard = ({ category, date, description, title, id, dispatch }) => {
  return (
    <div>
      <div className="flex flex-col gap-4 p-4 my-4 rounded-2xl shadow-2xl shadow-black/30 bg-white/30 w-80 h-full justify-between">
        <h1 className="truncate">{title}</h1>
        <p>{category}</p>
        <p>{description}</p>
        <p>{date}</p>

        <button
          onClick={() => {
            dispatch(deleteEvent(id));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
