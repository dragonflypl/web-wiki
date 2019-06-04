export class BugSectionInfo {

  sectionX: number;
  sectionY: number;
  killed: boolean;

  constructor(sectionX, sectionY) {
    this.sectionX = sectionX;
    this.sectionY = sectionY;
    this.killed = false;
  }

  static NULL = new BugSectionInfo(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
}

export interface Match {
  x: number,
  y: number,
  width: number,
  height: number,
  color: string
}

export class GameUI {

  constructor() {
  }

  public calibration = 0;

  private bugImage: HTMLImageElement;

  private get video() {
    return document.getElementById('video') as HTMLVideoElement;
  }

  private get videoCanvas() {
    return document.getElementById('videoCanvas') as HTMLCanvasElement
  }

  private get videoContext() {
    return this.videoCanvas.getContext('2d');
  }

  get calibrationRange() {
    return Math.floor(this.width / 4);
  }

  get width() {
    const style = window.getComputedStyle(this.video);
    return style && parseFloat(style.width.replace('px', ''));
  }

  private get height() {
    const style = window.getComputedStyle(this.video);
    return style && parseFloat(style.height.replace('px', ''));
  }

  get numSections() {
    return 3;
  }

  toSection(match: Match): BugSectionInfo {

    const matchRectangle = {
      x1: match.x,
      y1: match.y,
      x2: match.x + match.width,
      y2: match.y + match.height
    }

    for (let sectionX = 0; sectionX < this.numSections; sectionX++) {
      for (let sectionY = 0; sectionY < this.numSections; sectionY++) {
        const sectionRectangle = {
          x1: this.sectionSize * sectionX + this.widthOffset,
          y1: this.sectionSize * sectionY + this.heightOffset,
          x2: this.sectionSize * (sectionX + 1) + this.widthOffset,
          y2: this.sectionSize * (sectionY + 1) + this.heightOffset
        }

        if (matchRectangle.x1 >= sectionRectangle.x1 &&
          matchRectangle.y1 >= sectionRectangle.y1 &&
          matchRectangle.x2 <= sectionRectangle.x2 &&
          matchRectangle.y2 <= sectionRectangle.y2
        ) {
          return new BugSectionInfo(sectionX, sectionY);
        }
      }
    }
    return BugSectionInfo.NULL;
  }

  get gameSize() {
    return this.height - this.calibration;
  }

  get sectionSize() {
    return this.gameSize / this.numSections;
  }

  private get widthOffset() {
    return (this.width - (this.sectionSize * this.numSections)) / 2;
  }

  private get heightOffset() {
    return this.calibration / 2
  }

  clear() {
    this.videoContext.clearRect(0, 0, this.width, this.height);
  }

  init() {
    if (this.bugImage) {
      return Promise.resolve({});
    }

    return new Promise(resolve => {
      this.bugImage = new Image();
      this.bugImage.src = 'assets/imgs/bug.jpg';
      this.bugImage.onload = () => {
        resolve({});
      };
    });
  }

  buildSections() {

    this.videoContext.save();
    this.videoContext.translate(this.widthOffset, this.heightOffset);
    this.videoContext.globalAlpha = 0.4;
    // might be needed if canvas is over the video
    //this.ctx.clearRect(0, 0, this.width, this.height);
    this.videoContext.strokeStyle = 'white';
    this.videoContext.lineWidth = 2;
    this.videoContext.strokeRect(
      1, 1,
      this.sectionSize * this.numSections - 2,
      this.sectionSize * this.numSections - 2);

    for (let section = 1; section <= this.numSections; section++) {
      this.videoContext.beginPath();
      this.videoContext.moveTo(this.sectionSize * section, 0);
      this.videoContext.lineTo(this.sectionSize * section, this.gameSize);
      this.videoContext.closePath();
      this.videoContext.stroke();

      this.videoContext.beginPath();
      this.videoContext.moveTo(0, this.sectionSize * section);
      this.videoContext.lineTo(this.gameSize, this.sectionSize * section);
      this.videoContext.closePath();
      this.videoContext.stroke();
    }

    const padding = 5;
    this.videoContext.globalAlpha = 1;
    for (let ySection = 1; ySection <= this.numSections; ySection++) {
      for (let xSection = 1; xSection <= this.numSections; xSection++) {
        const yCharName = String.fromCharCode(64 + ySection);
        this.videoContext.fillText(
          `${yCharName}${xSection}`,
          this.sectionSize * (xSection - 1) + padding,
          this.sectionSize * ySection - padding);
      }
    }

    this.videoContext.restore();
  }

  drawMatch(match: Match) {

    const matchSection = this.toSection(match);

    this.videoContext.strokeStyle = match.color;
    this.videoContext.strokeRect(match.x, match.y, match.width, match.height);
    if (matchSection.sectionX >= 0 && matchSection.sectionY >= 0) {
      this.videoContext.font = '11px Helvetica';
      this.videoContext.fillStyle = "#fff";
      this.videoContext.fillText('x: ' + match.x + 'px ' + matchSection.sectionX, match.x + match.width + 5, match.y + 11);
      this.videoContext.fillText('y: ' + match.y + 'px ' + matchSection.sectionY, match.x + match.width + 5, match.y + 22);
    }
  }

  drawBug(bugSectionInfo: BugSectionInfo) {

    if (!bugSectionInfo) return;

    const bugPosition = {
      x1: this.sectionSize * bugSectionInfo.sectionX,
      y1: this.sectionSize * bugSectionInfo.sectionY,
      x2: this.sectionSize * (bugSectionInfo.sectionX + 1),
      y2: this.sectionSize * (bugSectionInfo.sectionY + 1),
    }

    this.videoContext.save();
    this.videoContext.translate(this.widthOffset, this.heightOffset);
    this.videoContext.globalAlpha = 0.4;

    this.videoContext.drawImage(
      this.bugImage,
      0, 0, this.bugImage.width, this.bugImage.height,
      bugPosition.x1, bugPosition.y1,
      bugPosition.x2 - bugPosition.x1,
      bugPosition.y2 - bugPosition.y1);

    if (bugSectionInfo.killed) {
      this.videoContext.globalAlpha = 1;
      this.videoContext.strokeStyle = 'red';
      this.videoContext.beginPath();
      this.videoContext.moveTo(bugPosition.x1, bugPosition.y1);
      this.videoContext.lineTo(bugPosition.x2, bugPosition.y2);
      this.videoContext.stroke();
      this.videoContext.beginPath();
      this.videoContext.moveTo(bugPosition.x2, bugPosition.y1);
      this.videoContext.lineTo(bugPosition.x1, bugPosition.y2);
      this.videoContext.stroke();
    }
    this.videoContext.restore();
    // this code draws video on canvas, use it later
    // this.ctx.save();
    //
    // this.ctx.drawImage(this.video, 0, 0, 600, 600);
    // this.ctx.restore();
  }
}
