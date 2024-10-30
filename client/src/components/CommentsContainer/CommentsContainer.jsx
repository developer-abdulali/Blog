import { useEffect, useState } from "react";
import CommentForm from "../CommentForm/CommentForm";
import { getCommentsData } from "../../data/comments";
import Comment from "../Comment/Comment";

const CommentsContainer = ({ className, loggedInUserId }) => {
  const [comments, setComments] = useState([]);
  let mainComments = comments.filter((comment) => comment.parent === null);
  const [effectedComment, setEffectedComment] = useState(null);

  console.log("MAIN Comments", mainComments);

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    const newComment = {
      _id: "10",
      user: {
        _id: "a",
        name: "Mohammad Rezaii",
      },
      desc: value,
      post: "1",
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: "2022-12-31T17:22:05.092+0000",
    };
    setComments((curState) => {
      return [newComment, ...curState];
    });
  };

  useEffect(() => {
    (async () => {
      const commentData = await getCommentsData();
      setComments(commentData);
    })();
  }, []);

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentHandler(value)}
      />
      <div className="space-y-4 mt-8">
        {mainComments?.map((comment) => (
          <Comment
            comment={comment}
            loggedInUserId={loggedInUserId}
            effectedComment={effectedComment}
            setEffectedComment={setEffectedComment}
          />
        ))}
      </div>
    </div>
  );
};
export default CommentsContainer;
