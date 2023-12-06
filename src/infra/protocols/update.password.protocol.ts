export interface IupdatePassword {
  alterPass: (id: string, newPass: string) => Promise<void>
}
