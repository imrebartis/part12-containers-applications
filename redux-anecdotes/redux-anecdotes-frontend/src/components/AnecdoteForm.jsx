import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const [anecdote, setAnecdote] = useState("");
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    if (!anecdote.trim()) {
      dispatch(setNotification("Anecdote cannot be empty", 5));
      return;
    }

    try {
      dispatch(createAnecdote(anecdote));
      dispatch(
        setNotification(`the anecdote "${anecdote}" has been created`, 5)
      );
      setAnecdote("");
    } catch (error) {
      console.error("Failed to add anecdote:", error);
      dispatch(setNotification((`Error adding anecdote: ${error.message}`, 5)));
    }
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input
            name="anecdote"
            value={anecdote}
            onChange={(e) => setAnecdote(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
