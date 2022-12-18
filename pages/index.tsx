import Head from "next/head";
import Posts from "../components/posts/Posts";
import UsersList from "../components/UsersList";
import WriteMyPost from "../components/WriteMyPost";
import TwoColumnLayout from "../layout/TwoColumnLayout";

export default function Home() {
  return <>
    <Head>
      <title>SocialReact</title>
    </Head>
    <TwoColumnLayout 
      default={
      <>
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
