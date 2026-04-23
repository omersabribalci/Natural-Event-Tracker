import React, { useEffect, useReducer } from "react";
import EventAddForm from "./EventAddForm";
import EventList from "./EventList";
import { initialState, reducer } from "../../reducers/reducer";
import {
  closeDeleteModal,
  createCategories,
  deleteEvent,
  fetchError,
  fetchStart,
  fetchSuccess,
} from "../../actions/actions";
import Modal from "../UI/Modal";

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
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-emerald-700 sm:text-5xl mb-2">
            Natural Event Tracker
          </h1>
        </header>

        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <EventAddForm dispatch={dispatch} />
        </section>

        <main>
          {state.isLoading ? (
            <div className="flex flex-col items-center justify-center p-20 space-y-4">
              <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <p className="text-slate-500 font-medium animate-pulse">
                Fetching Data...
              </p>
            </div>
          ) : state.error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700">
              <p className="font-bold">Error!</p>
              <p>An error occurred while fetching data.</p>
            </div>
          ) : state.events.length !== 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <EventList
                isLoading={state.isLoading}
                events={state.events}
                categories={state.categories}
                selectedCategory={state.selectedCategory}
                dispatch={dispatch}
                searchTerm={state.searchTerm}
              />
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300">
              <p className="text-slate-400 text-xl italic">No event found...</p>
            </div>
          )}
        </main>

        {state.isDeleteModalOpen && (
          <Modal
            isDeleteModalOpen={state.isDeleteModalOpen}
            title={state.selectedEvent.title}
            desc="Are you sure you want to delete this event?"
            onClose={() => dispatch(closeDeleteModal())}
            onDelete={() => dispatch(deleteEvent(state.selectedEvent.id))}
          />
        )}
      </div>
    </div>
  );
};

export default EventPage;
