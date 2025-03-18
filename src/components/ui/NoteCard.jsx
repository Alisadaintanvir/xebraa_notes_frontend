import { Edit, Trash } from "lucide-react";

function NoteCard({ title, content, onEdit, onDelete }) {
  return (
    <div className="p-4 max-w-sm">
      <div className="flex rounded-lg h-full bg-white p-8 flex-col">
        <div className="flex items-center mb-3">
          <h2 className="text-gray-900 text-lg font-medium truncate">
            {title}
          </h2>
        </div>
        <div className="flex flex-col justify-between flex-grow">
          <p className="leading-relaxed text-base text-gray-700 overflow-hidden overflow-ellipsis line-clamp-3">
            {content}
          </p>
        </div>

        {/* Edit and Delete Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onEdit}
            className="p-2 text-gray-500 hover:text-blue-500 transition-colors hover:cursor-pointer"
            aria-label="Edit note"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors hover:cursor-pointer"
            aria-label="Delete note"
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
