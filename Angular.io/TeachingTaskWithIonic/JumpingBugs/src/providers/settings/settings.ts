import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsProvider {

  private _tracker;

  private _trackColor: [number, number, number] = [253, 255, 253];

  constructor() {
  }

  gameLength = 16;

  gameSpeed = 500;

  initialize() {
    this._tracker = new window['tracking'].ColorTracker();
    this._tracker.minDimension = 3;
    this._tracker.minGroupSize = 11;
    this.updateColor();
    return this._tracker;
  }

  updateColor() {
    console.log('Setting color:', this.hexColor)

    const tracking = window['tracking'];

    var customColorR = this.trackColor[0];
    var customColorG = this.trackColor[1];
    var customColorB = this.trackColor[2];

    var colorTotal = customColorR + customColorG + customColorB;

    var rRatio = customColorR / colorTotal;
    var gRatio = customColorG / colorTotal;

    console.log('Registering ', this.trackColor);

    tracking.ColorTracker.registerColor('custom', function (r, g, b) {

      var colorTotal2 = r + g + b;

      if (colorTotal2 === 0) {
        if (colorTotal < 10) {
          return true;
        }
        return false;
      }

      var rRatio2 = r / colorTotal2,
        gRatio2 = g / colorTotal2,
        deltaColorTotal = colorTotal / colorTotal2,
        deltaR = rRatio / rRatio2,
        deltaG = gRatio / gRatio2;

      return deltaColorTotal > 0.9 && deltaColorTotal < 1.1 &&
        deltaR > 0.9 && deltaR < 1.1 &&
        deltaG > 0.9 && deltaG < 1.1;
    });

    this._tracker.setColors(['custom']);
  }

  get trackColor(): [number, number, number] {
    return this._trackColor;
  }

  set trackColor(rgb: [number, number, number]) {
    this._trackColor = rgb;
    this.updateColor();
  }

  get hexColor() {
    const r = Number(this._trackColor[0]).toString(16);
    const g = Number(this._trackColor[1]).toString(16);
    const b = Number(this._trackColor[2]).toString(16);
    return `#${r}${g}${b}`;
  }

}
