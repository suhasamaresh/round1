"use client";

import React, { useEffect, useState } from "react";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

const Dashboard: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [newCard, setNewCard] = useState({ question: "", answer: "" });
  const [editingCard, setEditingCard] = useState<Flashcard | null>(null);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    // Fetch all flashcards from the database
    const fetchFlashcards = async () => {
      try {
        const response = await fetch("/api/flashcard");
        const data = await response.json();
        setFlashcards(data.flashcards);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchFlashcards();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await fetch("/api/flashcard", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      setFlashcards(flashcards.filter((card) => card.id !== id));
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  const handleEdit = (id: number) => {
    const cardToEdit = flashcards.find((card) => card.id === id);
    if (cardToEdit) {
      setEditingCard(cardToEdit);
      setEditDialogOpen(true);
    }
  };

  const handleUpdate = async () => {
    if (editingCard) {
      try {
        const response = await fetch("/api/flashcard", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingCard),
        });
        const updatedFlashcard = await response.json();
        setFlashcards(
          flashcards.map((card) =>
            card.id === updatedFlashcard.updatedFlashcard.id
              ? updatedFlashcard.updatedFlashcard
              : card
          )
        );
        setEditDialogOpen(false);
        setEditingCard(null);
      } catch (error) {
        console.error("Error updating flashcard:", error);
      }
    }
  };

  const handleAdd = async () => {
    if (newCard.question.trim() && newCard.answer.trim()) {
      try {
        const response = await fetch("/api/flashcard", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCard),
        });
        const newFlashcard = await response.json();
        setFlashcards([...flashcards, newFlashcard.newflashcard]);
        setNewCard({ question: "", answer: "" });
        setAddDialogOpen(false);
      } catch (error) {
        console.error("Error adding flashcard:", error);
      }
    }
  };

  return (
    <div className="h-full w-full p-8  bg-[#111a22] min-h-screen ">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Flashcards Dashboard</h1>
      <div className="flex flex-col items-end w-full">
        <button
          onClick={() => setAddDialogOpen(true)}
          className="ml-0 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300 mb-8 "
        >
          Add New Flashcard
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {flashcards.map((flashcard) => (
          <div key={flashcard.id} className="p-6 bg-[#111a22] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative border border-white">
            <h2 className="text-xl font-semibold text-white mb-4">{flashcard.question}</h2>
            <p className="text-white mb-6">{flashcard.answer}</p>
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => handleEdit(flashcard.id)}
                className="w-[30px] h-[15px] text-center text-xs bg-yellow-500 text-white rounded hover:bg-yellow-400"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(flashcard.id)}
                className="w-[15px] h-[15px] text-center text-xs bg-red-500 text-white rounded-sm hover:bg-red-400"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Dialog */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-[400px] p-8 bg-white rounded-lg shadow-lg relative">
            <button
              onClick={() => setAddDialogOpen(false)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              X
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Flashcard</h2>
            <input
              type="text"
              placeholder="Question"
              value={newCard.question}
              onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
              className="w-full p-2 mb-4 border text-black border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Answer"
              value={newCard.answer}
              onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
              className="w-full p-2 mb-4 border text-black border-gray-300 rounded"
            />
            <button
              onClick={handleAdd}
              className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300"
            >
              Add Flashcard
            </button>
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      {isEditDialogOpen && editingCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-[400px] p-8 bg-white rounded-lg shadow-lg relative">
            <button
              onClick={() => setEditDialogOpen(false)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              X
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Flashcard</h2>
            <input
              type="text"
              placeholder="Question"
              value={editingCard.question}
              onChange={(e) => setEditingCard({ ...editingCard, question: e.target.value })}
              className="w-full p-2 mb-4 border text-black border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Answer"
              value={editingCard.answer}
              onChange={(e) => setEditingCard({ ...editingCard, answer: e.target.value })}
              className="w-full p-2 mb-4 border text-black border-gray-300 rounded"
            />
            <button
              onClick={handleUpdate}
              className="w-full p-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 transition-all duration-300"
            >
              Update Flashcard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
