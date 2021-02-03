import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { ButtonType } from '../chuck-jokes/models/button-type.enum';
import { ALL_CATEGORIES_KEY } from '../chuck-jokes/models/constants';
import { Joke } from '../chuck-jokes/models/joke.model';
import { JokesQuery } from '../state/jokes.query';
import { JokeService } from '../state/jokes.service';

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.scss'],
})
export class PageDetailsComponent implements OnInit, OnDestroy {
  @Input() selectedButtonType: ButtonType;
  @Output() randomJokeEvent: EventEmitter<Joke> = new EventEmitter();
  @Output() searchedJokesEvent: EventEmitter<Joke[]> = new EventEmitter();
  private selectedCategory: string[] = [];
  private destroy$ = new Subject();
  public buttonType: typeof ButtonType = ButtonType;
  public categoryOptions: string[] = [];
  public inputName: string;
  public searchKey: string;
  public allCategories: string = ALL_CATEGORIES_KEY;
  public loading$ = this.jokesQuery.getLoadingState();
  public categoriesObs$: Observable<string[]> = this.jokesQuery.getCategories().pipe(
    map((categories: string[]) => [ALL_CATEGORIES_KEY, ...categories]),
    tap((options: string[]) => {
      this.categoryOptions = options;
    })
  );

  constructor(private jokesService: JokeService, private jokesQuery: JokesQuery) {}

  ngOnInit(): void {
    this.initStoreEvents();
    this.jokesService.getCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private initStoreEvents(): void {
    this.jokesQuery
      .getSearchedJokes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((jokes: Joke[]) => {
        this.searchedJokesEvent.emit(jokes);
      });

    this.jokesQuery
      .getRandomJoke()
      .pipe(takeUntil(this.destroy$))
      .subscribe((joke: Joke) => {
        this.randomJokeEvent.emit(joke);
      });
  }

  public isGoButtonDisabled(): boolean {
    let isDisabled: boolean;

    if (this.selectedButtonType === ButtonType.random) {
      isDisabled = !this.inputName || this.selectedCategory.length === 0;
    } else {
      isDisabled = !this.searchKey || this.searchKey.length < 3;
    }

    return isDisabled;
  }

  public onCategoryChanged(selectedOptions: string[]): void {
    this.selectedCategory = selectedOptions;
  }

  public onGoClicked(): void {
    this.selectedButtonType === ButtonType.random ? this.getRandomJoke() : this.getAllJokes();
  }

  private getAllJokes(): void {
    const params = {
      query: this.searchKey,
    };

    this.jokesService.getAllJokes(params);
  }

  private getRandomJoke(): void {
    const categories: string[] = this.selectedCategory.includes(ALL_CATEGORIES_KEY) ? [] : this.selectedCategory;
    const params = {
      name: this.inputName,
    };

    if (categories.length) {
      params['category'] = categories.join(',');
    }

    this.jokesService.getRandomJoke(params);
  }
}
