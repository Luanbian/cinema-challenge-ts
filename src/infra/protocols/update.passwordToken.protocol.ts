export interface IupdatePasswordTokenProps {
  id: string
  token: string
  expiresAt: Date
}

export interface IupdatePasswordToken {
  alterPassToken: (paramns: IupdatePasswordTokenProps) => Promise<string>
}
