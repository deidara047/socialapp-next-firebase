import { ChangeEvent, FormEvent, useState } from "react";
import { Posts as PostsInterface } from "../../models/post.interface";

interface PostEditForm {
  content: string
}

export default function PostEdit({post}: {post: PostsInterface}) {
  const [formPostEdit, setFormPostEdit] = useState<PostEditForm>({ content: post.content });

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(!e.target.name) throw new Error("400: Reload the page")
    setFormPostEdit({...formPostEdit, [e.target.name]: e.target.value})
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { content } = formPostEdit;
    if(content) {
      console.log(content);
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