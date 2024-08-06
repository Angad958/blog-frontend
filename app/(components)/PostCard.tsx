import { formatDate } from "@/app/(utils)/dateutils/timeStampToDate";
import { Post } from "@/app/(utils)/interfaces/interfaces";
import Link from "next/link";

const PostCard: React.FC<Post> = ({
  _id,
  title,
  content,
  authorId,
  createdAt,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-2xl shadow-black-100 mb-4 hover:shadow-lg hover:shadow-blue-100 hover:cursor-pointer transition-shadow duration-300 ease-in-out w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
      <h2 className="text-2xl font-bold mb-2 text-black line-clamp-2">
        {title}
      </h2>
      <p className="text-gray-700 mb-4 line-clamp-3">
        {content.length > 100 ? `${content.substring(0, 100)}...` : content}
      </p>
      <div className="text-sm text-gray-500 mb-2">
        By <span className="text-indigo-500">{authorId}</span> on{" "}
        {formatDate(createdAt)}
      </div>
      <Link href={`/post/${_id}`}>
        <span className="text-blue-500 hover:underline focus:outline-none">
          Read more
        </span>
      </Link>
    </div>
  );
};

export default PostCard;
