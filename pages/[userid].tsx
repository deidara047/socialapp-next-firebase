import Head from "next/head";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import Posts from "../components/posts/Posts";
import UserEdit from "../components/UserEdit";
import UserInfo from "../components/UserInfo";
import { getUser } from "../controllers/user";
import TwoColumnLayout from "../layout/TwoColumnLayout";
import { selectUserData } from "../redux/reducers/usersSlice";

export default function UserById() {
  const router = useRouter();
  const [enableEdit, setEnableEdit] = useState(false);
  const [isUrlMe, setIsUrlMe] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoadingFinished, setIsLoadingFinished] = useState(false);
  const [title, setTitle] = useState<any>("... | SocialReact");
  const [userIdFromUrl, setUserIdFromUrl] = useState("");
  const myUser = useSelector(selectUserData);

  const switchEdit = () => setEnableEdit(!enableEdit);

  useEffect(() => {
    if(router.query.userid && myUser.finished) {
      if(router.query.userid === "me" && !myUser.logged) {
        router.push("/")
      } else {
        if((router.query.userid === "me") || (myUser.uid === router.query.userid)) setIsUrlMe(true);
        const qUrl: string = (typeof router.query.userid === "string") ? router.query.userid : ""; // Just for typescript
        if(typeof router.query.userid !== "string") throw new Error("Bad url");
  
        const userUid: string = router.query.userid === "me" ? myUser.uid! : qUrl;
        setUserIdFromUrl(router.query.userid === "me" ? myUser.uid! : qUrl)

        getUser(userUid)
          .then((data) => {
            setUserData(data)
            setTitle(data!.email + " | SocialReact")
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => setIsLoadingFinished(true))
      }
    }
  },[myUser.finished, myUser.logged, myUser.uid, router, router.query.userid, userIdFromUrl]);



  return (<>
    <Head>
      <title>{title}</title>
    </Head>
    <TwoColumnLayout
      default={
      <>
        {!isLoadingFinished ? <div className="card">
          <div className="card-body d-flex justify-content-center"><LoadingSpinner /></div>
        </div> : <>{enableEdit ? <><UserEdit enableEditFunction={switchEdit} user={userData} /></>:<UserInfo isUrlMe={isUrlMe} user={userData} enableEditFunction={switchEdit} ></UserInfo>}</> }
        <hr />
        <Posts isUrlMe={isUrlMe} userIdFromUrl={userIdFromUrl}></Posts>
      </>
      }
    />
  </>)
}