import { Calendar } from "lucide-react";
import { Link } from "react-router";
export default function MiniBlog({ image, title, summary, date, blogId }) {
  return (
    <div>
      <div className="flex flex-row gap-3 m-2 max-h-60">
        <div className=" w-1/3 max-h-50 flex justify-center ">
          <img src={image} alt="image" />
        </div>
        <div className=" w-2/3 flex flex-col gap-2">
          <div className="text-2xl font-bold">{title}</div>
          <div className="flex-start">{summary}</div>
          <div className="flex w-full justify-between items-center">
            <div className="text-neutral-500 flex gap-2">
              <Calendar size={32} strokeWidth={1.5} /> {date}
            </div>
            <Link
              to={`/blog/view/${blogId}`}
              className="btn btn-ghost bg-base-300"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
