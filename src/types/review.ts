export interface ReviewGet {
  id: number,
  user: {
    id: number,
    name: string
  },
  rating: number,
  comment: string,
  date: string
}

export interface ReviewPost {
  rating: number,
  comment: string
}
