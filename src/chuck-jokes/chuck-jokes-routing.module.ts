import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChuckJokesComponent } from './chuck-jokes/chuck-jokes.component';

const routes: Routes = [{ path: '', component: ChuckJokesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChuckJokesRoutingModule {}
