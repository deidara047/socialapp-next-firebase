import { collection, addDoc, query, Timestamp, getDoc, doc, updateDoc, arrayUnion, where, arrayRemove, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { Posts } from "../models/post.interface";
import { uuidv4 } from "@firebase/util";

export async function getOnSnapshotPosts() {

}

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
    
    if(userUid) {
      return await addDoc(collection(db, "posts"), dataToUpload);
    } else {
      throw new Error("401: You are not logged");
    }
    
  } catch (error) {
    return error;
  }
}

export async function doLike(id: string, userId: string) {
  const docRef = doc(db, "posts", id);
  const data = (await getDoc(docRef)).data();

  if(data) {
    if(userId) {
      if(data.likes.includes(userId)) {
        await updateDoc(docRef, { likes: arrayRemove(userId) })
      } else {
        await updateDoc(docRef, { likes: arrayUnion(userId) })
      }
    } else {
      throw new Error("401: You are not logged");
    }
  } else {
    throw new Error("This post does not exists")
  }
}

export async function addComment(comment: string, postId: string, userId: string, userEmail: string) {
  const docRef = doc(db, "posts", postId);
  const data = (await getDoc(docRef)).data();

  if(data) {
    if(userId) {
      await updateDoc(docRef, { comments: arrayUnion({id: uuidv4(), author: {id: userId, email: userEmail}, content: comment, likes: []}) })
    } else {
      throw new Error("401: You are not logged");
    }
  } else {
    throw new Error("This post does not exists")
  }
}

export async function doLikeComment(postId: string, commentId: string, userId: string) {
  const docRef = doc(db, "posts", postId);
  const data = (await getDoc(docRef)).data();

  /*
    This is kind of a workaround since Firebase does not have a complex
    update system
  */
  if(data) {
    const comment = data.comments.find((elem: any) => elem.id === commentId);
    const commentIndex = data.comments.findIndex((elem: any) => elem.id === commentId);
    
    if(comment) {
      if(userId) {
        if(!comment.likes.includes(userId)) {
          data.comments[commentIndex].likes.push(userId); // Creates a mutable (I know) object and saves it in the same "block"
        } else {
          const newLikesArr = data.comments[commentIndex].likes.filter((elem: any) => elem !== userId);
          data.comments[commentIndex].likes = [...newLikesArr]; // Assigns mutablely (I know) a new array with filtered uids and saves it in the same "block"
        }
        await updateDoc(docRef, {...data, updatedAt: serverTimestamp()});
      } else {
        throw new Error("401: You are not logged")
      }
    }
  }
}