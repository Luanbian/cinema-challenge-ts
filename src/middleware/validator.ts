import { type Request, type Response, type NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

const validateMovieInput = [
  body('name').isString(),
  body('synopsis').isString(),
  body('releaseDate').isString(),
  body('inTheaters').isBoolean()
]

export { validateMovieInput }

export function handleMovieValidation (req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    next()
  } else {
    res.status(400).json({ errors: errors.array() })
  }
}
