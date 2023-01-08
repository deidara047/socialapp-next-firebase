import Head from "next/head";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Posts from "../components/posts/Posts";
import UserEdit from "../components/UserEdit";
import UserInfo from "../components/UserInfo";
import WriteMyPost from "../components/WriteMyPost";
import TwoColumnLayout from "../layout/TwoColumnLayout";
import { UserInterface } from "../models/user.interface";

export default function UserById() {
  const router = useRouter();
  const { userid } = router.query;
  const [enableEdit, setEnableEdit] = useState(false);
  const [isUrlMe, setIsUrlMe] = useState(false);
  const user: UserInterface = {
    name: "User",
    lastname: "Last Name",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, molestiae?",
    username: "user123",
  };

  const switchEdit = () => setEnableEdit(!enableEdit);
  const titleMessage = userid + " | SocialReact";

  useEffect(() => {
    // TODO: should also be logged
    if(router.query.userid === "me") {
      setIsUrlMe(true);
    }
  },[router.query])

  return (<>
    <Head>
      <title>{titleMessage}</title>
    </Head>
    <TwoColumnLayout
      default={
      <>
        {enableEdit ? <UserEdit enableEditFunction={switchEdit} user={user} /> : <UserInfo user={user} enableEditFunction={switchEdit} ></UserInfo>}
        <hr />
        <Posts></Posts>
      </>
      }
    />
  </>)
}