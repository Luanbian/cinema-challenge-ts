export interface IPasswordToken {
  perform: (email: string) => Promise<{ token: string, expiresAt: Date }>
}
