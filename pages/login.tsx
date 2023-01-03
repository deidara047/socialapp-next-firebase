import Head from "next/head";

export default function Login() {
  return <div>
    <Head>
      <title>Login | SocialReact</title>
    </Head>
    <form className="card form-centered m-auto">
      <div className="text-center card-header">
        <strong className="h4">Login</strong>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="inputEmail" className="form-label">Email address</label>
          <input type="email" className="form-control" id="inputEmail" aria-describedby="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="inputPassword" />
        </div>
      </div>
      <div className="card-footer text-center">
        <button type="submit" className="btn btn-primary">Log In</button>
      </div>
    </form>
  </div>
}