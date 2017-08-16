import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Light } from './light';
import { Color } from './color';

@Injectable()
export class LightService {

  constructor(private http : Http) {}

  getLights(): Observable<Light[]> {
    return this.http.get('http://localhost:3000/GetLifxLights', {headers: this.getHeaders()}).map(mapLights);
  }

  private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

}

function mapLights(response:Response): Light[] {
  console.log(response.json());
  return response.json().  map(toLight);
}

function toLight(r:any): Light {
  let light = <Light>({
    type: r.type,
    power: r.power,
    label: r.label,
    color: <Color>({
      hue: r.color.hue,
      saturation: r.color.saturation,
      brightness: r.color.brightness,
      kelvin: r.color.kelvin,
    })
  });
  return light;
}
