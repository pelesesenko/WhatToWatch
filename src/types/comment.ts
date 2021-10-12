export interface CommentGet {
  id: number,
  user: {
    id: number,
    name: string
  },
  rating: number,
  comment: string,
  date: string
}

export interface CommentPost {
  rating: number,
  comment: string
}
