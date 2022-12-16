import Head from "next/head";
import Feed from "../components/Feed";
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
        <Feed></Feed>
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
