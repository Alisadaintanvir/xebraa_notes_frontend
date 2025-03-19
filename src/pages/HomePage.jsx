import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import NoteCard from "../components/ui/NoteCard";
import axiosInstance from "../utils/axios";
import { toast } from "react-hot-toast";
import AddEditNotes from "../components/ui/AddEditNotes";
import Modal from "react-modal";
import { Plus } from "lucide-react";

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  Modal.setAppElement("#root");

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

  const handleNoteEdit = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === updatedNote._id ? updatedNote : note
      )
    );
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

  useEffect(() => {
    fetchNotes();
  }, [openAddEditModal.isShown]);

  const handleEditClick = (noteData) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteData });
  };

  return (
    <MainLayout>
      <div className="my-12 flex flex-col justify-center items-center space-y-6">
        <div className="container mx-auto flex flex-col items-center justify-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 ">
            {!isLoading ? (
              notes.map((note) => (
                <NoteCard
                  key={note._id}
                  title={note.title}
                  content={note.content}
                  date={new Date(note.createdAt).toLocaleDateString()}
                  onDelete={() => handleDelete(note._id)}
                  onEdit={() => handleEditClick(note)}
                />
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>

      <div className="fixed right-15 bottom-15">
        <button
          className="w-16 h-16 flex items-center justify-center rounded-2xl bg-yellow-400 text-white cursor-pointer"
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", date: null });
          }}
        >
          <Plus />
        </button>
      </div>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {
          setOpenAddEditModal({ isShown: false });
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[80%] md:w-[60%] lg:w-[40%] max-h-3/4 bg-white rounded-md top-0 translate-y-[50%] p-5 overflow-scroll-y mx-auto"
      >
        <AddEditNotes
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          onNoteAdd={handleNoteAdd}
          onNoteEdit={handleNoteEdit}
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
        />
      </Modal>
    </MainLayout>
  );
}

export default HomePage;
