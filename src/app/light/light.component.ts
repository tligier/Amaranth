import { Component, OnInit } from '@angular/core';
import { LightService } from '../light.service';
import { Light } from '../light';

@Component({
  selector: 'app-light',
  template: `
    <ul>
      <li *ngFor="let light of lights">
        {{light.label}}
      </li>
    </ul>
  `,
  styles: []
})
export class LightComponent implements OnInit {
  lights: Light[];
  constructor(private lightService:LightService) { }

  ngOnInit() {
    this.lightService.getLights().subscribe(l => {this.lights = l; console.log(l)});
  }

}
