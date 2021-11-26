export interface BookInterface {
  id: string,
  selfLink: string,
  title: string,
  subtitle: string,
  authors: [],
  publisher: string,
  publishedDate: string,
  description: string,
  thumbnail: string,
  link: string
}

export class Book implements BookInterface {
  constructor(
    public id: string,
    public selfLink: string,
    public title: string,
    public subtitle: string,
    public authors: [],
    public publisher: string,
    public publishedDate: string,
    public description: string,
    public thumbnail: string,
    public link: string
  ) {
  }
}