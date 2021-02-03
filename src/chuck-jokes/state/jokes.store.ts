import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Joke } from '../chuck-jokes/models/joke.model';

export interface JokeState {
  categories: string[];
  randomJoke: Joke;
  searchedJokes: Joke[];
  loading: boolean;
}

export function createInitialState(): JokeState {
  return {
    categories: [],
    randomJoke: undefined,
    searchedJokes: undefined,
    loading: false,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'jokes' })
export class JokeStore extends Store<JokeState> {
  constructor() {
    super(createInitialState());
  }
}
