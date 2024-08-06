import { useState } from "react";
import { apiHandler } from "@/app/(utils)/api/APIHandler";
import { useAuth } from "@/app/(utils)/context/AuthContext";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { authorId } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const postData = await apiHandler<any>("POST", "/post", {
        title: title,
        content: content,
        authorId: authorId,
      });
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
    onClose();
  };
  const handleChangeTitle = (title: string) => {
    setTitle(title);
  };
  const handleChangeContent = (content: string) => {
    setContent(content);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[95%] max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => handleChangeTitle(e.target.value as string)}
              required
              className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => handleChangeContent(e.target.value as string)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              rows={5}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Post
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-red-500 hover:underline">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreatePostModal;
