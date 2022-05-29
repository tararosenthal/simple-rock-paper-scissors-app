export function getComputerChoice() {
  const num = Math.floor(Math.random() * 3);
  switch (num) {
    case 0:
      return 'rock';
    case 1:
      return 'paper';
    case 2:
      return 'scissors';
  }
}

export function getResult(playerChoice, computerChoice) {
  playerChoice = String(playerChoice).toLowerCase();
  computerChoice = String(computerChoice).toLowerCase();

  if(playerChoice === 'rock' || playerChoice === 'paper'
     || playerChoice === 'scissors') {
    return getWinCondition(playerChoice, computerChoice);
  } else {
    return 'error';
  }
}

function getWinCondition(playerChoice, computerChoice) {
  if (playerChoice == computerChoice) {
    return 'tie';
  } else if((playerChoice == 'rock' && computerChoice == 'paper')
            || (playerChoice == 'scissors' && computerChoice == 'rock')
            || (playerChoice == 'paper' && computerChoice == 'scissors')){
    return 'lose';
  } else {
    return 'win';
  }
}
