function formulaRefactored(i, j) {
  const threeRest = i % 3;
  const threeDiv = Math.floor(i / 3);
  
  const rowPart = 9 * threeDiv + threeRest;
  const colPart = j * 3;
  const rowUpdate = 18 * Math.floor(j / 3);
  
  return rowPart + colPart + rowUpdate;
}

for(let i = 0 ; i < 9; i++) {
  const formulaSquare = [];
  for(let j = 0; j < 9; j++ ) {
    formulaSquare.push(formula(j,i));
  }
  
  console.log(`${i} = ${formulaSquare}`);
}

export class Sudoku {

  private formula(i, j) {
  const threeRest = i % 3;
  const threeDiv = Math.floor(i / 3);
  const iBase = 9 * threeDiv + threeRest;
  const colUpdate = j * 3;
  const rowUpdate = 18 * Math.floor(j / 3);

  return iBase + colUpdate + rowUpdate;
}

  validate(solution: Array<number>): boolean {
    for (let dimmensionA = 0; dimmensionA < 9; dimmensionA++) {
      const rowRule = new SudokuRule();
      const colRule = new SudokuRule();
      const regionRule = new SudokuRule();

      for (let dimmensionB = 0; dimmensionB < 9; dimmensionB++) {
        try {
          const rowVal = solution[dimmensionA * 9 + dimmensionB];
          console.log(`[${dimmensionA}][${dimmensionB}] => ${rowVal}`)
          rowRule.put(rowVal);
        } catch (err) {
          throw new Error(`Invalid row rule: [${dimmensionA}][${dimmensionB}] ${err}`)
        }
        try {
          const colVal = solution[dimmensionB * 9 + dimmensionA];
          console.log(`[${dimmensionB}][${dimmensionA}] => ${colVal}`)
          colRule.put(colVal);
        } catch (err) {
          throw new Error(`Invalid column rule: [${dimmensionB}][${dimmensionA}] ${err}`)
        }
        const cellNumber = this.formula(dimmensionB, dimmensionA);
        try {
          const regionVal = solution[cellNumber];
          regionRule.put(regionVal);
        } catch (err) {
          const rowNumber = Math.floor(cellNumber / 9);
          const columnNumber = cellNumber % 9;
          throw new Error(`Invalid region rule: [${rowNumber}][${columnNumber}] ${err}`)
        }
      }
    }

    for (let col = 0; col < 9; col++) {
      const rowRule = new SudokuRule();
      for (let row = 0; row < 9; row++) {
        try {
          const val = solution[row * 9 + col];
          console.log(`[${row}][${col}] => ${val}`)
          rowRule.put(val);
        } catch (err) {
          throw new Error(`[${row}][${col}] ${err}`)
        }
      }
    }
    return true;
  }

}

/**
 * 3x3 square that must have all the numbers set and unique
 */
export class SudokuRule {

  square: Array<boolean> = Array(10).fill(undefined);

  /* I could do 2^n-1 sum , but this solution catches error faster and gives feedback which value is invalid */
  put(num: number) {
    if (this.square[num] !== undefined) {
      throw Error(`Value already exists ${num}`)
    }
    this.square[num] = true;
  }

  validate() {
    const missing = []
    for (let i = 0; i < 10; i++) {
      if (this.square[i] === undefined) {
        missing.push(i + 1);
      }
    }
    if (missing.length) {
      throw Error(`Missing ${missing.join(',')}`);
    }
  }
}



