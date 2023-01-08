import { collection, addDoc, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Posts } from "../models/post.interface";

export async function getAllPosts() {
  try {
    return await query(collection(db, "posts"), orderBy("date"))
  } catch (error) {
    return error;
  }
}

export async function addPost(content: string, userUid: string) {
  try {
    const dataToUpload: Posts = {
      author: userUid,
      content: content,
      likes: 0,
      comments: [] as any,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date())
    }
    
    return await addDoc(collection(db, "posts"), dataToUpload);
    
  } catch (error) {
    return error;
  }
}