export interface IlistEmployer {
  perform: () => Promise<{
    result: Employer[]
    length: number
    hasMore: boolean
  }>
}
