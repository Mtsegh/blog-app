import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import useCommentStore from "../store/useCommentStore";
import Loader2 from "./loader/Loader2";

export default function CommentSection({ blogId, authUser, setShowLogin }) {
  const [text, setText] = useState("");
  const {
    comments,
    getComments,
    addComment,
    deleteComment,
    isLoading,
    no_of_comments,
  } = useCommentStore();

  useEffect(() => {
    if (blogId) getComments(blogId);
  }, [blogId]);

  const handleAddComment = async () => {
    if (!text.trim()) return;
    if (!authUser) {
      setShowLogin(true);
      return;
    }

    await addComment(blogId, {
      text,
      author: authUser._id,
    });

    setText("");
  };

  if (isLoading) return <Loader2 />;

  return (
    <div className="w-full mt-10 border-t pt-6">
      <h3 className="text-2xl font-semibold mb-4">
        Comments ({no_of_comments})
      </h3>

      <div className="flex gap-2 mb-6">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white px-4 rounded-lg"
          >
            Post
          </button>
      </div>

      <div className="space-y-4">
        {comments?.map(comment => (
          <div key={comment._id} className="flex gap-3">
            <img
              src={comment.author?.profileImage}
              className="size-10 rounded-full"
            />

            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex justify-between">
                <p className="font-semibold">{comment.author?.fullname}</p>

                {authUser?._id === comment.author?._id && (
                  <Trash2
                    onClick={() => deleteComment(comment._id)}
                    className="size-4 text-red-500 cursor-pointer"
                  />
                )}
              </div>

              <p className="mt-1">{comment.comment}</p>
            </div>
          </div>
        ))}

        {!comments?.length && (
          <p className="text-gray-500">No comments yet</p>
        )}
      </div>
    </div>
  );
}

