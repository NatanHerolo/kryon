import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Joke } from '../chuck-jokes/models/joke.model';
import { JokeState, JokeStore } from './jokes.store';

@Injectable({ providedIn: 'root' })
export class JokesQuery extends Query<JokeState> {
  constructor(protected store: JokeStore) {
    super(store);
  }

  public getLoadingState(): Observable<boolean> {
    return this.select('loading');
  }

  public getCategories(): Observable<string[]> {
    return this.select('categories');
  }

  public getRandomJoke(): Observable<Joke> {
    return this.select('randomJoke');
  }

  public getSearchedJokes(): Observable<Joke[]> {
    return this.select('searchedJokes');
  }
}
