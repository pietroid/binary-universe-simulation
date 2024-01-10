class BinaryUnit {
    constructor(x,y) {
      // Will accept various SetOfRules
      // For default, it will always keep activated if past of the same unit was activated
      this.rulesForUnit = [new SetOfRulesResults([new CorrelationRule(x, y, 1)], 0), new SetOfRulesResults([new CorrelationRule(x, y, 0)], 1)];
      this.currentValue = (x + y) % 2;
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

const copyUniverse = (universe) => {
    return JSON.parse(JSON.stringify(universe));
}

const widthOfUnits = 100;
const unitSizeInPixels = 4;

let pastUniverse = [];
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

const iterate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < widthOfUnits; i++) {
        for (let j = 0; j < widthOfUnits; j++) {
            if (universe[i][j].currentValue){
                ctx.fillRect(i * unitSizeInPixels, j * unitSizeInPixels, unitSizeInPixels, unitSizeInPixels);
            }
        }
    };

    //how the universe will evolve
    let newUniverse = copyUniverse(universe);
    for (let i = 0; i < widthOfUnits; i++) {
        for (let j = 0; j < widthOfUnits; j++) {
           unit = universe[i][j];
           unit.rulesForUnit.forEach((setOfRules) => {
                let result = setOfRules.result;
                let rules = setOfRules.rules;
                
                let ruleMatches = true;
                rules.forEach((rule) => {
                    let ruleValue = rule.value;
                    if (ruleValue != universe[rule.x][rule.y].currentValue) {
                        ruleMatches = false;
                    }
                });
                console.log(ruleMatches);
                if (ruleMatches) {
                    newUniverse[i][j].currentValue = result;
                }
            });
        }
    };

    //mutation of universe
    universe = newUniverse;
};

//iterate();
setInterval(iterate, 200);