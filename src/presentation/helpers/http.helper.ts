import { type HttpResponse } from '../../@types/http'

function httpRes<T> (statusCode: number, body: T): HttpResponse {
  return {
    statusCode,
    body
  }
}

export const created = <T>(data: T): HttpResponse => httpRes(201, data)
export const serverError = <T>(data: T): HttpResponse => httpRes(500, data)
export const noContent = (): HttpResponse => httpRes(204, null)
export const notFound = <T>(data: T): HttpResponse => httpRes(404, data)
export const ok = <T>(data: T): HttpResponse => httpRes(200, data)
