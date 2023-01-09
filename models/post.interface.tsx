import { Timestamp } from "firebase/firestore"

export interface Posts {
  id?: string
  author: {
    id: string,
    email: string
  }
  content: string,
  likes: string[],
  comments: [{
    id: string,
    author: {
      id: string,
      email: string
    }, // Implicity User.uid
    content: string,
    likes: string[]
  }],
  createdAt: Timestamp,
  updatedAt: Timestamp
}