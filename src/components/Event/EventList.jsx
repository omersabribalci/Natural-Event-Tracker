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
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <label>
          Search by name
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => {
              dispatch(setSearchTerm(e.target.value));
            }}
          />
        </label>
      </div>
      <div>
        <label>
          Choose category
          <select
            onChange={(e) => {
              dispatch(setCategory(e.target.value));
            }}
          >
            <option value="All">Show All...</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="px-10 py-5 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] place-items-center gap-10">
        {events
          .filter((event) =>
            event.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
          )
          .filter((event) =>
            selectedCategory !== "All"
              ? event.category === selectedCategory
              : true,
          )
          .map((event) => (
            <EventCard key={event.id} {...event} dispatch={dispatch} />
          ))}
      </div>
    </>
  );
};

export default EventList;
