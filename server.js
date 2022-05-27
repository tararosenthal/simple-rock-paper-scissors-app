const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    if('rockpaperscissors' in params){
        res.writeHead(200, {'Content-Type': 'application/json'});
        let computerChoice = getComputerChoice();
        const objToJson = {
          playerChoice: params['rockpaperscissors'],
          computerChoice: computerChoice,
          result: getResult(params['rockpaperscissors'], computerChoice)
        }
        res.end(JSON.stringify(objToJson));
      }
    }
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

function getComputerChoice() {
  //random number = r,p,s
  const num = Math.floor(Math.random()*3)
  switch (num) {
  case 0:
    return 'rock';
  case 1:
    return 'paper';
  case 2:
    return 'scissors';
  }
}


function getResult(playerChoice, computerChoice) {
  playerChoice = String(playerChoice).toLowerCase();
  computerChoice = String(computerChoice).toLowerCase();

  if(playerChoice === 'rock' || playerChoice === 'paper'
     || playerChoice === 'scissors') {
    return getWinCondition(playerChoice, computerChoice);
  } else {
    return 'Error';
  }
}

function getWinCondition(playerChoice, computerChoice) {
  if (playerChoice == computerChoice) {
    return 'Tie';
  } else if((playerChoice == 'rock' && computerChoice == 'paper')
            || (playerChoice == 'scissors' && computerChoice == 'rock')
            || (playerChoice == 'paper' && computerChoice == 'scissors')){
    return 'Lose';
  } else {
    return 'Win';
  }
}

server.listen(8000);
