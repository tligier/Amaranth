import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeopleListComponent } from "./people-list/people-list.component";
import { PersonDetailsComponent } from "./person-details/person-details.component";
import { LightComponent } from './light/light.component';
import { Color1dComponent } from './color1d/color1d.component';

// Route config let's you map routes to components
const routes: Routes = [
  // map '/persons' to the people list component
  {
    path: 'persons',
    component: PeopleListComponent,
  },
  // map '/persons/:id' to person details component
  {
    path: 'persons/:id',
    component: PersonDetailsComponent
  },
  {
    path: 'lights',
    component: LightComponent
  },
  {
    path: '1d',
    component:  Color1dComponent
  },
  // map '/' to '/persons' as our default route
  {
    path: '',
    redirectTo: '/1d',
    pathMatch: 'full'
  },
];

// HERE: New module
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
