import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import { auth } from "../firebase";
import { rdxSignIn, selectUserData } from "../redux/reducers/usersSlice";
import { AppDispatch } from "../redux/store";

export default function Login() {
  const [formLogIn, setFormLogIn] = useState({ email: "", password: "" });
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector(selectUserData);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormLogIn({ ...formLogIn, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      rdxSignIn({ email: formLogIn.email, password: formLogIn.password })
    )
      .then((data) => {console.log(data);router.push("/")})
      .catch((error) => console.error(error));
  };


  if (auth.currentUser) router.replace("/");

  return (
    <div>
      <Head>
        <title>Login | SocialReact</title>
      </Head>
      {!user.finished ? (
        <div className="card">
          <div className="card-body d-flex justify-content-center">
            <LoadingSpinner></LoadingSpinner>
          </div>
        </div>
      ) : (!user.logged ?
        <form onSubmit={handleFormSubmit} className="card form-centered m-auto">
          <div className="text-center card-header">
            <strong className="h4">Login</strong>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">
                Email address
              </label>
              <input
                name="email"
                onChange={handleFormChange}
                type="email"
                placeholder="example@email.com"
                className="form-control"
                id="inputEmail"
                aria-describedby="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                name="password"
                onChange={handleFormChange}
                type="password"
                placeholder="*******"
                className="form-control"
                id="inputPassword"
              />
            </div>
          </div>
          <div className="card-footer text-center">
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </div>
        </form>
      : "")}
    </div>
  );
}
