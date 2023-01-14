import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { editPost } from "../../controllers/post";
import { Posts as PostsInterface } from "../../models/post.interface";
import { selectUserData } from "../../redux/reducers/usersSlice";
import ToastMessage, { ToastKindsInterface } from "../ToastMessage";

interface PostEditForm {
  content: string
}

export default function PostEdit({post, returnToPost }: {post: PostsInterface, returnToPost: Function}) {
  const [formPostEdit, setFormPostEdit] = useState<PostEditForm>({ content: post.content });
  const [isMessage, setIsMessage] = useState(false);
  const [toastData,setToastData] = useState<ToastKindsInterface>({ message: "", kind: "danger" });
  const user = useSelector(selectUserData);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(!e.target.name) throw new Error("400: Reload the page")
    setFormPostEdit({...formPostEdit, [e.target.name]: e.target.value})
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { content } = formPostEdit;
    if(content) {
      if(user.finished) {
        editPost(user.uid, post.id!, content)
          .then(() => {
            returnToPost(false);
          })
          .catch((error) => {
            setToastData({message: error.message, kind: "danger"});
            setIsMessage(true);
          })
      }
    } else {
      throw new Error("400: Reload the page, if that does not work, contact the developer")
    }
  }

  return(
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <b>Content</b>
      <textarea
        onChange={(e) => handleFormChange(e)}
        className="form-control"
        style={{ resize: "none" }}
        name="content"
        rows={5}
        defaultValue={post.content}
        required={true}
      ></textarea>
      <p style={{color: (formPostEdit.content.length > 600 ? "#e74c3c" : "#27ae60")}}>{formPostEdit.content.length}/600</p>
      <div>
        {isMessage && <ToastMessage message={toastData.message} kind={toastData.kind} closeDiv={setIsMessage}></ToastMessage>}
      </div>
      <div className="d-flex mt-2">
        <button type="submit" className="btn btn-primary me-2">
          Save
        </button>
      </div>
      <hr />
    </form>
  )
}