import { collection, addDoc, query, orderBy, Timestamp, getDocs, doc, DocumentData, onSnapshot } from "firebase/firestore";
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