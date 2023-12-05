export interface IredefinePassword {
  perform: (paramns: IredefinePasswordProps) => Promise<string>
}

export interface IredefinePasswordProps {
  email: string
  token: string
  newPassword: string
}
