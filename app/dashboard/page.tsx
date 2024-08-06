"use client";
import { useState } from "react";
import Header from "@/app/(components)/Header";
import PostCard from "@/app/(components)/PostCard";
import CreatePostModal from "@/app/(components)/CreatePostModal";
import withAuth from "@/app/(components)/withAuth";
import { useAuth } from "@/app/(utils)/context/AuthContext";
import useApi from "@/app/(utils)/api/useAPI";
import { Post } from "@/app/(utils)/interfaces/interfaces";

const Dashboard = () => {
  const { authorId } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postData] = useApi<any>("GET", `/posts?author=${authorId}`);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main>
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex justify-between">
          {" "}
          <h1 className="text-3xl font-bold mb-4">My Posts</h1>
          <button
            onClick={openModal}
            className="bg-blue-500 text-white px-4 py-2 rounded border border-blue-700 hover:bg-blue-700 hover:border-blue-800 mb-4 inline-block"
          >
            Create New Post
          </button>
        </div>

        <div className="flex flex-wrap gap-5">
          {postData?.data?.data.map((post: Post, index: number) => (
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

      <CreatePostModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
};

Dashboard.displayName = "Dashboard";
export default withAuth(Dashboard);
