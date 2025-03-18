import { Edit, Trash, FilePen } from "lucide-react";

function NoteCard({ title, content, date, onEdit, onDelete }) {
  return (
    <div className="flex flex-col rounded-lg border border-slate-200 p-4 bg-white hover:shadow-xl transition-all ease-in-out space-y-4">
      <div className="flex items-center justify-between">
        <h6 className="text-sm font-medium">{title}</h6>
        <span className="text-xs text-slate-500"> {date}</span>
      </div>

      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-end gap-2 mt-2">
        <FilePen onClick={onEdit} className="icon-btn hover:text-yellow-600" />
        <Trash onClick={onDelete} className="icon-btn hover:text-yellow-600" />
      </div>
    </div>
  );
}

export default NoteCard;
