import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    setTimeout(() => {
      this.track();
    }, 5000);

    // document.getElementById('snap').addEventListener('click', function () {
    //   context.drawImage(video, 0, 0, 640, 480);
    // });
  }


  /**
   * Interesting points:
   * - pixel manipulation
   *  - manipulate picture
   *  - animate pixels (with browser / timer)
   *  - items transform (like rotate / scale / translate)
   *   - save / restore
   *  - access pixels (make grayscale)
   *   - createImageData / getImageData
   *   - putImageData: put pixels back on canvas or other canvas
   * - drawing images (drawImage)
   * - take canvas and save it as image (toDataURL)
   * - video & canvas
   *  - video tag is needed
   *  - drawImage takes video tag and automatically takes screenshots!
   */

  /**
   * When playing with rotation / translation etc. use ctx.save() / restore()
   */
  get numSections() {
    return 4;
  }

  get bugsGame(): HTMLCanvasElement {
    return document.getElementById('bugsGame') as HTMLCanvasElement;
  }

  get ctx() {
    return this.bugsGame.getContext('2d');
  }

  get width() {
    return this.bugsGame.width;
  }

  get height() {
    return this.bugsGame.height;
  }

  get video() {
    return document.getElementById('video') as any
  }

  private wireUp() {
    // Grab elements, create settings, etc.
    const canvas = document.getElementById('canvas') as any;
    const context = canvas.getContext('2d');
    var mediaConfig = { video: true };

    // Put video listeners into place
    navigator.mediaDevices.getUserMedia(mediaConfig).then(stream => {
      this.video.src = window.URL.createObjectURL(stream);
      this.video.play();
    }, (e) => {
      console.log('An error has occurred!', e)
    });

    // Trigger photo take
    document.getElementById('snap').addEventListener('click', () => {
    });

    // /* Legacy code below! */
    // else if (navigator.getUserMedia) { // Standard
    //   navigator.getUserMedia(mediaConfig, function (stream) {
    //     video.src = stream;
    //     video.play();
    //   }, errBack);
    // } else if (navigator['webkitGetUserMedia']) { // WebKit-prefixed
    //   navigator['webkitGetUserMedia'](mediaConfig, function (stream) {
    //     video.src = window['webkitURL'].createObjectURL(stream);
    //     video.play();
    //   }, errBack);
    // } else if (navigator['mozGetUserMedia']) { // Mozilla-prefixed
    //   navigator['mozGetUserMedia'](mediaConfig, function (stream) {
    //     video.src = window.URL.createObjectURL(stream);
    //     video.play();
    //   }, errBack);
    // }
  }

  ionViewDidLoad() {
    this.wireUp();

  }

  saveCanvas() {
    const data = this.bugsGame.toDataURL();
    const image = document.getElementById('canvasImage') as HTMLImageElement;
    image.src = data;
  }



  track() {
    const tracking = window['tracking'];

    // d7c6c6
    tracking.ColorTracker.registerColor('mycolor', function (r, g, b) {
      if (r > 215 && g > 215 && b > 215) {
        return true;
      }
      return false;
    });

    var colors = new tracking.ColorTracker(['mycolor']);

    colors.on('track', (event) => {
      if (event.data.length === 0) {
        console.log('no colors');
        // No colors were detected in this frame.
      } else {
        event.data.forEach((rect) => {
          console.log(rect)
          this.ctx.save();
          this.ctx.strokeStyle = rect.color;
          this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
          this.ctx.font = '11px Helvetica';
          this.ctx.fillStyle = "#fff";
          this.ctx.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
          this.ctx.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
          this.ctx.restore();
        });
      }
    });

    tracking.track('#video', colors, { video: true });
  }



}
