class BinaryUnit {
    constructor(x,y) {
      // Will accept various SetOfRules
      // For default, it will always keep activated if past of the same unit was activated
      this.rulesForUnit = [new SetOfRulesResults([new CorrelationRule(x, y, 1), 1])];
      this.currentValue = 0;
    }
}


// Represents a small rule that will be used to a unit
// This one gets the unit of x and y, and if it corresponds to the value
// It will be used to activate the unit
class CorrelationRule {
    constructor(x, y, value) {
      this.x = x;
      this.y = y;
      this.value = value;
    }
}

// Represents a set of correlation rules that will be used to activate or deactivate a unit, depending on result value.
class SetOfRulesResults {
    constructor(rules, result) {
      this.rules = rules;
      this.result = result;
    }
}

// const copyUniverse = (universe) => {
//     let newUniverse = [];
//     for(let i = 0; i < universe.length; i++) {
//         newUniverse.push([]);
//         for(let j = 0; j < universe[i].length; j++) {
//             newUniverse[i].push(new BinaryUnit(i, j, universe[i][j].currentValue));
//         }
//     }
//     return newUniverse;
// }

const widthOfUnits = 100;
const unitSizeInPixels = 4;

let universe = [];
for(let i = 0; i < widthOfUnits; i++) {
    universe.push([]);
    for(let j = 0; j < widthOfUnits; j++) {
        universe[i].push(new BinaryUnit(i, j));
    }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "white";

for (let i = 0; i < widthOfUnits; i++) {
    for (let j = 0; j < widthOfUnits; j++) {
        if (universe[i][j].currentValue === 1){
            ctx.fillRect(i * unitSizeInPixels, j * unitSizeInPixels, unitSizeInPixels, unitSizeInPixels);
        }
    }
}