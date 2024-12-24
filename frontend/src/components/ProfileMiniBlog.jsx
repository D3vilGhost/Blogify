import { Newspaper } from "lucide-react";
import { Link } from "react-router";
export default function ProfileMiniBlog({ title, summary, blogId = 0 }) {
  // these miniature blogs are shown on user's profile as blogs user have created
  return (
    // main component logic
    <div>
      <div role="alert" className="alert shadow-lg">
        <Newspaper size={32} />
        <div>
          <h3 className="font-bold">{title}</h3>
          <div className="text-xs">{summary}</div>
        </div>
        <div>
          {/* button to view that particular blog */}
          <Link to={`/blog/view/${blogId}`}>
            <button className="m-2 btn btn-sm btn-primary">View</button>
          </Link>
          {/* button to update that partcular blog */}
          <Link to={`/blog/edit/${blogId}`}>
            <button className="m-2 btn btn-sm btn-warning">Update</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
