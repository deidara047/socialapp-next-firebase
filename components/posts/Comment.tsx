import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as farThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import NoSsr from "../NoSsr";

export default function Comment() {
  /*
    Comment should have (for now) only one level response
  */
  return (
    <div className="card mb-3">
      <div className="p-2">
        <b>User<NoSsr><>{Math.floor(Math.random() * (999 - 111 + 1) ) + 111}</></NoSsr></b>  
        <p>Probably France 🥖🥖!!!</p>
        <div className="d-flex">
          <button className="btn btn-primary"><FontAwesomeIcon icon={farThumbsUp} /> 12</button>
            {/* TODO: Comments should show with lazy-loading */}
            <button className="mx-2 btn btn-secondary"><FontAwesomeIcon icon={faComments} /> 12</button>
        </div>
      </div>
    </div>
  )
}