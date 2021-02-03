import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Joke } from '../chuck-jokes/models/joke.model';

const apiPath = 'https://api.chucknorris.io/jokes';

@Injectable({
  providedIn: 'root',
})
export class JokesDataService {
  constructor(private httpClient: HttpClient) {}

  private doGet(url: string, params?): Observable<any> {
    return this.httpClient.get(url, {
      params,
      headers: { accept: 'application/json' },
    });
  }

  public getCategories(): Observable<string[]> {
    const url = `${apiPath}/categories`;

    return this.doGet(url);
  }

  public getRandomJoke(params): Observable<Joke> {
    const url = `${apiPath}/random`;

    return this.doGet(url, params).pipe(map(obj => Joke.fromJSON(obj)));
  }

  public getSearchedJokes(params): Observable<Joke[]> {
    const url = `${apiPath}/search`;

    return this.doGet(url, params).pipe(map(obj => obj['result'].map(joke => Joke.fromJSON(joke))));
  }
}
