export interface UserGet{
  id: number,
  email: string,
  name: string,
  avatarUrl: string
}

export interface UserPost{
  email: string,
  password: string
}
