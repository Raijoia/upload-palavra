export interface IUser {
  _id: string | null
  email: string | null
  name: string | null
  password: string | null
}

export interface DtoUser {
  email: string | null
  name: string | null
  password: string | null
}
