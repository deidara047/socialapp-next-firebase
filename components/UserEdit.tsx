import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserInterface } from "../models/user.interface";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import ToastMessage, { ToastKinds, ToastKindsInterface } from "./ToastMessage";
import { useState } from "react";

export default function UserEdit({ user, enableEditFunction } : { user: UserInterface, enableEditFunction: Function }) {
  const { name, lastname, description, username } = user;
  const [toastMessageAttributes, setToastMessageAttributes] = useState<ToastKindsInterface>({message: "", kind: "success"});
  const [isMessageEnable, setIsMessageEnable] = useState(false);

  const setMessage = (message: string, kind: ToastKinds) => {
    setToastMessageAttributes({message, kind});
    setIsMessageEnable(!isMessageEnable);
  }

  const onEditButtonClicked = () => {
    setTimeout(() => setMessage("User Edited!", "success"), 1000)
  }

  return (
    <form className="card">
      <div className="card-body">
        <h2>Edit User</h2>
        {isMessageEnable && <ToastMessage {...toastMessageAttributes} />}
        <b>Username:</b>
        <input type="text" className="form-control" name="" id="" />
        <div className="row">
          <div className="col-6">
            <b>Name:</b>
            <input type="text" className="form-control" name="" id="" />
          </div>
          <div className="col-6">
            <b>Last Name:</b>
            <input type="text" className="form-control" name="" id="" />
          </div>
          <div className="col-12">
            <b>Description:</b>
            <textarea name="" id="" className="form-control" style={{resize: "none"}} rows={4}></textarea>
          </div>
          <div className="d-flex mt-2">
            <button type="button" onClick={() => enableEditFunction()} className="btn btn-outline-secondary me-2"><FontAwesomeIcon icon={faEye} /> Show My User</button>
            <button type="button" onClick={() => onEditButtonClicked()} className="btn btn-primary">Edit User</button> {/* Submit */}
          </div>
        </div>
      </div>
    </form>
  )
}