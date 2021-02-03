import { Component, OnInit } from '@angular/core';
import { ButtonType } from './models/button-type.enum';
import { Joke } from './models/joke.model';

@Component({
  selector: 'app-chuck-jokes',
  templateUrl: './chuck-jokes.component.html',
  styleUrls: ['./chuck-jokes.component.scss'],
})
export class ChuckJokesComponent implements OnInit {
  public buttonType: typeof ButtonType = ButtonType;
  public selectedButtonType: ButtonType;
  public randomJoke: Joke;
  public searchedJokes: Joke[];

  ngOnInit(): void {
    this.selectedButtonType = ButtonType.random;
  }

  public onButtonSelected(buttonType: ButtonType): void {
    this.selectedButtonType = buttonType;
  }

  public getRandomJoke(joke: Joke): void {
    this.randomJoke = joke;
  }

  public getSearchedJokes(jokes: Joke[]): void {
    this.searchedJokes = jokes;
  }
}
