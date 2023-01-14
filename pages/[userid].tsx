import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import LoadingSpinner from "../components/LoadingSpinner";
import Posts from "../components/posts/Posts";
import UserEdit from "../components/UserEdit";
import UserInfo from "../components/UserInfo";
import { deleteMyUser, getUser } from "../controllers/user";
import TwoColumnLayout from "../layout/TwoColumnLayout";
import { rdxSignOut, selectUserData } from "../redux/reducers/usersSlice";
import { AppDispatch } from "../redux/store";

export default function UserById() {
  const router = useRouter();
  const [enableEdit, setEnableEdit] = useState(false);
  const [isUrlMe, setIsUrlMe] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoadingFinished, setIsLoadingFinished] = useState(false);
  const [title, setTitle] = useState<any>("... | SocialReact");
  const [userIdFromUrl, setUserIdFromUrl] = useState("");
  const myUser = useSelector(selectUserData);
  const dispatch = useDispatch<AppDispatch>();
  const switchEdit = () => setEnableEdit(!enableEdit);

  const handleDeleteUserButtonClick = () => {
    Swal.fire({
      title: 'Are you sure you want to delete your user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMyUser()
          .then(() => {
            dispatch(rdxSignOut())
              .then(() => router.push("/"))
              .catch((error) => console.error(error))
            
          })
          .catch((error) => console.error(error))
      }
    })
  }

  useEffect(() => {
    if (router.query.userid && myUser.finished) {
      if (router.query.userid === "me" && !myUser.logged) {
        router.push("/");
      } else {
        if (router.query.userid === "me" || myUser.uid === router.query.userid)
          setIsUrlMe(true);
        const qUrl: string =
          typeof router.query.userid === "string" ? router.query.userid : ""; // Just for typescript
        if (typeof router.query.userid !== "string") throw new Error("Bad url");

        const userUid: string =
          router.query.userid === "me" ? myUser.uid! : qUrl;
        setUserIdFromUrl(router.query.userid === "me" ? myUser.uid! : qUrl);

        getUser(userUid)
          .then((data) => {
            setUserData(data);
            setTitle(data!.email + " | SocialReact");
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => setIsLoadingFinished(true));
      }
    }
  }, [
    myUser.finished,
    myUser.logged,
    myUser.uid,
    router,
    router.query.userid,
    userIdFromUrl,
  ]);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <TwoColumnLayout
        default={
          <>
            {!isLoadingFinished ? (
              <div className="card">
                <div className="card-body d-flex justify-content-center">
                  <LoadingSpinner />
                </div>
              </div>
            ) : (
              <>
                {isUrlMe && <button onClick={() => handleDeleteUserButtonClick()} className="btn btn-danger mb-3">
                  <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon> Delete My User
                </button>}
                {enableEdit ? (
                  <>
                    <UserEdit enableEditFunction={switchEdit} user={userData} />
                  </>
                ) : (
                  <UserInfo
                    isUrlMe={isUrlMe}
                    user={userData}
                    enableEditFunction={switchEdit}
                  ></UserInfo>
                )}
              </>
            )}
            <hr />
            {isUrlMe && (
              <>
                <Link href="/">&larr; Add your post</Link>
                <hr />
              </>
            )}
            <Posts isUrlMe={isUrlMe} userIdFromUrl={userIdFromUrl}></Posts>
          </>
        }
      />
    </>
  );
}