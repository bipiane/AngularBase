import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppAlertService, ApiService} from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AppAlertService,
    ApiService
  ]
})
export class UtilModule {
}
