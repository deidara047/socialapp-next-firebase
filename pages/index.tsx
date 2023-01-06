import Head from "next/head";
import { useSelector } from "react-redux";
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
        {user.logged && <h1>Hello {user.email}</h1>}
        <WriteMyPost></WriteMyPost>
        <hr />
        <Posts></Posts>
      </>
      }
      right={
        <>
          <UsersList/>
        </>
      }
    />
  </>
}
