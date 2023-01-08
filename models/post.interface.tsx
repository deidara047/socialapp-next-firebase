import { Timestamp } from "firebase/firestore"

export interface Posts {
  author: string, // Implicity User.uid
  content: string,
  likes: number,
  comments: [{
    author: string, // Implicity User.uid
    content: string,
    likes: number,
    subcomments: [{
      author: string,
      content: string
    }]
  }],
  createdAt: Timestamp,
  updatedAt: Timestamp
}