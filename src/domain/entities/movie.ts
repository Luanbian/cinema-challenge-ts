export interface MovieProps {
  id: string
  name: string
  synopsis: string
  releaseDate: Date
  inTheaters: boolean
}

export class Movie {
  readonly id: string
  readonly name: string
  readonly synopsis: string
  readonly releaseDate: Date
  readonly inTheaters: boolean

  private constructor (props: MovieProps) {
    this.id = props.id
    this.name = props.name
    this.synopsis = props.synopsis
    this.releaseDate = props.releaseDate
    this.inTheaters = props.inTheaters
  }

  public static create (input: MovieProps): Movie {
    return new Movie(input)
  }
}
