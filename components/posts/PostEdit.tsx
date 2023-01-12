import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { editPost } from "../../controllers/post";
import { Posts as PostsInterface } from "../../models/post.interface";
import { selectUserData } from "../../redux/reducers/usersSlice";

interface PostEditForm {
  content: string
}

export default function PostEdit({post}: {post: PostsInterface}) {
  const [formPostEdit, setFormPostEdit] = useState<PostEditForm>({ content: post.content });
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
          .then(() => console.log("Post Edited!"))
          .catch((error) => console.error(error))
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
      <div className="d-flex mt-2">
        <button type="submit" className="btn btn-primary me-2">
          Save
        </button>
      </div>
      <hr />
    </form>
  )
}