import { collection, addDoc, query, Timestamp, getDoc, doc, updateDoc, arrayUnion, where, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";
import { Posts } from "../models/post.interface";

export async function addPost(content: string, userUid: string, userEmail: string) {
  try {
    const dataToUpload: Posts = {
      author: {
        id: userUid,
        email: userEmail
      },
      content: content,
      likes: [],
      comments: [] as any,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date())
    }
    
    return await addDoc(collection(db, "posts"), dataToUpload);
    
  } catch (error) {
    return error;
  }
}

export async function doLike(id: string, userId: string) {
  const docRef = doc(db, "posts", id);
  const data = (await getDoc(docRef)).data();

  if(data) {
    if(data.likes.includes(userId)) {
      await updateDoc(docRef, { likes: arrayRemove(userId) })
    } else {
      await updateDoc(docRef, { likes: arrayUnion(userId) })
    }
  } else {
    throw new Error("This post does not exists")
  }
    // return await updateDoc(docRef, { likes: arrayUnion(userId) })

}