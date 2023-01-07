interface User {
  uid: string,
  email: string,
  description: string
}

interface Posts {
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
  }]
}

interface Following {
  follower: string, // Implicity User.uid
  isFollowing: string // Implicity User.uid
}