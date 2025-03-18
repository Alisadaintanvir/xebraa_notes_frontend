import axiosInstance from "../../utils/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema } from "../../lib/validation/noteValidation";
import { toast } from "react-hot-toast";

function NoteForm({ onNoteAdd }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(noteSchema) });

  const handleCreateNote = async (data) => {
    console.log(data);
    try {
      const response = await axiosInstance.post("/notes/create", data); // Fetch from backend
      onNoteAdd(response.data.data);
      if (response.status === 201) {
        reset();
        toast.success("Note created successfully");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error fetching notes:", error);
    }
  };

  return (
    <form
      className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      onSubmit={handleSubmit(handleCreateNote)}
    >
      <div className="mb-4 flex flex-col gap-6">
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700  outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            {...register("title", { required: true })}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Title
          </label>

          <p className="text-red-500 text-xs mt-1">{errors.title?.message}</p>
        </div>

        <div className="relative h-auto w-full min-w-[200px]">
          <textarea
            className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-slate-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            {...register("content", { required: true })}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-slate-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-slate-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-slate-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            content
          </label>
        </div>

        <p className="text-red-500 text-xs mt-1">{errors.content?.message}</p>
      </div>

      <button
        className="mt-6 block w-full select-none rounded-lg bg-slate-700 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-slate-500/20 transition-all hover:shadow-lg hover:shadow-slate-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:cursor-pointer"
        type="submit"
        data-ripple-light="true"
      >
        Add Note
      </button>
    </form>
  );
}

export default NoteForm;
