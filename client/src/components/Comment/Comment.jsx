import { useState } from "react";
import images from "../../constants/images";
import { FiMessageSquare, FiTrash, FiEdit2 } from "react-icons/fi";

const Comment = ({
  comment,
  loggedInUserId,
  effectedComment,
  setEffectedComment,
}) => {
  const isUserLoggedIn = Boolean(loggedInUserId);
  const commentBlogToUser = loggedInUserId === comment.user._id;

  return (
    <div className="flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg">
      <img
        src={images.PostProfileImage}
        alt="PostProfileImage"
        className="w-9 h-9 object-cover rounded-full"
      />
      <div className="flex flex-1 flex-col">
        <h5 className="font-bold text-dark-hard text-xs">
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
        <p className="mt-[10px] text-dark-light">{comment.desc}</p>
        <div className="flex items-center gap-x-3 text-dark-light text-sm mt-3 mb-3">
          {isUserLoggedIn && (
            <button className="flex items-center space-x-2">
              <FiMessageSquare className="w-4 h-auto" />
              <span>Reply</span>
            </button>
          )}
          {commentBlogToUser && (
            <>
              <button className="flex items-center space-x-2">
                <FiEdit2 className="w-4 h-auto" />
                <span>Edit</span>
              </button>
              <button className="flex items-center space-x-2">
                <FiTrash className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Comment;
