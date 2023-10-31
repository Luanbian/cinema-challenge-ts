export interface MovieProps {
  id: string
  name: string
  synopsis: string
  releaseDate: Date
  inTheaters: boolean
}

export class Movie {
  private readonly id: string
  private readonly name: string
  private readonly synopsis: string
  private readonly releaseDate: Date
  private readonly inTheaters: boolean

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
