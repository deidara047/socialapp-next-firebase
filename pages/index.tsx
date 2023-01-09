import Head from "next/head";
import Link from "next/link";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import Posts from "../components/posts/Posts";
import UsersList from "../components/UsersList";
import WriteMyPost from "../components/WriteMyPost";
import TwoColumnLayout from "../layout/TwoColumnLayout";
import { selectUserData } from "../redux/reducers/usersSlice";

export default function Home() {
  const user = useSelector(selectUserData)

  return <>
    <Head>
      <title>SocialReact</title>
    </Head>
    <TwoColumnLayout 
      default={
      <>
        {!user.finished ? 
        <div className="card">
          <div className="card-body d-flex justify-content-center">
            <LoadingSpinner></LoadingSpinner>
          </div>
        </div> : (user.logged ? <>
          <h3>Hello {user.email}!</h3>
          <br />
          <WriteMyPost></WriteMyPost>
          </>
        :
          <div className="card">
            <div className="card-body">
              <h4>Write a post! <Link href={"/login"}>Log In</Link> or <Link href={"/signup"}>Sign Up</Link></h4>
            </div>
          </div>
        )}
        
        <hr />
        <Posts></Posts>
      </>
      }
      right={
        <>
          <h1>:(</h1>
        </>
      }
    />
  </>
}
