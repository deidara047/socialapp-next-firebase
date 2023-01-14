import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { Posts as PostsInterface } from "../../models/post.interface";
import { deletePost, doLike } from "../../controllers/post";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/reducers/usersSlice";
import LoadingSpinner from "../LoadingSpinner";
import WriteMyComment from "../WriteMyComment";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import PostEdit from "./PostEdit";
import Swal from "sweetalert2";

export default function Post({
  post,
  isUrlMe,
  userIdFromUrl,
}: {
  post: PostsInterface;
  isUrlMe: boolean;
  userIdFromUrl?: string;
}) {
  const [isEditEnable, setIsEditEnable] = useState(false);
  const [isLikeButtonLoading, setIsLikeButtonLoading] = useState(false);
  const [isWriteMyCommentEnable, setIsWriteMyCommentEnable] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const user = useSelector(selectUserData);
  const router = useRouter();
  /* const contentInput: RefObject<HTMLTextAreaElement> = useRef(null); */

  const handleLikeButtonClick = () => {
    setIsLikeButtonLoading(true);
    doLike(post.id!, user.uid)
      .then(() => {
        setIsLikeButtonLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const handleCommentButtonClick = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleDeleteButtonClick = () => {
    Swal.fire({
      title: 'Are you sure you want to delete this post?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(post.id!)
          .then(() => {
            Swal.fire(
              'Deleted!',
              'Your post has been deleted.',
              'success'
            )
          })
          .catch(error => console.error(error))
      }
    })
  }

  useEffect(() => {
    const tmOut = setTimeout(() => {
      if (showCommentBox) setShowComments(true);
    }, 500);

    if (!showCommentBox) {
      setShowComments(false);
    }

    return () => clearTimeout(tmOut);
  }, [showCommentBox]);

  return (
    <div className="card mb-3">
      {isUrlMe && userIdFromUrl === post.author.id && (
        <div className="card-header d-flex">
          <button
            onClick={() => setIsEditEnable(!isEditEnable)}
            className="btn btn-info"
          >
            <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
          </button>
          <button onClick={() => handleDeleteButtonClick()} className={`btn btn-danger ms-2`}>
            <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
          </button>
        </div>
      )}
      <div className="card-body">
        <div>
          {userIdFromUrl ? (
            <b>{post.author.email}</b>
          ) : (
            <Link href={post.author.id} className="user-link">
              {post.author.email}
            </Link>
          )}
          {!isEditEnable ? (
            <p>{post.content}</p>
          ) : (
            user.logged && <PostEdit returnToPost={setIsEditEnable} post={post} />
          )}
        </div>
        <div className="mt-3">
          {/* LIKE/COMMENT BUTTON */}
          {!isEditEnable && (
            <>
              {user.logged && (
                <button
                  onClick={() => handleLikeButtonClick()}
                  disabled={isLikeButtonLoading}
                  className="btn btn-light me-2"
                >
                  {" "}
                  {isLikeButtonLoading ? (
                    "..."
                  ) : (
                    <>
                      <FontAwesomeIcon
                        style={{
                          color: post.likes.includes(user.uid) ? "#e74c3c" : "",
                        }}
                        icon={
                          post.likes.includes(user.uid) ? fasHeart : farHeart
                        }
                      />{" "}
                      {post.likes.length}
                    </>
                  )}
                </button>
              )}
              <button
                onClick={() => handleCommentButtonClick()}
                className="btn btn-primary"
              >
                <FontAwesomeIcon icon={faComments} /> {post.comments.length}
              </button>
            </>
          )}
        </div>
      </div>

      {/* COMMENTS */}
      {showCommentBox && (
        <div className="card-footer">
          {/* TODO: Comments should *LOOK LIKE IS* show-*ING* with lazy-loading */}
          <strong className="h5">Comments</strong>
          {user.logged && (
            <>
              <hr style={{ margin: "0.5rem 0 1rem" }} />
              <button
                onClick={() =>
                  setIsWriteMyCommentEnable(!isWriteMyCommentEnable)
                }
                className="btn btn-primary"
              >
                <FontAwesomeIcon icon={faUserPen} /> Write my comment
              </button>
            </>
          )}
          {isWriteMyCommentEnable && user.logged && (
            <WriteMyComment postId={post.id!} />
          )}
          <hr style={{ margin: "0.5rem 0 1rem" }} />
          {showComments ? (
            <div>
              {post.comments.length > 0 ? (
                <>
                  {post.comments.map((commentObj, index) => {
                    return (
                      <Comment
                        key={index}
                        email={commentObj.author.email}
                        content={commentObj.content}
                        likes={commentObj.likes}
                        commentId={commentObj.id}
                        postId={post.id!}
                        authorId={commentObj.author.id}
                      />
                    );
                  })}
                </>
              ) : (
                <div className="text-center">
                  <h6>No comments</h6>
                </div>
              )}
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <LoadingSpinner></LoadingSpinner>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
