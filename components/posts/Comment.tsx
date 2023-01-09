import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { doLikeComment } from "../../controllers/post";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/reducers/usersSlice";
import { useState } from "react";

export default function Comment({postId, commentId, email, content, likes}: {postId:string, commentId: string, email: string, content: string, likes: string[]}) {
  const user = useSelector(selectUserData);
  const [isLikeLoading, setIsLikeLoading] = useState(false)

  const handleClickLikeButton = () => {
    setIsLikeLoading(true);
    doLikeComment(postId, commentId, user.uid)
      .then(() => {
        setIsLikeLoading(false)
      })
      .catch((error) => console.error(error))
  }
  
  return (
    <div className="card mb-3">
      <div className="p-2">
        <b>{email}</b>  
        <p>{content}</p>
        <div className="d-flex">
          <button disabled={isLikeLoading} onClick={() => handleClickLikeButton()} className="btn btn-light">{isLikeLoading ? "..." : <><FontAwesomeIcon style={{color: (likes.includes(user.uid) ? "#e74c3c":"") }} icon={likes.includes(user.uid) ? fasHeart:farHeart } /> {likes.length} </>}</button>
        </div>
      </div>
    </div>
  )
}