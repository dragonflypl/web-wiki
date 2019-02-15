import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Game } from '../game';
import { GameUI, Match } from '../game-ui';
import { SettingsProvider } from '../../providers/settings/settings';

@Component({
  selector: 'page-about',
  templateUrl: 'game.html'
})
export class GamePage {

  game: Game = null;

  gameUI = new GameUI();

  private get tracking() {
    return window['tracking'];
  }

  constructor(public navCtrl: NavController, private settings: SettingsProvider) {
  }

  private updateVideoCanvas() {
    this.gameUI.clear();
    // not needed if canvas is over video
    // this.videoContext.drawImage(
    //   this.video,
    //   0, 0, this.width, this.height);
  }

  private drawMatches(tracker, matches: Match[]) {
    matches.forEach((match) => {
      if (match.color === 'custom') {
        match.color = tracker.customColor;
      }
      this.gameUI.drawMatch(match);
    });
  }

  stop() {
    this.trackerTask.stop();
    this.game.stop();
    alert(`Game finished, your score ${this.game.score}`);
  }

  start() {
    this.game = new Game(this.gameUI, this.settings.gameLength, this.settings.gameSpeed);
    this.game.start().then(() => this.trackerTask.run());
  }

  trackerTask = null;

  ionViewDidLoad() {
    /**
     * Manual camera to video
     */
    // var video = document.getElementById('video') as HTMLVideoElement;
    // var mediaConfig = { video: true };
    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //   navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
    //     video.src = window.URL.createObjectURL(stream);
    //     video.play();
    //   });
    // }

    setTimeout(() => {

      const tracker = this.settings.initialize();
      this.trackerTask = this.tracking.track('#video', tracker, { camera: true });
      this.trackerTask.stop();

      tracker.on('track', (event) => {

        const matches = event.data as Match[];

        if (!this.trackerTask.inRunning() || !this.game) {
          this.updateVideoCanvas();
          this.game.draw();
          this.drawMatches(tracker, matches);
          return;
        }

        if (this.game.gameFinished) {
          this.updateVideoCanvas();
          this.game.draw();
          this.stop();
          return;
        }

        this.updateVideoCanvas();
        this.drawMatches(tracker, matches);
        this.game.draw();
        if (matches.find(match => this.game.wasHit(match))) {
          this.game.killBug();
        }
      })

    }, 1000)
  }
}
