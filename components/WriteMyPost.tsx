import { useState, useRef, RefObject, useEffect } from 'react';
/* import EmojiButton from './EmojiButton'; */

export default function WriteMyPost() {
  const [post, setPost] = useState("");
  /* const postInputRef: RefObject<HTMLTextAreaElement> = useRef(null); */

  return <div className="card">
    <div className="card-header">
      <strong> Write your new post</strong>
    </div>
    <div className="card-body">
      <textarea rows={4} style={{resize: "none"}} placeholder="Your Post Here..." value={post} onChange={e => setPost(e.target.value)} className="form-control"></textarea>
    </div>
    <div className="card-footer">
      <button className="btn btn-info">
        Publish
      </button>
      <div className='d-inline-flex mx-2'>
        {/* <EmojiButton input={postInputRef} string={post} setEmojiInString={setPost} /> */}
      </div>
    </div>
  </div>
}