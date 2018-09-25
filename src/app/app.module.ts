import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SPLinksService } from './services/SP.Links';
import { HomeLinks } from './homeLinks/home.links';
import { PortalLinkModel } from './models/portalLink';
import { SPHomeService } from './services/SP.Home';


@NgModule({
  declarations: [
    AppComponent,
    HomeLinks
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [SPLinksService, SPHomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
