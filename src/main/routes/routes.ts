import { type Router } from 'express'

export default (router: Router): void => {
  router.get('/api/home', (req, res) => {
    res.send('oi')
  })
}
