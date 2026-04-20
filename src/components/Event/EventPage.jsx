import React, { useEffect, useReducer } from "react";
import EventAddForm from "./EventAddForm";
import EventList from "./EventList";
import { initialState, reducer } from "../../reducers/reducer";
import {
  createCategories,
  fetchError,
  fetchStart,
  fetchSuccess,
} from "../../actions/actions";

const EventPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    dispatch(fetchStart());

    fetch(
      "https://eonet.gsfc.nasa.gov/api/v3/events?status=open&days=30&limit=20",
      { signal: controller.signal },
    )
      .then((res) => res.json())
      .then((data) => {
        const formattedEvents = data.events.map((event) => ({
          id: event.id,
          title: event.title,
          category: event.categories[0]?.title || "Title is unknown",
          date: event.geometry[0]?.date || "No date information",
          description: event.description || "No desc",
        }));
        dispatch(fetchSuccess(formattedEvents));
        const categories = [];
        data.events.forEach((event) => {
          const title = event.categories?.[0]?.title;
          if (title && !categories.includes(title)) {
            categories.push(title);
          }
        });

        dispatch(createCategories(categories));
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          dispatch(fetchError());
        }
      });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <EventAddForm dispatch={dispatch} />
      {state.error ? (
        <div>An error occurred while fetching data.</div>
      ) : (
        <EventList
          isLoading={state.isLoading}
          events={state.events}
          categories={state.categories}
          selectedCategory={state.selectedCategory}
          dispatch={dispatch}
          searchTerm={state.searchTerm}
        />
      )}
    </div>
  );
};

export default EventPage;
