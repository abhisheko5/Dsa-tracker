import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-hot-toast";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");

  const addNote = () => {
    if (!noteText.trim()) {
      toast.error("Note cannot be empty!");
      return;
    }
    setNotes([...notes, noteText]);
    setNoteText("");
    toast.success("Note added!");
  };

  const deleteNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    setNotes(newNotes);
    toast.success("Note deleted!");
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">My Notes</h2>

      {/* Add Note */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Write a new note..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
        />
        <button
          onClick={addNote}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
        >
          Add
        </button>
      </div>

      {/* Notes List */}
      {notes.length === 0 ? (
        <p className="text-gray-500 text-center">No notes yet.</p>
      ) : (
        <ul className="space-y-3">
          {notes.map((note, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
            >
              <span>{note}</span>
              <FiTrash2
                className="text-red-500 cursor-pointer hover:text-red-700 transition"
                onClick={() => deleteNote(index)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notes;
