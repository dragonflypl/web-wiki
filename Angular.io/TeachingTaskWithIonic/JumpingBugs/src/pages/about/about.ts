import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { initGUIControllers } from '../gui-controller';
import { Game } from '../game';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private score = 0;
  private readonly width = 600;
  private readonly height = 450;

  private tracker: any;

  private get tracking() {
    return window['tracking'];
  }

  constructor(public navCtrl: NavController) {
  }

  private get videoCanvas() {
    return document.getElementById('videoCanvas') as HTMLCanvasElement
  }

  private get videoContext() {
    return this.videoCanvas.getContext('2d');
  }

  private get video() {
    return document.getElementById('video') as HTMLVideoElement;
  }

  private updateVideoCanvas() {
    this.videoContext.clearRect(0, 0, this.videoCanvas.width, this.videoCanvas.height);
    this.videoContext.drawImage(this.video, 0, 0, this.width, this.height);
  }

  private drawMatches(matches) {
    matches.forEach((match) => {
      if (match.color === 'custom') {
        match.color = this.tracker.customColor;
      }
      this.videoContext.strokeStyle = match.color;
      this.videoContext.strokeRect(match.x, match.y, match.width, match.height);
      this.videoContext.font = '11px Helvetica';
      this.videoContext.fillStyle = "#fff";
      this.videoContext.fillText('x: ' + match.x + 'px', match.x + match.width + 5, match.y + 11);
      this.videoContext.fillText('y: ' + match.y + 'px', match.x + match.width + 5, match.y + 22);
    });
  }


  ionViewDidLoad() {
    setTimeout(() => {

      const game = new Game(this.videoCanvas);
      game.start().then(() => {
        this.tracker = new this.tracking.ColorTracker();
        initGUIControllers(this.tracker);
        this.tracking.track('#video', this.tracker, { camera: true });
        this.tracker.on('track', (event) => {
          const matches = event.data;
          this.updateVideoCanvas();
          this.drawMatches(matches);
          game.draw();
          if (matches.find(match => game.wasHit(match))) {
            game.killBug();
            this.score += 1;
            console.log('Was hit')
          }
        });
      });
    }, 1000)
  }
}
