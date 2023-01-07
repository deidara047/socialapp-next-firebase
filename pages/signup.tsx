import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import ToastMessage, { ToastKindsInterface } from "../components/ToastMessage";
import { rdxSignUp } from "../redux/reducers/usersSlice";
import { AppDispatch } from "../redux/store";

export default function SignUp() {
  const [toastData,setToastData] = useState<ToastKindsInterface>({message: "", kind: "danger"});
  const [formSignUp, setFormSignUp] = useState({email:"", password: "", description: ""});
  const [signingUp, setSigningUp] = useState(false)
  const [isError, setIsError] = useState(false)
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormSignUp({...formSignUp, [e.target.name]: e.target.value})
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSigningUp(!signingUp);
    dispatch(rdxSignUp({ email: formSignUp.email, password: formSignUp.password, description: formSignUp.description }))
      .unwrap()
      .then((data) => {
        router.push("/")
      })
      .catch((error) => {
        console.log(error)
        setSigningUp(false);
        setToastData({...toastData, message: error.message})
        setIsError(true);
      })
  }

  return <div>
    <Head>
      <title>Sign Up | SocialReact</title>
    </Head>
    <form onSubmit={handleFormSubmit} className="card form-centered m-auto">
      <div className="text-center card-header">
        <strong className="h4">SignUp</strong>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">Email address</label>
          <input name="email" required={true} onChange={handleFormChange} type="text" placeholder="example@email.com" className="form-control" id="inputEmail" aria-describedby="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">Password</label>
          <input name="password" required={true} onChange={handleFormChange} type="password" placeholder="*******" className="form-control" id="inputPassword" />
          <p style={{fontFamily: "system-ui"}} className={formSignUp.password.length < 6 ? "text-danger" : "text-success" }><span>{formSignUp.password.length}</span>/6</p>
        </div>
        <div className="mb-3">
          <label htmlFor="inputDescription">Description</label>
          <textarea placeholder="My description..." name="description" required={true} onChange={handleFormChange} id="inputDescription" rows={4} className="form-control" style={{resize: "none"}}></textarea>
          <p style={{fontFamily: "system-ui"}} className={formSignUp.description.length >= 60 ? "text-danger" : "text-success" }><span>{formSignUp.description.length}</span>/60</p>
        </div>
        <div className="mt-3">
          {isError && <ToastMessage closeDiv={setIsError} message={toastData.message} kind={toastData.kind}></ToastMessage>}
        </div>
      </div>
      <div className="card-footer text-center">
        <button disabled={signingUp} type="submit" className="btn btn-primary">{signingUp ? "Loading...": "Sign Up"}</button>
      </div>
    </form>
  </div>
}