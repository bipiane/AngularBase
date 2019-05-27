import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';


// Angular
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http/';
import {HttpClientModule} from '@angular/common/http';

// Sweet Alert2
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';

// CNRT modules
import {UtilModule} from './util';

// Servicios
import {
  PaisService,
} from './services';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    UtilModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [
    PaisService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
