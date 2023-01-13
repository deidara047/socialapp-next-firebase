import { ReactElement, useEffect, useState } from "react";
import Post from "./Post";
import { Posts as PostsInterface } from "../../models/post.interface";
import LoadingSpinner from "../LoadingSpinner";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

export default function Posts({ isUrlMe, userIdFromUrl }: { isUrlMe?: boolean, userIdFromUrl?: string }) {
  const [allPosts, setAllPosts] = useState<PostsInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("createdAt", "desc")),
      (querySnapShot) => {
        setAllPosts([]);
        querySnapShot.forEach((doc) => {
          let newPost = { ...doc.data(), id: doc.id };
          if(userIdFromUrl) {
            if((doc.data().author.id === userIdFromUrl)) {
              setAllPosts((arrcont) => [...arrcont, newPost] as any);
            }
          } else {
            setAllPosts((arrcont) => [...arrcont, newPost] as any);
          };
        });
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, [userIdFromUrl]);

  return (
    <div>
      {isLoading ? (
        <div className="card">
          <div className="card-body d-flex justify-content-center">
            <LoadingSpinner></LoadingSpinner>
          </div>
        </div>
      ) : allPosts.length > 0 ? (
        <div>
          {allPosts.map((post, index) => (
            <Post userIdFromUrl={userIdFromUrl} key={index} post={post} isUrlMe={isUrlMe!} />
          ))}
        </div>
      ) : (
        <div>
          <h4>No posts yet. Maybe you will be the first!</h4>
        </div>
      )}
    </div>
  );
}

/* <div>
      {isLoading ? (
        <div className="card">
          <div className="card-body d-flex justify-content-center">
            <LoadingSpinner></LoadingSpinner>
          </div>
        </div>
      ) : allPosts.length > 0 ? (
        <div>{allPosts.map((post, index) => <Post key={index} post={post} isUrlMe={isUrlMe} />)}</div>
      ) : (
        <div>
          <h4>No posts yet. Maybe you will be the first!</h4>
        </div>
      )}
      
    </div> */
