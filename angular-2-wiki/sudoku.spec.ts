import {Sudoku, SudokuRule} from './sudoku';

function make(str) {
  return str.split('').filter(x => x.trim().length > 0).map(x => Number(x));
}

const randomValidSolution = make(`
513 627 984
297 854 316
846 931 725
638 495 172
971 263 548
425 718 639
764 389 251
359 142 867
182 576 493`)

const regionsPreetyValid = make(`
123 456 789
456 789 123
789 123 456
234 567 891
567 891 234
891 234 567
345 678 912
678 912 345
912 345 678`);

/* 8 in first row not valid */
const rowErrorNotUnique = make(`
513 627 988
297 854 316
846 931 725
638 495 172
971 263 548
425 718 639
764 389 251
359 142 867
182 576 493`)

/* Second row swap 5 & 9 , makes columns 1 & 5 invalid */
const columnErrorNotUnique = make(`
513 627 984
597 824 316
846 931 725
638 495 172
971 263 548
425 718 639
764 389 251
359 142 867
182 576 493`)

const regionsInvalidCase1 = make(`
123 456 789
234 567 891
345 678 912
456 789 123
567 891 234
678 912 345
789 123 456
891 234 567
912 345 678`);

const regionsInvalidCase2 = make(`
123 456 789
456 789 123
789 123 456
234 567 891
345 678 912
567 891 234
678 912 345
891 234 567
912 345 678`);

fdescribe('Sudoku', () => {
  it('should validate proper solution', () => {
    expect(new Sudoku().validate(randomValidSolution)).toBeTruthy();
  });

  it('should validate proper preety solution', () => {
    expect(new Sudoku().validate(regionsPreetyValid)).toBeTruthy();
  });

  it('should validate row error', () => {
    expect(() => new Sudoku().validate(rowErrorNotUnique)).toThrow(new Error('Invalid row rule: [0][8] Error: Value already exists 8'));
  });

  it('should validate column error', () => {
    expect(() => new Sudoku().validate(columnErrorNotUnique)).toThrow(new Error('Invalid column rule: [1][0] Error: Value already exists 5'));
  });

  it('should validate rules 1 errors invalid', () => {
      expect(() => new Sudoku().validate(regionsInvalidCase1)).toThrow(new Error('Invalid region rule: [1][0] Error: Value already exists 2'));
  });

  it('should validate rules 2 errors invalid', () => {
      expect(() => new Sudoku().validate(regionsInvalidCase2)).toThrow(new Error('Invalid region rule: [4][0] Error: Value already exists 3'));
  });

 it('rule should accept number', () => {
    const r = new SudokuRule();
    for (let i = 1; i < 10; i++) {
      r.put(i);
    }
  });

 it('rule should break on duplicate', () => {
    const r = new SudokuRule();
    r.put(1);
    expect(() => r.put(1)).toThrow(new Error('Value already exists 1'));
  });
});
