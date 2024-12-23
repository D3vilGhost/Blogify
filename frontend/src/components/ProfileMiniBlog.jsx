import { Newspaper } from "lucide-react";
import { Link } from "react-router";
export default function ProfileMiniBlog({ title, summary, blogId = 123 }) {
  return (
    <div>
      <div role="alert" className="alert shadow-lg">
        <Newspaper size={32} />
        <div>
          <h3 className="font-bold">{title}</h3>
          <div className="text-xs">{summary}</div>
        </div>
        <div>
          <Link to={`/blog/view/${blogId}`}>
            <button className="m-2 btn btn-sm btn-primary">View</button>
          </Link>
          <Link to={`/blog/edit/${blogId}`}>
            <button className="m-2 btn btn-sm btn-warning">Update</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
