import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { UserInterface } from "../models/user.interface";

export default function UserInfo({ user, enableEditFunction } : { user: UserInterface, enableEditFunction: Function }) {
  const { name, lastname, description, username } = user;

  return (
    <div className="card">
      <div className="card-body">
        <h1>{username}</h1>
        <div className="row">
          <div className="col-6">
            <b>Name:</b>
            <p>{name}</p>
          </div>
          <div className="col-6">
            <b>Last Name:</b>
            <p>{lastname}</p>
          </div>
          <div className="col-12">
            <b>Description:</b>
            <p>{description}</p>
          </div>
        </div>
        <button onClick={() => enableEditFunction()} className="btn btn-primary"><FontAwesomeIcon icon={faPenToSquare} /> Edit my user</button>
      </div>
    </div>
  );
}
