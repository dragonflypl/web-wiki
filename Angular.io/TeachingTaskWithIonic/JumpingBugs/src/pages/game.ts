import { GameUI, BugSectionInfo, Match } from "./game-ui";

export class Game {

  constructor(private gameUI: GameUI, private gameLength: number, private gameSpeed: number) { }

  private bugSectionInfo: BugSectionInfo = BugSectionInfo.NULL;

  private intervalId;

  shufflesLeft: number = this.gameLength;

  score = 0;

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  start() {
    return new Promise<void>(resolve => {
      this.gameUI.init().then(() => {
        this.shufflesLeft = this.gameLength;
        this.shuffleBug();
        resolve();
      })
    })
  }

  get gameFinished() {
    return this.intervalId === null;
  }

  private shuffleBug() {
    let previousSectionX = null;
    let previousSectionY = null;
    this.intervalId = setInterval(() => {
      let sectionX;
      let sectionY;
      do {
        sectionX = this.getRandomInt(0, this.gameUI.numSections - 1);
        sectionY = this.getRandomInt(0, this.gameUI.numSections - 1);
      }
      while (previousSectionX === sectionX && previousSectionY === sectionY);

      previousSectionX = sectionX;
      previousSectionY = sectionY;

      this.bugSectionInfo = new BugSectionInfo(sectionX, sectionY);

      this.shufflesLeft -= 1;
      if (this.shufflesLeft === 0) {
        this.stop();
      }
    }, this.gameSpeed);
  }

  draw() {
    this.gameUI.buildSections();
    if (!this.gameFinished) {
      this.gameUI.drawBug(this.bugSectionInfo)
    }
  }

  killBug() {
    this.bugSectionInfo.killed = true;
    this.score += 1;
  }

  wasHit(match: Match) {
    if (this.bugSectionInfo.killed) return false;

    const matchSection = this.gameUI.toSection(match);

    return matchSection.sectionX === this.bugSectionInfo.sectionX &&
      matchSection.sectionY === this.bugSectionInfo.sectionY;
  }
}
