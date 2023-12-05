export interface IPasswordToken {
  perform: (email: string) => Promise<string>
}
