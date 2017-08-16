import { Component, OnInit } from '@angular/core';
import { RgbColor } from '../rgb-color';

@Component({
  selector: 'app-color1d',
  templateUrl: './color1d.component.html',
  styleUrls: ['./color1d.component.css']
})
export class Color1dComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementsByClassName('oned')[0].addEventListener('click', function (e) {
      console.log(GetColorFrom1DPicker(((e as MouseEvent).clientY - this.getBoundingClientRect().top) / 4));
    });
  }

}

function GetColorFrom1DPicker(x): RgbColor {
  var sixth = 100 / 6;
  switch (Math.floor(x / sixth)) {
    case 0:
      return {red:255, green:Math.round(x * 255 / sixth), blue:0};
    case 1:
      return {red:Math.round((2 * sixth - x) * 255 / sixth), green:255, blue:0};
    case 2:
      return {red:0, green:255, blue:Math.round((x - 2 * sixth) * 255 / sixth)};
    case 3:
      return {red:0, green:Math.round((4 * sixth - x) * 255 / sixth), blue:255};
    case 4:
      return {red:Math.round((x - 4 * sixth) * 255 / sixth), green:0, blue:255};
    case 5:
      return {red:255, green:0, blue:Math.round((6 * sixth - x) * 255 / sixth)};
    default:
      return {red:255, green:0, blue:0};
  }
}
