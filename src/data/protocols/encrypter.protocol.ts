export interface Encrypter {
  encrypt: (value: string) => Promise<string>
  compare: (value: string, passHashed: string) => Promise<boolean>
}
