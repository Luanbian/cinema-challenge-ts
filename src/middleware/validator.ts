import { type Request, type Response, type NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

const roles = ['admin', 'cadastrer', 'manager', 'consulter', 'trainee']
const validateEmployerInput = [
  body('name').isString(),
  body('email').isEmail(),
  body('password').isString(),
  body('role').isIn(roles).withMessage('Invalid role')
]

const validateMovieInput = [
  body('name').isString(),
  body('synopsis').isString(),
  body('releaseDate').isString(),
  body('inTheaters').isBoolean()
]

const validateLoginInput = [
  body('email').isEmail(),
  body('password').isString()
]

export { validateMovieInput, validateEmployerInput, validateLoginInput }

export function handleValidation (req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    next()
  } else {
    res.status(400).json({ errors: errors.array() })
  }
}
