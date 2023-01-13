import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserInterface } from "../models/user.interface";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import ToastMessage, { ToastKinds, ToastKindsInterface } from "./ToastMessage";
import { ChangeEvent, FormEvent, useState } from "react";
import { editUser } from "../controllers/user";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

interface UserEditForm {
  email: string,
  description: string
}

export default function UserEdit({ user, enableEditFunction } : { user: UserInterface, enableEditFunction: Function }) {
  const { email, description } = user;
  const router = useRouter();
  const [toastMessageAttributes, setToastMessageAttributes] = useState<ToastKindsInterface>({message: "", kind: "success"});
  const [isMessageEnable, setIsMessageEnable] = useState(false);
  const [formUserEdit, setFormUserEdit] = useState<UserEditForm>({ email: user.email, description: user.description });

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(!e.target.name) throw new Error("500: Reload the page")
    setFormUserEdit({...formUserEdit, [e.target.name]: e.target.value})
  }

  const setMessage = (message: string, kind: ToastKinds) => {
    setToastMessageAttributes({message, kind});
    setIsMessageEnable(!isMessageEnable);
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { description } = formUserEdit;
    if(description) {
      editUser(description)
        .then(() => {
          console.log("User edited!");
          enableEditFunction();
          router.reload(); // I just want to finish :)
        })
        .catch((error) => console.error(error))
    } else {
      throw new Error("400: Reload the page, if that does not work, contact the developer")
    }
  }

  return (
    <form onSubmit={(e) => handleFormSubmit(e)} className="card">
      <div className="card-body">
        <h2>Edit User</h2>
        {/* isMessageEnable && <ToastMessage {...toastMessageAttributes} />*/}
        <b>Email:</b>
        <p>{email}</p>
        <div className="row">
          <div className="col-12">
            <b>Description:</b>
            <textarea required={true} onChange={(e) => handleFormChange(e)} defaultValue={description} name="description" id="" className="form-control" style={{resize: "none"}} rows={4}></textarea>
          </div>
          <div className="d-flex mt-2">
            <button type="button" onClick={() => enableEditFunction()} className="btn btn-outline-secondary me-2"><FontAwesomeIcon icon={faEye} /> Show My User</button>
            <button type="submit" className="btn btn-primary">Edit User</button> {/* Submit */}
          </div>
        </div>
      </div>
    </form>
  )
}