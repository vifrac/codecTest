let areaX = 0;
let areaY = 0;

// get random platform
function getRandonNumber() {
  let min = areaX < 1 ? 1 : areaX > 3 ? 3 : 3;
  let max = 50;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

areaX = getRandonNumber(areaX);
areaY = getRandonNumber(areaX);

currentIconDirectionFace = '';
cardinalPoint = '';
currentPositionRoverX = 1;
currentPositionRoverY = 1;

console.log(`Mars plateau is ${areaX}x${areaY}`);
console.log(
  `Current position Rover ${currentPositionRoverX}x${currentPositionRoverY}`
);

const l = '\u25c0';
const r = '\u25b6';
const up = '\u25b2';
const down = '\u25bc';

let directionFace;

function validatePosition(valueUpdate) {
  currentIconDirectionFace =
    currentIconDirectionFace === '' ? 0 : currentIconDirectionFace;
  switch (true) {
    case currentIconDirectionFace >= 4 && parseInt(valueUpdate) > 0:
      currentIconDirectionFace = 0;
      break;
    case currentIconDirectionFace == 1 && parseInt(valueUpdate) < 0:
      currentIconDirectionFace = 5;
      break;
    case currentIconDirectionFace <= 0 && parseInt(valueUpdate) < 0:
      currentIconDirectionFace = 4;
      break;
    default:
      break;
  }

  currentIconDirectionFace =
    parseInt(currentIconDirectionFace) + parseInt(valueUpdate);
}

function forward() {
  switch (currentIconDirectionFace) {
    case 1:
      parseInt(currentPositionRoverY) + 1 <= areaY
        ? (currentPositionRoverY = currentPositionRoverY + 1)
        : console.log(
            'it is not possible to advance to the indicated position'
          );
      break;
    case 2:
      parseInt(currentPositionRoverX) + 1 <= areaX
        ? (currentPositionRoverX = currentPositionRoverX + 1)
        : console.log(
            'it is not possible to advance to the indicated position'
          );
      break;
    case 3:
      parseInt(currentPositionRoverY) - 1 >= 1
        ? (currentPositionRoverY = currentPositionRoverY - 1)
        : console.log(
            'it is not possible to advance to the indicated position'
          );
      break;
    case 4:
      parseInt(currentPositionRoverX) - 1 >= 1
        ? (currentPositionRoverX = currentPositionRoverX - 1)
        : console.log(
            'it is not possible to advance to the indicated position'
          );
      break;

    default:
      console.log('default');
      break;
  }
}

async function iconDirectionFace(updateCommands) {
  let updateDirectionFace = new Promise(function (resolve, reject) {
    if (
      typeof updateCommands === 'undefined' &&
      currentIconDirectionFace === ''
    ) {
      currentIconDirectionFace = 1;
      resolve(up);
    } else if (
      typeof updateCommands === 'undefined' &&
      typeof currentIconDirectionFace === 'number'
    ) {
      resolve('The rover is waiting commands...');
    } else {
      Array.from(updateCommands).forEach((element) => {
        switch (element.toLowerCase()) {
          case 'l':
            validatePosition(-1);
            break;
          case 'r':
            validatePosition(+1);
            break;
          case 'f':
            forward();
            break;
          default:
            break;
        }
      });

      switch (currentIconDirectionFace) {
        case 1:
          directionFace = up;
          break;
        case 2:
          directionFace = r;
          break;
        case 3:
          directionFace = down;
          break;
        case 4:
          directionFace = l;
          break;
        default:
          break;
      }

      function cardinarPosition(currentCardinalPoint) {
        switch (parseInt(currentCardinalPoint)) {
          case 1:
            console.log('test 1');
            cardinalPoint = 'North';
            break;
          case 2:
            cardinalPoint = 'East';
            break;
          case 3:
            cardinalPoint = 'South';
            break;
          case 4:
            cardinalPoint = 'West';
            break;
          default:
            break;
        }
        return cardinalPoint;
      }

      resolve(
        console.log(
          currentPositionRoverX,
          currentPositionRoverY,
          cardinarPosition(currentIconDirectionFace)
        )
      );
    }
  });

  return await updateDirectionFace;
}

const userControls = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

userControls.question(
  "Please enter navigation commands \n L: Turn the robot left,\n R: Turn the robot right,\n F: Move forward on it's facing direction \n",
  function (commands) {
    iconDirectionFace();
    iconDirectionFace(commands);
    console.log('Interface closed');
    userControls.close();
  }
);
