import { createServer } from 'http';
import { readFile } from 'fs';
import { URL } from 'node:url';
import figlet from 'figlet';
import { getComputerChoice, getResult } from './util.js';

const server = createServer((req, res) => {
  const myURL = new URL(req.url, `http://${req.headers.host}`);
  const page = myURL.pathname;
  const params = new URLSearchParams(myURL.searchParams);
  console.log(page);

  switch(page) {
    case '/':
      readFile('public/index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
      break;
    case '/api':
      if(params.has('rockpaperscissors')) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        let computerChoice = getComputerChoice();
        const objToJson = {
          playerChoice: params.get('rockpaperscissors'),
          computerChoice: computerChoice,
          result: getResult(params.get('rockpaperscissors'), computerChoice)
        }
        res.end(JSON.stringify(objToJson));
      }
      break;
    case '/css/style.css':
      readFile('public/css/style.css', function(err, data) {
        res.write(data);
        res.end();
      });
      break;
    case '/js/main.js':
      readFile('public/js/main.js', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(data);
        res.end();
      });
      break;
    default:
      figlet('404!!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        res.write(data);
        res.end();
      });
      break;
  }
});

server.listen(8000);
