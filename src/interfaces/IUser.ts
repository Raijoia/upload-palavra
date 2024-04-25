export interface IUser {
  id: string
  email: string
  name: string
  password: string
}

export interface DtoUser {
  email: string
  name: string
  password: string
}

export interface AuthUser {
  email: string
  password: string
}
