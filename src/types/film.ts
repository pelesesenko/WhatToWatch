export default interface Film {
  id: number,
  name: string,
  posterImage: string,
  previewImage: string,
  backgroundImage: string,
  backgroundColor: string,
  videoLink: string,
  previewVideoLink: string,
  description: string,
  rating: number,
  scoresCount: number,
  director: string,
  starring: string[],
  runTime: number,
  genre: string,
  released: number,
  isFavorite: boolean
}

export interface FilmIdsByGenre {
  [key:string]: number[],
}