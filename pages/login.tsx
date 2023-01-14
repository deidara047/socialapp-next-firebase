import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import ToastMessage, { ToastKindsInterface } from "../components/ToastMessage";
import { auth } from "../firebase";
import { rdxSignIn, selectUserData } from "../redux/reducers/usersSlice";
import { AppDispatch } from "../redux/store";
import { getMessageFromErrorCode } from "../utils/utils";

export default function Login() {
  const [formLogIn, setFormLogIn] = useState({ email: "", password: "" });
  const [toastData,setToastData] = useState<ToastKindsInterface>({message: "", kind: "danger"});
  const [isError, setIsError] = useState(false);
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
      .unwrap()
      .catch((error) => {
        console.error(error)
        setToastData({...toastData, message: getMessageFromErrorCode(error.code)})
        setIsError(true);
      });
  };

  useEffect(() => {
    let mounted = true;
    if (user.logged) {
        if(mounted) {
          router.push("/")
        }
    }

    return () => {mounted = false} 
  }, [user.logged, router])

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
        <form onSubmit={(e) => handleFormSubmit(e)} className="card form-centered m-auto">
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
              <div className="mt-3">
                {isError && <ToastMessage closeDiv={setIsError} message={toastData.message} kind={toastData.kind}></ToastMessage>}
              </div>
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
