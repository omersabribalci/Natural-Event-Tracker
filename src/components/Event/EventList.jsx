import React from "react";
import EventCard from "./EventCard";
import { setCategory, setSearchTerm } from "../../actions/actions";

const EventList = ({
  events,
  isLoading,
  categories,
  selectedCategory,
  dispatch,
  searchTerm,
}) => {
  const filteredEvents = events
    .filter((event) =>
      event.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
    )
    .filter((event) =>
      selectedCategory !== "All" ? event.category === selectedCategory : true,
    );
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">
          Loading events...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex flex-col md:flex-row gap-6 items-end">
        <div className="w-full md:w-1/2">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
            Search by name
          </label>
          <div className="relative">
            <input
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all shadow-sm placeholder:text-slate-400"
              type="search"
              value={searchTerm}
              onChange={(e) => {
                dispatch(setSearchTerm(e.target.value));
              }}
            />
            <svg
              className="absolute left-3 top-3 h-5 w-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">
            Choose category
          </label>
          <select
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all shadow-sm appearance-none cursor-pointer text-slate-700"
            value={selectedCategory}
            onChange={(e) => {
              dispatch(setCategory(e.target.value));
            }}
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-slate-500 text-lg font-medium">
              No events found matching your criteria.
            </p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              dispatch={dispatch}
              event={event}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EventList;
