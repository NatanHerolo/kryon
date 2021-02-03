import { HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { Joke } from '../chuck-jokes/models/joke.model';
import { JokesDataService } from './jokes-data.service';
import { JokeStore } from './jokes.store';

@Injectable({ providedIn: 'root' })
export class JokeService implements OnDestroy {
  destroy$ = new Subject();

  constructor(private jokesStore: JokeStore, private jokesDataService: JokesDataService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public getCategories(): void {
    this.jokesStore.setLoading(true);
    this.jokesDataService
      .getCategories()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.jokesStore.setLoading(false))
      )
      .subscribe((categories: string[]) => {
        this.jokesStore.update({
          categories,
        });
      });
  }

  public getRandomJoke(params): void {
    this.jokesStore.setLoading(true);
    this.jokesDataService
      .getRandomJoke(params)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.jokesStore.setLoading(false))
      )
      .subscribe((joke: Joke) => {
        this.jokesStore.update({
          randomJoke: joke,
        });
      });
  }

  public getAllJokes(params): void {
    this.jokesStore.setLoading(true);
    this.jokesDataService
      .getSearchedJokes(params)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.jokesStore.setLoading(false))
      )
      .subscribe((jokes: Joke[]) => {
        this.jokesStore.update({
          searchedJokes: jokes,
        });
      });
  }
}
