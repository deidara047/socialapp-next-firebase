import { ReactElement, useEffect, useState } from "react";
import Post from "./Post";
import { Posts as PostsInterface } from "../../models/post.interface";
import LoadingSpinner from "../LoadingSpinner";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUserData } from "../../redux/reducers/usersSlice";

export default function Posts() {
  const [allPosts, setAllPosts] = useState<PostsInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isUrlMe = false;

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "posts"), orderBy("createdAt", "desc")), (querySnapShot) => {
      setAllPosts([]);
      querySnapShot.forEach((doc) => {
        let newPost = {...doc.data(), id: doc.id}
        setAllPosts((arrcont) => [...arrcont, newPost] as any)
      });
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
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