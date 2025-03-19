import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { noteSchema } from "../../lib/validation/noteValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "../../utils/axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import socket from "../../utils/socket";
import useAuthStore from "../../store/authStore";

function AddEditNotes({ onClose, onNoteAdd, noteData, type }) {
  const { user } = useAuthStore();
  const [usersOnEdit, setUsersOnEdit] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(noteSchema), defaultValues: noteData });

  // Watch for changes in the form fields
  const title = watch("title");
  const content = watch("content");

  // Join the note room when the component mounts
  useEffect(() => {
    if (noteData?._id) {
      socket.emit("join-note", noteData._id, user.email);
      socket.on("users-in-room", (data) => {
        setUsersOnEdit(data);
      });
    }

    // Cleanup when the component unmounts
    return () => {
      if (noteData?._id) {
        socket.emit("leave-note", noteData._id, user.email);
        socket.on("users-in-room", (data) => {
          setUsersOnEdit(data);
        });
      }
    };
  }, [noteData?._id, user.email]);

  // Listen for real-time updates from other users
  useEffect(() => {
    socket.on("note-updated", (data) => {
      const noteData = data.noteData;
      setValue("title", noteData?.title);
      setValue("content", noteData?.content);
    });

    // Cleanup the listener
    return () => {
      socket.off("note-updated");
    };
  }, [setValue]);

  // Send the changes to the server
  useEffect(() => {
    if (noteData?._id) {
      const changes = { title, content };
      socket.emit("edit-note", noteData._id, changes);
    }
  }, [content, title, noteData?._id]);

  const handleCreateNote = async (data) => {
    try {
      const response = await axiosInstance.post("/notes/create", data); // Fetch from backend
      onNoteAdd(response.data.data);
      if (response.status === 201) {
        toast.success("Note created successfully");
        reset();
        onClose();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error fetching notes:", error);
    }
  };

  return (
    <div>
      <div className="relative">
        <button
          className="p-2 hover:cursor-pointer text-red-500  absolute -top-3 -right-3"
          onClick={onClose}
        >
          <X size={16} />
        </button>
      </div>
      <div>
        <form onSubmit={handleSubmit(handleCreateNote)}>
          <div className="flex flex-col gap-2 mt-2">
            <label htmlFor="" className="input-label">
              Title
            </label>
            <input
              className="text-lg bg-slate-50 text-slate-950 outline-none p-2"
              placeholder="Go to Gym at 5"
              {...register("title", { required: true })}
            />

            <p className="text-red-500 text-xs mt-1">{errors.title?.message}</p>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="" className="input-label">
              Content
            </label>
            <textarea
              type="text"
              className="text-sm text-slate-950 outline-none bg-slate-50 p2 rounded p-4"
              placeholder="Content"
              rows={10}
              {...register("content", { required: true })}
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.content?.message}
            </p>
          </div>

          <button
            className={`w-full p-4 bg-yellow-400 hover:bg-yellow-500 text-white flex items-center justify-center rounded-2xl cursor-pointer mt-4 ${
              type == "edit" && "hidden"
            }`}
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
      <div>
        <div className="flex items-center justify-center mt-4">
          <p className="text-gray-600  text-sm ">
            {usersOnEdit.filter((u) => u !== user.email).length > 0 && (
              <span className="text-gray-600 text-sm w-full text-center mb-2">
                Users in this note:
              </span>
            )}
            {usersOnEdit
              .filter((u) => u !== user.email)
              .map((userEmail) => (
                <span
                  key={userEmail}
                  className="text-white bg-green-500 text-xs rounded-md p-2 m-1"
                >
                  {userEmail}
                </span>
              ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddEditNotes;
