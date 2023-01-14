import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addComment } from "../controllers/post";
import { selectUserData } from "../redux/reducers/usersSlice";

export default function WriteMyComment({ postId }: { postId: string }) {
  const [comment, setComment] = useState("");
  const [isCommentingLoading, setIsCommentingLoading] = useState(false);

  const user = useSelector(selectUserData)

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCommentingLoading(true);

    if(comment) {
      addComment(comment, postId , user.uid, user.email)
        .then(() => {
          setIsCommentingLoading(false);
          setComment("");
        })
        .catch((error) => console.error(error))
    }
  };

  return (
    <form onSubmit={(e) => handleFormSubmit(e)} className="my-3">
      <div>
        <strong>Write your comment:</strong>
      </div>
      <textarea
        placeholder="Comment..."
        name="comment"
        required={true}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="form-control"
        style={{ resize: "none" }}
        rows={3}
      ></textarea>
      <button 
      type="submit" 
      className="btn btn-primary mt-3" 
      disabled={isCommentingLoading}>
        {isCommentingLoading ? "Loading..." : "Comment"}
      </button>
    </form>
  );
}
