import { Component, Input } from '@angular/core';
import { Joke } from 'src/chuck-jokes/chuck-jokes/models/joke.model';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss'],
})
export class JokeComponent {
  @Input() joke: Joke;
  @Input() quoteBackground: string = '#FFFFFF';
}
