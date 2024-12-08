import { Newspaper } from "lucide-react";

export default function ProfileMiniBlog({ title, summary }) {
  return (
    <div>
      <div role="alert" className="alert shadow-lg">
        <Newspaper size={32} />
        <div>
          <h3 className="font-bold">{title}</h3>
          <div className="text-xs">{summary}</div>
        </div>
        <div>
          <button className="m-2 btn btn-sm btn-primary">View</button>
          <button className="m-2 btn btn-sm btn-warning">Update</button>
        </div>
      </div>
    </div>
  );
}
