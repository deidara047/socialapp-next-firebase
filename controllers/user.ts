import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export async function getAllUsersExceptMe(userId: string) {
  const q = query(collection(db, "users"), where("uid", "!=", userId))
  const querySnapshot = await getDocs(q);
  let results: any[] = [];

  querySnapshot.forEach((doc) => {
    results.push(doc.data())
  });

  console.log(results)
}