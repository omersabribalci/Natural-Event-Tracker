import React from "react";
import { openDeleteModal } from "../../actions/actions";

const EventCard = ({ category, date, description, title, dispatch, event }) => {
  return (
    <div className="group h-full">
      <div className="flex flex-col gap-4 p-6 rounded-2xl bg-white border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-300 w-80 h-full justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-bl-xl uppercase tracking-wider">
          {category}
        </div>

        <div className="space-y-3">
          <h1
            className="text-xl font-bold text-slate-800 leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2"
            title={title}
          >
            {title}
          </h1>

          <div className="flex items-center text-slate-400 text-xs font-medium">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {new Date(date).toLocaleDateString()}
          </div>

          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        <button
          className="mt-4 w-full py-2.5 px-4 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 font-semibold rounded-xl border border-slate-100 hover:border-red-100 transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer"
          onClick={() => {
            dispatch(openDeleteModal(event));
          }}
        >
          <svg
            className="w-4 h-4 transition-transform group-hover/btn:rotate-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete Event
        </button>
      </div>
    </div>
  );
};

export default EventCard;
