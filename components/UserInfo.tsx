import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { UserInterface } from "../models/user.interface";

export default function UserInfo({ enableEditFunction, isUrlMe, user } : { enableEditFunction: Function, isUrlMe: boolean, user: UserInterface }) {
   return (
    <div className="card">
      <div className="card-body">
        <h1>{user.email}</h1>
        <div className="row">
          <div className="col-12">
            <b>Description:</b>
            <p>{user.description}</p>
          </div>
        </div>
        {isUrlMe && <button onClick={() => enableEditFunction()} className="btn btn-primary"><FontAwesomeIcon icon={faPenToSquare} /> Edit my user</button>}
      </div>
    </div>
  );
}
