import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { rdxSignUp } from "../redux/reducers/usersSlice";
import { AppDispatch } from "../redux/store";

export default function SignUp() {
  const [formSignUp, setFormSignUp] = useState({email:"", password: ""});
  const [signingUp, setSigningUp] = useState(false)
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormSignUp({...formSignUp, [e.target.name]: e.target.value})
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSigningUp(!signingUp);
    dispatch(rdxSignUp({ email: formSignUp.email, password: formSignUp.password }))
      .then((data) => {setSigningUp(!signingUp); router.push("/");})
      .catch((error) => console.error(error))
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
          <input name="email" onChange={handleFormChange} type="email" placeholder="example@email.com" className="form-control" id="inputEmail" aria-describedby="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">Password</label>
          <input name="password" onChange={handleFormChange} type="password" placeholder="*******" className="form-control" id="inputPassword" />
        </div>
      </div>
      <div className="card-footer text-center">
        <button disabled={signingUp} type="submit" className="btn btn-primary">{signingUp ? "Loading...": "Sign Up"}</button>
      </div>
    </form>
  </div>
}