import { Timestamp } from "firebase/firestore"

export interface Posts {
  author: {
    id: string,
    email: string
  }
  content: string,
  likes: string[],
  comments: [{
    author: string, // Implicity User.uid
    content: string,
    likes: string[]
  }],
  createdAt: Timestamp,
  updatedAt: Timestamp
}