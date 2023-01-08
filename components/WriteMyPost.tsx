import { Timestamp } from 'firebase/firestore';
import { useState, useRef, RefObject, useEffect, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { addPost } from '../controllers/post';
import { selectUserData } from '../redux/reducers/usersSlice';
import ToastMessage, { ToastKindsInterface } from './ToastMessage';
/* import EmojiButton from './EmojiButton'; */

export default function WriteMyPost() {
  const [post, setPost] = useState("");
  const [toastData,setToastData] = useState<ToastKindsInterface>({message: "", kind: "danger"});
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  /* const postInputRef: RefObject<HTMLTextAreaElement> = useRef(null); */
  const user = useSelector(selectUserData);
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormLoading(true);

    if(post) {
      addPost(post, user.uid, user.email)
        .then((data) => {
          setIsFormLoading(false);
          setToastData({message: "Post Published!", kind: "success"})
          setIsMessage(true);
          setPost("");
        })
        .catch((error) => {
          console.error(error)
          setIsFormLoading(false);
          setToastData({message: error, kind: "danger"})
          setIsMessage(true);
        })
    } else {
      setIsFormLoading(false);
      setToastData({message: "You have not written a post yet", kind: "danger"})
      setIsMessage(true);
    }
  }

  return <form onSubmit={(e) => handleSubmit(e)} className="card">
    <div className="card-header">
      <strong> Write your new post</strong>
    </div>
    <div className="card-body">
      <textarea required={true} rows={4} style={{resize: "none"}} placeholder="Your Post Here..." value={post} onChange={e => setPost(e.target.value)} className="form-control"></textarea>
      <div className="mt-3">
        {isMessage && <ToastMessage closeDiv={setIsMessage} message={toastData.message} kind={toastData.kind}></ToastMessage>}
      </div>
    </div>
    <div className="card-footer">
      <button disabled={isFormLoading} type='submit' className="btn btn-info">
        {isFormLoading ? "Loading..." : "Publish"}
      </button>
      <div className='d-inline-flex mx-2'>
        {/* <EmojiButton input={postInputRef} string={post} setEmojiInString={setPost} /> */}
      </div>
    </div>
  </form>
}