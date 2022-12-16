import NoSsr from "../NoSsr";

export default function CommentBlock() {
  /*
    Comment should have (for now) only one level response
  */
  return (
    <div className="card mb-3">
      <div className="p-2">
        <b>User<NoSsr><>{Math.floor(Math.random() * (999 - 111 + 1) ) + 111}</></NoSsr></b>  
        <p>Probably France 🥖🥖!!!</p>
      </div>
    </div>
  )
}