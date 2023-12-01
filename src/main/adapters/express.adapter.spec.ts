import { makeHttpMock } from '../../@types/mocks/http.mock'
import makeRoute from './express.adapter'

describe('Express Adapter', () => {
  test('should return 200 if success', async () => {
    const { req, res } = makeHttpMock()
    const route = makeRoute({ async handle () { return { statusCode: 200, body: 'sucesso' } } })
    await route(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith('sucesso')
  })
  test('should return 500 if throws an error', async () => {
    const { req, res } = makeHttpMock()
    const route = makeRoute({ async handle () { throw new Error() } })
    await route(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith('Internal server error')
  })
})
