import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'angular2-apollo';

import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import { DiscsPageComponent } from './discs-page/discs-page.component';

// Create the client as outlined above
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:8080/'
  }),
});

@NgModule({
  imports: [
    BrowserModule,
    ApolloModule.withClient(client)
  ],
  declarations: [ AppComponent, DiscsPageComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
