import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChuckJokesRoutingModule } from './chuck-jokes-routing.module';
import { SearchedJokesComponent } from './searched-jokes/searched-jokes.component';
import { ButtonsTypeComponent } from './buttons-type/buttons-type.component';
import { PageDetailsComponent } from './page-details/page-details.component';
import { SharedModule } from 'src/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/core/core.module';
import { ChuckJokesComponent } from './chuck-jokes/chuck-jokes.component';

@NgModule({
  declarations: [SearchedJokesComponent, ChuckJokesComponent, ButtonsTypeComponent, PageDetailsComponent],
  imports: [CommonModule, ChuckJokesRoutingModule, SharedModule, FormsModule, CoreModule],
})
export class ChuckJokesModule {}
