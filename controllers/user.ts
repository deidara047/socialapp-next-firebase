import { deleteUser } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { rdxSignOut } from "../redux/reducers/usersSlice";

// :(
export async function getAllUsersExceptMe(userId: string) {
  const q = query(collection(db, "users"), where("uid", "!=", userId));
  const querySnapshot = await getDocs(q);
  let results: any[] = [];

  querySnapshot.forEach((doc) => {
    results.push(doc.data());
  });

  console.log(results);
}

export async function getUser(userUid: string) {
  const docRef = doc(db, "users", userUid);
  const docSnap = await getDoc(docRef);
  const results = docSnap.data();

  if (docSnap.exists()) {
    return results;
  } else {
    throw new Error("400: User not found");
  }
}

export async function editUser( description: string ): Promise<void> {
  if(!auth.currentUser) throw new Error("Error: User is not logged");
  if(description.length > 60) throw new Error("Error: Description is too long")

  const userRef = doc(db, "users", auth.currentUser.uid);
  const user = getDoc(userRef);

  if(!user) throw new Error("500: Contact the developer");

  return await updateDoc(userRef, {description});
}

export async function deleteMyUser(): Promise<void> {
  if(!auth.currentUser) throw new Error("User is not logged");
  const postsRef = collection(db, "posts");
  const userRef = doc(db, "users", auth.currentUser.uid);
  const userGet = await getDoc(userRef);
  const postsGet = await getDocs(postsRef);

  if(!userGet.exists) throw new Error("500: Contact the developer");

  postsGet.forEach(async (post) => {
    const postData = post.data();

    if(postData.author.id === auth.currentUser!.uid) {
      await deleteDoc(doc(db, "posts", post.id))
    }
  });

  await deleteDoc(doc(db, "users", userGet.id))

  return await deleteUser(auth.currentUser);
}