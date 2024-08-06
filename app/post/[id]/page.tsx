"use server";
import Link from "next/link";
import Header from "@/app/(components)/Header";
import { apiHandler } from "@/app/(utils)/api/APIHandler";
import { Post as PostInterface } from "@/app/(utils)/interfaces/interfaces";

interface PostPageProps {
  params: { id: string };
}

const Post: React.FC<PostPageProps> = async ({ params }) => {
  const posts = await apiHandler<any>("GET", "/posts");
  let post: PostInterface | undefined;
  const id = params.id;
  if (posts && posts.data) {
    post = posts.data.data.find((p: PostInterface) => p._id === id);
  }

  if (!post) {
    return (
      <main>
        <Header />
        <div className="container mx-auto p-4 text-black bg-white mt-5">
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Header />
      <div className="container mx-auto p-4 text-black bg-white mt-5">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-4">
          By <span className="text-indigo-500">{post.authorId}</span> on{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <div className="text-lg text-gray-700 mb-4 w-full break-words whitespace-normal">
          {post.content}
        </div>
        <Link href="/">
          <span className="text-blue-500 hover:underline">Back to Home</span>
        </Link>
      </div>
    </main>
  );
};

export default Post;
