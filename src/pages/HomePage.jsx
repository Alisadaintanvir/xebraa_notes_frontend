import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import NoteCard from "../components/ui/NoteCard";
import NoteForm from "../components/ui/NoteForm";
import axiosInstance from "../utils/axios";
import { toast } from "react-hot-toast";
function HomePage() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/notes"); // Fetch from backend
      setNotes(response.data.data); // Assuming response.data is an array of notes
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleNoteAdd = (updatedNote) => {
    setNotes((prevNotes) => [...prevNotes, updatedNote]);
  };

  const handleDelete = async (noteId) => {
    try {
      await axiosInstance.delete(`/notes/${noteId}`); // Fetch from backend
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleEdit = async (updatedNote) => {
    try {
      await axiosInstance.put(`/notes/${updatedNote._id}`, updatedNote); // Fetch from backend
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === updatedNote._id ? updatedNote : note
        )
      );
      toast.success("Note updated successfully");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <MainLayout>
      <div className="my-12 flex flex-col justify-center items-center space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-700">Notes</h1>
        </div>

        <div>
          <NoteForm onNoteAdd={handleNoteAdd} />
        </div>

        <div className="px-12 mt-12 border-t pt-4 w-full flex flex-col justify-center items-center">
          <h3 className="text-2xl font-bold text-gray-700">All Notes</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full mt-10 ">
            {!isLoading ? (
              notes.map((note) => (
                <NoteCard
                  key={note._id}
                  title={note.title}
                  content={note.content}
                  onDelete={() => handleDelete(note._id)}
                  onEdit={(updatedNote) => handleEdit(updatedNote)}
                />
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default HomePage;
