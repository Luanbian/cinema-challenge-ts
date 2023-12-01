export interface Encrypter {
  encrypt: (value: string) => Promise<string>
  matchPassword: (value: string, passHashed: string) => Promise<boolean>
}
