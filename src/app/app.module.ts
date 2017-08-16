import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleService } from './people.service';
import { PersonDetailsComponent } from './person-details/person-details.component';

import { LightService } from './light.service';

import { AppRoutingModule } from "./app-routing.module";
import { LightComponent } from './light/light.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { Color1dComponent } from './color1d/color1d.component';

@NgModule({
  declarations: [
    AppComponent,
    PeopleListComponent,
    PersonDetailsComponent,
    LightComponent,
    ColorPickerComponent,
    Color1dComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    PeopleService,
    LightService,
    {provide: APP_BASE_HREF, useValue: "/"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
