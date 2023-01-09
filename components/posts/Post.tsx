import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import Comment from "./Comment"
import postShowStyles from "../../styles/PostShow.module.css"
import { useState } from "react";
import { Posts as PostsInterface } from "../../models/post.interface";
import { doLike } from "../../controllers/post";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/reducers/usersSlice";

export default function Post({post, isUrlMe} : {post: PostsInterface, isUrlMe: boolean}) {
  const [isEditEnable, setIsEditEnable] = useState(false);
  const [isLikeButtonLoading ,setIsLikeButtonLoading] = useState(false);
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
                <p>{post.content}</p> {/* All that for dev purposes */}
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
              <button className="mx-2 btn btn-primary"><FontAwesomeIcon icon={faComments} /> {post.comments.length}</button>
            </div>
          </div>

          {/* COMMENTS */}
          {/* <div className="card-footer">
            TODO: Comments should show with lazy-loading
            <strong className="h5">Comments</strong>
            <hr style={{margin: "0.5rem 0 1rem"}} />
            <div>
              <Comment></Comment>
              <Comment></Comment>
              <div className={postShowStyles.sub_comment + " ms-5"}>
                <Comment></Comment>
                Me no have button comments
              </div>
              <Comment></Comment>
              <Comment></Comment>
            </div>
          </div> */}
        </div>
}