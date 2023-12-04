export interface Iauth {
  email: string
  password: string
}

export interface Ilogin {
  perform: (auth: Iauth) => Promise<string>
}
