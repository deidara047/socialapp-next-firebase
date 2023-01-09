import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import Comment from "./Comment"
import { useEffect, useState } from "react";
import { Posts as PostsInterface } from "../../models/post.interface";
import { doLike } from "../../controllers/post";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/reducers/usersSlice";
import LoadingSpinner from "../LoadingSpinner";
import WriteMyComment from "../WriteMyComment";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";

export default function Post({post, isUrlMe} : {post: PostsInterface, isUrlMe: boolean}) {
  const [isEditEnable, setIsEditEnable] = useState(false);
  const [isLikeButtonLoading ,setIsLikeButtonLoading] = useState(false);
  const [isWriteMyCommentEnable, setIsWriteMyCommentEnable] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const user = useSelector(selectUserData);
  /* const contentInput: RefObject<HTMLTextAreaElement> = useRef(null); */

  const handleLikeButtonClick = () => {
    setIsLikeButtonLoading(true);
    doLike(post.id!, user.uid)
      .then(() => {
        setIsLikeButtonLoading(false)
      })
      .catch((error) => console.error(error))
  }

  const handleCommentButtonClick = () => {
    setShowCommentBox(!showCommentBox);
  }

  useEffect(() => {
    const tmOut = setTimeout(() => {
      if(showCommentBox) setShowComments(true);
    }, 500)

    if(!showCommentBox) {
      setShowComments(false)
    }

    return () => clearTimeout(tmOut)
  }, [showCommentBox])
  
  return <div className="card mb-3">
          <div className="card-body">
            {isUrlMe &&
              <div className="d-flex my-2">
                <button onClick={() => setIsEditEnable(!isEditEnable)} className="btn btn-info"><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></button>
                <button className={`btn btn-danger ms-2`}><FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></button>
              </div>
            }
            {!isEditEnable ?
              <div>
                <h6>{post.author.email}</h6>
                <p>{post.content}</p>
              </div>
             :
              <form action="#">
                <h6>User123</h6>
                <b>Content</b>
                <textarea className="form-control" style={{resize: "none"}} name="" id="" rows={5}></textarea>
                <div className="d-flex mt-2">
                  <button type="button" className="btn btn-primary me-2">Save</button>
                </div>
                <hr />
              </form>
             }
            <div className="mt-3">
              <button onClick={() => handleLikeButtonClick()} disabled={isLikeButtonLoading} className="btn btn-light"> {isLikeButtonLoading ? "..." : <><FontAwesomeIcon style={{color: (post.likes.includes(user.uid) ? "#e74c3c":"") }} icon={post.likes.includes(user.uid) ? fasHeart:farHeart } /> {post.likes.length}</>}</button>
              <button onClick={() => handleCommentButtonClick()} className="mx-2 btn btn-primary"><FontAwesomeIcon icon={faComments} /> {post.comments.length}</button>
            </div>
          </div>


          {/* COMMENTS */}
          {showCommentBox && <div className="card-footer">
            {/* TODO: Comments should *LOOK LIKE IS* show-*ING* with lazy-loading */}
            <strong className="h5">Comments</strong>
            <hr style={{margin: "0.5rem 0 1rem"}} />
            <button onClick={() => setIsWriteMyCommentEnable(!isWriteMyCommentEnable)} className="btn btn-primary"><FontAwesomeIcon icon={faUserPen}/> Write my comment</button>
            {isWriteMyCommentEnable && <WriteMyComment postId={post.id!} />}
            <hr style={{margin: "0.5rem 0 1rem"}} />
            {showComments ? <div>
              {post.comments.length > 0 ? (<>
                {post.comments.map((commentObj, index) => {
                  return (
                  <Comment 
                    key={index} 
                    email={commentObj.author.email} 
                    content={commentObj.content} 
                    likes={commentObj.likes}
                    commentId={commentObj.id}
                    postId={post.id!}
                  />)
                })}
              </>)
              : <div className="text-center"><h6>No comments</h6></div>}
            </div> : <div className="d-flex justify-content-center"><LoadingSpinner></LoadingSpinner></div>}
            
          </div>}
        </div>
}