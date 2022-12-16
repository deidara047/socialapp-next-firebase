import Head from "next/head";
import { useRouter } from "next/router"
import { useState } from "react";
import Feed from "../components/Feed";
import UserEdit from "../components/UserEdit";
import UserInfo from "../components/UserInfo";
import TwoColumnLayout from "../layout/TwoColumnLayout";
import { UserInterface } from "../models/user.interface";

export default function UserById() {
  const router = useRouter();
  const { userid } = router.query;
  const [enableEdit, setEnableEdit] = useState(false);
  const user: UserInterface = {
    name: "User",
    lastname: "Last Name",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, molestiae?",
    username: "user123",
  };

  const switchEdit = () => setEnableEdit(!enableEdit);

  return (<>
    <Head>
      <title>{userid} | SocialReact</title>
    </Head>
    <TwoColumnLayout
      default={
      <>
        {enableEdit ? <UserEdit enableEditFunction={switchEdit} user={user} /> : <UserInfo user={user} enableEditFunction={switchEdit} ></UserInfo>}
        <hr />
        <Feed></Feed>
      </>
      }
    />
  </>)
}