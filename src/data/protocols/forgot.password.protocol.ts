export interface IForgotPassword {
  perform: (email: string) => Promise<{ token: string, expiresAt: Date }>
}
