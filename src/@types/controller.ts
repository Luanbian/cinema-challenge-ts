import { type HttpResponse } from './http'

export interface Controller<In> {
  handle: (data: In) => Promise<HttpResponse>
}
