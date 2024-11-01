import { useState } from "react";
import images from "../../constants/images";
import { FiMessageSquare, FiTrash, FiEdit2 } from "react-icons/fi";
import CommentForm from "../CommentForm/CommentForm";

const Comment = ({
  comment,
  loggedInUserId,
  effectedComment,
  setEffectedComment,
  addComment,
  parentId = null,
  updateComment,
  deleteComment,
  replies,
}) => {
  const isUserLoggedIn = Boolean(loggedInUserId);
  const commentBlogToUser = loggedInUserId === comment.user._id;
  const isReplying =
    effectedComment &&
    effectedComment.type === "replying" &&
    effectedComment._id === comment._id;
  const isEditing =
    effectedComment &&
    effectedComment.type === "editing" &&
    effectedComment._id === comment._id;
  const replyiedCommentId = parentId ? parentId : comment._id;
  const replyOnUserId = comment.user._id;

  return (
    <div className="flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg">
      <img
        src={images.PostProfileImage}
        alt="PostProfileImage"
        className="w-9 h-9 object-cover rounded-full"
      />
      <div className="flex flex-1 flex-col">
        <h5 className="font-bold text-dark-hard text-xs lg:text-sm">
          {comment.user.name}
        </h5>
        <span className="text-xs text-dark-light">
          {new Date(comment.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>
        {!isEditing && (
          <p className="mt-[10px] text-dark-light">{comment.desc}</p>
        )}
        {isEditing && (
          <CommentForm
            btnLabel="Update"
            formSubmitHandler={(value) => updateComment(value, comment._id)}
            formCancelHander={() => setEffectedComment(null)}
            initialValue={comment.desc}
          />
        )}
        <div className="flex items-center gap-x-3 text-dark-light text-sm mt-3 mb-3">
          {isUserLoggedIn && (
            <button
              onClick={() =>
                setEffectedComment({ type: "replying", _id: comment._id })
              }
              className="flex items-center space-x-2"
            >
              <FiMessageSquare className="w-4 h-auto" />
              <span>Reply</span>
            </button>
          )}
          {commentBlogToUser && (
            <>
              <button
                onClick={() =>
                  setEffectedComment({ type: "editing", _id: comment._id })
                }
                className="flex items-center space-x-2"
              >
                <FiEdit2 className="w-4 h-auto" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => deleteComment(comment._id)}
                className="flex items-center space-x-2"
              >
                <FiTrash className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
        {isReplying && (
          <CommentForm
            btnLabel="Reply"
            formSubmitHandler={(value) =>
              addComment(value, replyiedCommentId, replyOnUserId)
            }
            formCancelHander={() => setEffectedComment(null)}
          />
        )}
        {replies.length > 0 && (
          <>
            {replies.map((reply) => (
              <Comment
                key={reply._id}
                addComment={addComment}
                effectedComment={effectedComment}
                setEffectedComment={setEffectedComment}
                comment={reply}
                deleteComment={deleteComment}
                loggedInUserId={loggedInUserId}
                replies={[]}
                updateComment={updateComment}
                parentId={comment._id}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
export default Comment;
