import { BaseRepository } from './base.repository';

export interface Annotation {
  id: string,
  bookId: string,
  title: string,
  content: string,
  createdAt: Date,
  updatedAt: Date
}

const BASE_URL = 'http://localhost:9000/annotations';

export class AnnotationsRepository extends BaseRepository {
  super() {
  }

  async getFromApi(): Promise<Annotation[]> {
    const resp = await fetch(BASE_URL);
    const items = await resp.json() as Annotation[];
    return items;
  }

  async storeToApi(annotation: Annotation): Promise<boolean> {

    const response = await window.fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(annotation),
    })

    const { data, errors } = await response.json()
    if (response.ok) {
      return true;
    } else {
      // handle the graphql errors
      const error = new Error(errors?.map((e: Error) => e.message).join('\n') ?? 'unknown')
      return Promise.reject(error)
    }
  }

};