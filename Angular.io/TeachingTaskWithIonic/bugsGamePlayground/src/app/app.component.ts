import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {

  constructor(private element: ElementRef) {

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
    this.element.nativeElement.click();
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

  ngAfterViewInit() {
    const bugsGame: HTMLCanvasElement =
      document.getElementById('playground') as HTMLCanvasElement;
    const ctx = bugsGame.getContext('2d');

    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.arc(0, 0, 100, 0, 2 * Math.PI, false);
    // After; arc; you; need; to; call; fill;
    ctx.fill();
    ctx.strokeRect(0, 0, bugsGame.width, bugsGame.height);
    ctx.strokeRect(1, 1, bugsGame.width - 2, bugsGame.height - 2);

    // building rounded corners with arcTo
    const radius = 50;
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.moveTo(radius, 0);
    ctx.arcTo(bugsGame.width, 0, bugsGame.width, radius, radius);
    ctx.arcTo(bugsGame.width, bugsGame.height, bugsGame.width - radius, bugsGame.height, radius);
    ctx.arcTo(0, bugsGame.height, 0, bugsGame.height - radius, radius);
    ctx.arcTo(0, 0, 100, 0, radius);
    const gradient = ctx.createRadialGradient(
      bugsGame.width, bugsGame.height, bugsGame.height / 2,
      bugsGame.width, bugsGame.height, 0);
    gradient.addColorStop(0, '#000');
    gradient.addColorStop(1, '#fff');
    ctx.fillStyle = gradient;
    ctx.stroke();
    ctx.fill();

    // end building rounded corners

    let currentX = 0;
    const scores = [100, 50, 70, 20];
    const width = bugsGame.width / scores.length;
    ctx.translate(bugsGame.height, bugsGame.width);
    ctx.rotate(Math.PI);
    scores.reverse().forEach(score => {
      ctx.fillStyle = 'black';
      ctx.fillRect(currentX, 0, width, score);
      // starts a path, prevenst from drawing lines between subsequent paintings
      ctx.beginPath();
      ctx.strokeStyle = 'red';
      ctx.arc(currentX + width / 2, score, 15, 0, 2 * Math.PI);
      ctx.stroke();
      currentX += width;
    });

    this.buildGame();
  }

  saveCanvas() {
    const data = this.bugsGame.toDataURL();
    const image = document.getElementById('canvasImage') as HTMLImageElement;
    image.src = data;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  buildGame() {
    this.loadImage();
  }

  loadImage() {
    const bugImage = new Image();
    bugImage.src = 'assets/bug.jpg';
    bugImage.onload = () => {
      setInterval(() => {
        this.buildSections();
        const sectionX = this.getRandomInt(0, this.numSections - 1);
        const sectionY = this.getRandomInt(0, this.numSections - 1);
        console.log(`Drawing bug in ${sectionX}/${sectionY}`);
        this.drawBug(bugImage, sectionX, sectionY);
      }, 1000);
    };
  }

  drawBug(image, x, y) {
    const sectionWidth = this.width / this.numSections;
    const sectionHeight = this.height / this.numSections;
    const padding = 10;
    this.ctx.drawImage(
      image,
      0, 0, image.width, image.height,
      (sectionWidth * x) + padding, (sectionHeight * y) + padding / 2,
      sectionWidth - 2 * padding, sectionHeight - 2 * padding);
  }

  buildSections() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(1, 1, this.bugsGame.width - 2, this.bugsGame.height - 2);
    const sectionWidth = this.width / this.numSections;
    const sectionHeight = this.height / this.numSections;
    for (let section = 1; section <= this.numSections; section++) {
      this.ctx.beginPath();
      this.ctx.moveTo(sectionWidth * section, 0);
      this.ctx.lineTo(sectionWidth * section, this.height);
      this.ctx.closePath();
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(0, sectionHeight * section);
      this.ctx.lineTo(this.width, sectionHeight * section);
      this.ctx.closePath();
      this.ctx.stroke();
    }

    const padding = 5;

    for (let ySection = 1; ySection <= this.numSections; ySection++) {
      for (let xSection = 1; xSection <= this.numSections; xSection++) {
        const yCharName = String.fromCharCode(64 + ySection);
        this.ctx.fillText(
          `${yCharName}${xSection}`,
          sectionWidth * (xSection - 1) + padding,
          sectionHeight * ySection - padding);
      }
    }
  }

}
