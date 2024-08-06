import Header from "@/app/(components)/Header";
import PostCard from "@/app/(components)/PostCard";
import { apiHandler } from "@/app/(utils)/api/APIHandler";
import { Post } from "@/app/(utils)/interfaces/interfaces";

export default async function Home() {
  const data = await apiHandler<any>("GET", "/posts");

  return (
    <main>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">All Posts</h1>

        <div className="flex flex-wrap gap-5">
          {data?.data?.data.map((post: Post, index: number) => (
            <PostCard
              key={index}
              _id={post._id}
              title={post.title}
              content={post.content}
              authorId={post.authorId}
              createdAt={post.createdAt}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
