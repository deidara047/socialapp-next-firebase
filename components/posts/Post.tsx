import CommentBlock from "./CommentBlock";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as farThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { loremIpsum } from 'react-lorem-ipsum';

export default function Post() {
  const mockPosts: Array<string[]> = [loremIpsum(), loremIpsum(), loremIpsum(), loremIpsum(), loremIpsum()]

  return <>
    {mockPosts.map((post, index) => {
      return(
        <div key={index} className="card mb-3">
          <div className="card-body">
            <h6>User123</h6>
            <p>{post.toString().substring(0, 200).concat(".")}</p>
            <div>
              <button className="btn btn-primary"><FontAwesomeIcon icon={farThumbsUp} /> 12</button>
              {/* TODO: Comments should show with lazy-loading */}
              <button className="mx-2 btn btn-secondary"><FontAwesomeIcon icon={faComments} /> 12</button>
            </div>
          </div>
          <div className="card-footer">
            <strong className="h5">Comments</strong>
            <hr style={{margin: "0.5rem 0 1rem"}} />
            <CommentBlock></CommentBlock>
            <CommentBlock></CommentBlock>
            <CommentBlock></CommentBlock>
          </div>
        </div>
      )
    })}
  </>
}