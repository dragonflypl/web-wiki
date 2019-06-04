import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings';

declare var p5;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, private settings: SettingsProvider) {

  }

  ionViewDidLoad() {

    const settings = this.settings;

    function doSetup(p) {

      let x = 100;
      let y = 100;

      let video;

      p.setup = function () {
        p.createCanvas(320, 240);
        p.pixelDensity(1);
        video = p.createCapture(p.VIDEO);
        video.size(p.width, p.height);
        // The above function actually makes a separate video
        // element on the page.  The line below hides it since we are
        // drawing the video to the canvas
        video.hide();

        // Start off tracking for red
        settings.trackColor = [255, 0, 0];
      }

      p.mousePressed = function (e) {
        if (e.target === p.canvas) {
          console.log(settings.trackColor)
          settings.trackColor = video.get(p.mouseX, p.mouseY);
        }
      }

      const colorThreshold = 10;

      p.draw = function () {

        const blobs: Blob[] = [];
        // Draw the video
        p.image(video, 0, 0);

        // We are going to look at the video's pixels
        video.loadPixels();

        // XY coordinate of closest color
        let avgX = 0;
        let avgY = 0;
        let count = 0;

        const trackColor = settings.trackColor;
        for (let y = 0; y < video.height; y++) {
          for (let x = 0; x < video.width; x++) {
            const loc = (x + y * video.width) * 4;
            // The functions red(), green(), and blue() pull out the three color components from a pixel.
            const r1 = video.pixels[loc];
            const g1 = video.pixels[loc + 1];
            const b1 = video.pixels[loc + 2];

            const r2 = trackColor[0];
            const g2 = trackColor[1];
            const b2 = trackColor[2];

            // Using euclidean distance to compare colors
            const d = p.dist(r1, g1, b1, r2, g2, b2); // We are using the dist( ) function to compare the current color with the color we are tracking.

            // If current color is more similar to tracked color than
            // closest color, save current location and current difference
            if (d < colorThreshold) {
              const blob = blobs.find(blob => blob.isNear(x, y));
              if (blob) {
                blob.add(x, y);
              } else {
                blobs.push(new Blob(x, y, p));
              }
            }
          }
        }

        for (const blob of blobs) {
          blob.show();
        }
        // We only consider the color found if its color distance is less than 10.
        // This threshold of 10 is arbitrary and you can adjust this number depending on how accurate you require the tracking to be.
        p.fill(settings.trackColor);
        p.strokeWeight(4.0);
        p.stroke(0);
        p.ellipse(avgX / count, avgY / count, 16, 16);
      }
    };

    const p = new p5(doSetup, "video-container");
  }



}

interface Point {
  x: number,
  y: number;
}

class Blob {

  points: Point[] = [];

  p;
  x1: number;
  x2: number;
  y1: number;
  y2: number;

  maxDistance = 20;

  constructor(x, y, p) {
    this.p = p;
    this.x1 = this.x2 = x;
    this.y1 = this.y2 = y;
    this.points.push({ x, y });
  }

  show() {
    this.p.stroke(0);
    this.p.fill(255);
    this.p.rectMode(this.p.CORNERS);
    this.p.rect(this.x1, this.y1, this.x2, this.y2);
    this.p.stroke(0, 0, 255);
    for (let point of this.points) {
      this.p.point(point.x, point.y);
    }
  }

  isNear(x, y) {
    return !!this.points.find(point => this.p.dist(x, y, point.x, point.y) < this.maxDistance);
  }

  add(x, y) {
    this.x1 = Math.min(this.x1, x);
    this.y1 = Math.min(this.y1, y);
    this.x2 = Math.max(this.x2, x);
    this.y2 = Math.max(this.y2, y);
    this.points.push({ x, y })
  }
}
