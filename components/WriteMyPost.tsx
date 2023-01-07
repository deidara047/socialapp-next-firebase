import { useState, useRef, RefObject, useEffect, FormEvent } from 'react';
import ToastMessage, { ToastKindsInterface } from './ToastMessage';
/* import EmojiButton from './EmojiButton'; */

export default function WriteMyPost() {
  const [post, setPost] = useState("");
  const [toastData,setToastData] = useState<ToastKindsInterface>({message: "", kind: "danger"});
  const [isError, setIsError] = useState(false)
  /* const postInputRef: RefObject<HTMLTextAreaElement> = useRef(null); */
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Post submitted")
  }

  return <form onSubmit={(e) => handleSubmit(e)} className="card">
    <div className="card-header">
      <strong> Write your new post</strong>
    </div>
    <div className="card-body">
      <textarea required={true} rows={4} style={{resize: "none"}} placeholder="Your Post Here..." value={post} onChange={e => setPost(e.target.value)} className="form-control"></textarea>
      <div className="mt-3">
        {isError && <ToastMessage closeDiv={setIsError} message={toastData.message} kind={toastData.kind}></ToastMessage>}
      </div>
    </div>
    <div className="card-footer">
      <button type='submit' className="btn btn-info">
        Publish
      </button>
      <div className='d-inline-flex mx-2'>
        {/* <EmojiButton input={postInputRef} string={post} setEmojiInString={setPost} /> */}
      </div>
    </div>
  </form>
}