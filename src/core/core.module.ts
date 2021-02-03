import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, environment.production ? [] : AkitaNgDevtools.forRoot()],
  providers: [],
})
export class CoreModule {}
