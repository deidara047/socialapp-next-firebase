import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

// :(
export async function getAllUsersExceptMe(userId: string) {
  const q = query(collection(db, "users"), where("uid", "!=", userId))
  const querySnapshot = await getDocs(q);
  let results: any[] = [];

  querySnapshot.forEach((doc) => {
    results.push(doc.data())
  });

  console.log(results)
}

export async function getUser(userUid: string) {
  const docRef = doc(db, "users", userUid);
  const docSnap = await getDoc(docRef);
  const results = docSnap.data();

  if(docSnap.exists()) {
    return results;
  } else {
    throw new Error("400: User not found")
  }
}